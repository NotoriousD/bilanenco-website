/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["PAYMENT_TOKEN"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_EVENTS_ARN
	STORAGE_EVENTS_NAME
	STORAGE_EVENTS_STREAMARN
	STORAGE_ORDERS_ARN
	STORAGE_ORDERS_NAME
	STORAGE_ORDERS_STREAMARN
Amplify Params - DO NOT EDIT *//*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const AWS = require('aws-sdk')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')
const uuid = require('uuid');
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
const { monobankCreateInvoice } = require('./monobank')
const { statuses, getTableNameByProductType, productTypes, getProductPriceByCurrency, productNames } = require('./utils')
const { validation } = require('./validation')

const ORDERS_TABLE_NAME = `orders-${process.env.ENV}`;

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

const getPackageById = async (req, res, next) => {
  const { product_type, id, package_id } = req.body;
  let price = 0;
  const params = {
    TableName: getTableNameByProductType(product_type, process.env.ENV),
    Key: {
      id: id,
    }
  };
  const product = await docClient.get(params, (err, data) => {
    if(err) {
      res.status(404).json({ message: 'Something went wrong', body: err });
      return;
    }
  }).promise();

  if(Object.keys(product).length === 0) {
    res.status(404).send({ message: `Product not found by course id` });
    return;
  }

  if(product_type !== productTypes.course) {
    price = product.Item.price
  } else {
    const choosenPackage = product.Item.packages.find(({ id }) => id === package_id);

    if(!choosenPackage) {
      res.status(404).json({ message: 'This package was not found' })
    }

    if(choosenPackage.available_places === 0) {
      res.status(404).json({ message: 'There are no available places in this package' })
      return;
    }

    price = choosenPackage.price
  }
  
  req.product = product.Item;
  req.price = price
  next();
}

const createOrder = async (req, res, next) => {
  const { body } = req;

  const { error } = validation.validate(req.body);

  if(error) {
    res.status(404).json(error);
    return;
  }

  try {
    let total_amount = getProductPriceByCurrency(body.currency, req.price);

    const newOrder = {
      ...req.body,
      id: uuid.v4(),
      package_id: body.package_id || null,
      product_id: req.body.id,
      tContact_id: req.body.contact_id,
      total_amount,
      invoice_id: null,
      order_status: statuses.pending,
      created_date: body.created_date,
      paied_date: null,
    }

    await docClient.put({
      TableName: ORDERS_TABLE_NAME,
      Item: newOrder,
    }, (err, data) => {
      if(err) {
        res.status(404).send({ message: 'Order not created' });
      } else {
        req.order = {
          ...newOrder,
          name: req.product.title,
        };
    
        next();
      }
    });

  } catch(err) {
    res.status(400).json(err);
  }
};

const updageAvailablePlaces = async (req, res, next) => {
  const { product, body: { product_type, package_id } } = req;
  if (product_type !== productTypes.course) {
    next();
  } else {
    const packages = product.packages.map((item) => {
      if(item.id === package_id) {
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
      if(err) {
        res.status(404).json({ message: 'Cant decrease available places', body: err });
      } else {
        next();
      }
    })
  }
}

app.post('/orders', getPackageById, createOrder, updageAvailablePlaces, async function(req, res) {
  const { Parameters } = await (new AWS.SSM())
  .getParameters({
    Names: ["PAYMENT_TOKEN"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();
  const PAYMENT_TOKEN = Parameters.pop().Value;
  try {
    const invoice = await monobankCreateInvoice({
      orderId: req.order.id,
      amount: req.order.total_amount,
      productId: productNames[req.body.product_type],
      name: `${req.product.subType} "${req.order.name}"`,
      redirectUrl: `https://${process.env.ENV === 'dev' ? 'dev' : ''}.bilanenco.com/thank-you`,
      webHookUrl: `${process.env.CALLBACK_URL}/status`,
      destination: `Оплата ${req.order.name}`,
      token: PAYMENT_TOKEN,
    });

    if(invoice) {
      await docClient.update({
        TableName: ORDERS_TABLE_NAME,
        Key: {
          id: req.order.id,
        },
        UpdateExpression: 'set #a = :InvoiceId, #b = :Status',
        ExpressionAttributeNames: {
          '#a': 'invoice_id',
          '#b': 'order_status',
        },
        ExpressionAttributeValues: {
          ':InvoiceId': invoice.invoiceId,
          ':Status': statuses.invoiceCreated,
        }
      }, (err, data) => {
        if(err) {
          res.status(404).send({ message: 'Order not updated' });
        } else {
          res.status(200).json({ pageUrl: invoice.pageUrl })
        }
      });
    }
  } catch(err) {
    res.status(404).json(err);
  }
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
