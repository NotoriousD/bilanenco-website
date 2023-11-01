const AWS = require('aws-sdk')
const uuid = require('uuid')
const docClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: "2012-08-10"
})
const {
    monobankCreateInvoice
} = require('./monobank.service')
const {
    validation
} = require('./orders.validation')
const {
    statuses,
    getTableNameByProductType,
    productTypes,
    getProductPriceByCurrency,
    productNames,
    orderTypes
} = require('./utils')

const ORDERS_TABLE_NAME = `orders-${process.env.ENV}`
const PRESALE_TABLE_NAME = `presales-${process.env.ENV}`

exports.getIsPresaleOrder = async (req, res, next) => {
    const {
        id
    } = req.body
    req.presale = {
        isPresale: false
    }

    const params = {
        TableName: PRESALE_TABLE_NAME,
        Key: {
            id: id,
        }
    };

    const {
        Item: presale
    } = await docClient.get(params, (err, data) => {
        if (err) {
            res.status(404).json({
                message: 'Something went wrong',
                body: err
            });
            return;
        }
    }).promise()

    if (presale) {
        const today = new Date().getTime()
        const endDate = new Date(presale.end_date).getTime()
        const startDate = new Date(presale.start_date).getTime()

        req.presale = {
            ...req.presale,
            ...presale
        }

        if (today >= startDate && today <= endDate) {
            req.presale.isPresale = true
        }
    }

    next()
}

exports.getPackageById = async (req, res, next) => {
    const {
        product_type,
        id,
        package_id
    } = req.body
    let price = 0
    const params = {
        TableName: getTableNameByProductType(product_type, process.env.ENV),
        Key: {
            id: id,
        }
    }

    const product = await docClient.get(params, (err, data) => {
        if (err) {
            res.status(404).json({
                message: 'Something went wrong',
                body: err
            });
            return;
        }
    }).promise()

    if (Object.keys(product).length === 0) {
        res.status(404).send({
            message: `Product not found by course id`
        });
        return;
    }

    if (product_type !== productTypes.course) {
        price = product.Item.price
    } else {
        const choosenPackage = product.Item.packages.find(({
            id
        }) => id === package_id);

        if (!choosenPackage) {
            res.status(404).json({
                message: 'This package was not found'
            })
        }

        if (choosenPackage.available_places === 0) {
            res.status(404).json({
                message: 'There are no available places in this package'
            })
            return;
        }

        price = choosenPackage.price
    }

    req.product = product.Item;
    req.price = price
    next()
}

exports.getOrderType = async (req, res, next) => {
    const {
        body,
        presale
    } = req
    req.hasPaiedPresale = false
    req.orderType = orderTypes.full

    const purchaseKey = `${body.package_id ? `#${body.package_id}` : ''}#${body.id}`

    const orderParams = {
        TableName: ORDERS_TABLE_NAME,
        IndexName: 'user_purchases',
        KeyConditions: {
            'email': {
                ComparisonOperator: "EQ",
                AttributeValueList: [body.email]
            },
            'purchase': {
                ComparisonOperator: "BEGINS_WITH",
                AttributeValueList: [purchaseKey]
            }
        },
    }

    const {
        Items: order
    } = await docClient.query(orderParams, (err, data) => {}).promise()

    if (!order.length && presale.isPresale) {
        req.orderType = orderTypes.presale
    }

    const fullTypeOrderPayment = order.find((item) => item.order_type === orderTypes.full && item.order_status === 'success')
    const presaleTypeOrderPayment = order.find((item) => item.order_type === orderTypes.presale && item.order_status === 'success')

    if (fullTypeOrderPayment) {
        res.status(404).json({
            message: 'This email already bought this course'
        })
        return
    }

    if (presaleTypeOrderPayment && !fullTypeOrderPayment) {
        req.hasPaiedPresale = true
        req.orderType = orderTypes.full
    }

    if(!fullTypeOrderPayment && !presaleTypeOrderPayment && presale.isPresale) {
        req.orderType = orderTypes.presale
    }

    if(!fullTypeOrderPayment && !presaleTypeOrderPayment && !presale.isPresale) {
        req.orderType = orderTypes.full
    }

    next()
}

exports.createOrder = async (req, res, next) => {
    const {
        body
    } = req

    const {
        error
    } = validation.validate(req.body)

    if (error) {
        res.status(404).json(error);
        return;
    }

    let total_amount = getProductPriceByCurrency(body.currency, req.price, body.funnel, body.product_type)
    const currentDate = new Date().toISOString()

    const newOrder = {
        ...req.body,
        id: uuid.v4(),
        package_id: body.package_id || null,
        product_id: req.body.id,
        tContact_id: req.body.contact_id,
        total_amount,
        invoice_id: null,
        order_status: statuses.pending,
        created_date: currentDate,
        paied_date: null,
        order_type: req.orderType,
        purchase: `${body.package_id ? `#${body.package_id}` : ''}#${body.id}#${req.orderType}`
    }

    await docClient.put({
        TableName: ORDERS_TABLE_NAME,
        Item: newOrder,
    }, (err, data) => {
        if (err) {
            res.status(404).send({
                message: 'Order not created'
            });
        } else {
            req.order = {
                ...newOrder,
                name: req.product.title,
            };

            next();
        }
    })
};

exports.updageAvailablePlaces = async (req, res, next) => {
    const {
        product,
        body: {
            product_type,
            package_id
        }
    } = req
    if (product_type !== productTypes.course) {
        next()
    } else {
        const packages = product.packages.map((item) => {
            if (item.id === package_id) {
                item.available_places = item.available_places - 1
            }
            return item
        })
        await docClient.update({
            TableName: getTableNameByProductType(req.body.product_type, process.env.ENV),
            Key: {
                id: req.product.id,
            },
            UpdateExpression: 'set #a = :Packages',
            ExpressionAttributeNames: {
                '#a': 'packages',
            },
            ExpressionAttributeValues: {
                ':Packages': packages,
            }
        }, (err, data) => {
            if (err) {
                res.status(404).json({
                    message: 'Cant decrease available places',
                    body: err
                });
            } else {
                next();
            }
        })
    }
}

exports.createInvoice = async (req, res, next) => {
    const {
        product,
        order,
        body,
        presale,
        hasPaiedPresale
    } = req
    const {
        Parameters
    } = await (new AWS.SSM())
    .getParameters({
            Names: ["PAYMENT_TOKEN"].map(secretName => process.env[secretName]),
            WithDecryption: true,
        })
        .promise();

    const PAYMENT_TOKEN = Parameters.pop().Value;
    const isPresaleInvoice = presale.isPresale && order.order_type === orderTypes.presale

    let amount = req.order.total_amount

    if (isPresaleInvoice) {
        amount = presale.amount * 100
    }

    if (order.order_type === orderTypes.full && hasPaiedPresale) {
        amount -= presale.amount * 100
    }

    try {
        const invoice = await monobankCreateInvoice({
            orderId: order.id,
            amount: amount,
            productId: productNames[body.product_type],
            name: `${product.subType} "${order.name}"`,
            redirectUrl: `https://${process.env.ENV === 'dev' ? 'dev' : ''}.bilanenco.com/thank-you`,
            webHookUrl: `${process.env.CALLBACK_URL}/status`,
            destination: `Оплата ${isPresaleInvoice ? '(Передзапис)': ''} ${order.name}`,
            token: PAYMENT_TOKEN,
        })

        req.invoice = invoice
        next()

    } catch (err) {
        res.status(404).json({
            message: 'Invoice havent been created',
            err
        })
    }
}

exports.getIsAlreadyDonePresale = async (req, res, next) => {
    const { email, package_id, id, product_type } = req.body

    const params = {
        TableName: getTableNameByProductType(product_type, process.env.ENV),
        Key: {
            id: id,
        }
    }

    const { Item: product } = await docClient.get(params, (err, data) => {
        if (err) {
            res.status(404).json({
                message: 'Something went wrong',
                body: err
            });
            return;
        }
    }).promise()

    if(product) {
        req.product = product
    }

    const purchaseKey = `${package_id ? `#${package_id}` : ''}#${id}`

    const orderParams = {
        TableName: ORDERS_TABLE_NAME,
        IndexName: 'user_purchases',
        KeyConditions: {
            'email': {
                ComparisonOperator: "EQ",
                AttributeValueList: [email]
            },
            'purchase': {
                ComparisonOperator: "BEGINS_WITH",
                AttributeValueList: [purchaseKey]
            }
        },
    }

    const {
        Items: orders
    } = await docClient.query(orderParams, (err, data) => {}).promise()

    if(!orders.length) {
        res.status(404).json({ message: 'Людина з таким імейлом не робила передзапис на вибраний пакет' })
        return
    }

    const fullTypeOrderPayment = orders.find((item) => item.order_type === orderTypes.full && item.order_status === 'success')
    const presaleTypeOrderPayment = orders.find((item) => item.order_type === orderTypes.presale && item.order_status === 'success')

    if(fullTypeOrderPayment || !presaleTypeOrderPayment) {
        res.status(404).json({ message: 'Людина з таким імейлом не робила передзапис на вибраний пакет' })
        return
    }

    if(presaleTypeOrderPayment && !fullTypeOrderPayment) {
        req.order = presaleTypeOrderPayment
        console.log(req.order);
        req.hasPaiedPresale = true
    }

    next()
}

exports.createFullOrder = async (req, res, next) => {
    const {
        body,
        order,
        product
    } = req

    const currentDate = new Date().toISOString()

    const newOrder = {
        ...order,
        id: uuid.v4(),
        invoice_id: null,
        order_status: statuses.pending,
        created_date: currentDate,
        paied_date: null,
        order_type: "FULL",
        purchase: `${body.package_id ? `#${body.package_id}` : ''}#${body.id}#FULL`
    }

    await docClient.put({
        TableName: ORDERS_TABLE_NAME,
        Item: newOrder,
    }, (err, data) => {
        if (err) {
            res.status(404).send({
                message: 'Order not created'
            });
        } else {
            req.order = {
                ...newOrder,
                name: product.title
            };

            next();
        }
    })
}