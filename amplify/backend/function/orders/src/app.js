/* Amplify Params - DO NOT EDIT
  ENV
  REGION
  STORAGE_COURSES_ARN
  STORAGE_COURSES_NAME
  STORAGE_COURSES_STREAMARN
  STORAGE_EVENTS_ARN
  STORAGE_EVENTS_NAME
  STORAGE_EVENTS_STREAMARN
  STORAGE_ORDERS_ARN
  STORAGE_ORDERS_NAME
  STORAGE_ORDERS_STREAMARN
  STORAGE_PRESALES_ARN
  STORAGE_PRESALES_NAME
  STORAGE_PRESALES_STREAMARN
Amplify Params - DO NOT EDIT *//*
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
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" })
const {
  getPackageById,
  createInvoice,
  createOrder,
  updageAvailablePlaces,
  getIsPresaleOrder, 
  getOrderType,
  getIsAlreadyDonePresale,
  createFullOrder
} = require('./orders.controller')
const { statuses } = require('./utils')

const ORDERS_TABLE_NAME = `orders-${process.env.ENV}`

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


app.post('/orders', getIsPresaleOrder, getPackageById, getOrderType, createOrder, updageAvailablePlaces, createInvoice, async function (req, res) {
  const { order, invoice } = req
  console.log(req);
  await docClient.update({
    TableName: ORDERS_TABLE_NAME,
    Key: {
      id: order.id,
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
    if (err) {
      res.status(404).send({ message: 'Order not updated' });
    } else {
      res.status(200).json({ pageUrl: invoice.pageUrl })
    }
  });
});

app.post('/presale',  getIsAlreadyDonePresale, getIsPresaleOrder, getPackageById, createFullOrder, createInvoice,  async (req, res) => {
  const { order, invoice } = req
  await docClient.update({
    TableName: ORDERS_TABLE_NAME,
    Key: {
      id: order.id,
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
    if (err) {
      res.status(404).send({ message: 'Order not updated' });
    } else {
      res.status(200).json({ pageUrl: invoice.pageUrl })
    }
  });
})

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
