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
    getProductPriceByCurrency,
    productNames,
} = require('./utils')

const ORDERS_TABLE_NAME = `orders-${process.env.ENV}`


exports.getProductById = async (req, res, next) => {
    const {
        product_type,
        id,
    } = req.body
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

    req.product = product.Item;
    req.price = product.Item.price;
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

    const orderType = 'FULL'

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
        courseName: req.body.title,
        order_status: statuses.pending,
        created_date: currentDate,
        paied_date: null,
        order_type: orderType,
        purchase: `${body.package_id ? `#${body.package_id}` : ''}#${body.id}#${orderType}`
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

exports.createInvoice = async (req, res, next) => {
    const {
        product,
        order,
        body,
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

    let amount = req.order.total_amount

    try {
        const invoice = await monobankCreateInvoice({
            orderId: order.id,
            amount: amount,
            productId: productNames[body.product_type],
            name: `${product.subType} "${order.name}"`,
            redirectUrl: `https://${process.env.ENV === 'dev' ? 'dev.' : ''}bilanenco.com/thank-you/products`,
            webHookUrl: `${process.env.CALLBACK_URL}/status`,
            destination: `Оплата ${order.name}`,
            token: PAYMENT_TOKEN,
        })

        console.log(PAYMENT_TOKEN, invoice);

        req.invoice = invoice
        next()

    } catch (err) {
        res.status(404).json({
            message: 'Invoice havent been created',
            err
        })
    }
}