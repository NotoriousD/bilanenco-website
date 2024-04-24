/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const AWS = require('aws-sdk')
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const docClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10"
})

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

const PRODUCTS_TABLE_NAME = `products-${process.env.ENV}`

/**********************
 * Example get method *
 **********************/

app.get('/product/:id', async (req, res) => {
  // Add your code here
  console.log(req.params);

  const {
    Item: product
  } = await docClient.get({
    TableName: PRODUCTS_TABLE_NAME,
    Key: {
      id: req.params.id,
    },
  }, (err, data) => {
    if (err) {
      res.status(404).send({
        message: 'Product was not found'
      })
      return
    }
  }).promise()
  res.json({ data: { ...product } });
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
