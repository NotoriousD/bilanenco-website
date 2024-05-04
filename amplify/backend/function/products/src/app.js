/* Amplify Params - DO NOT EDIT
  ENV
  REGION
  STORAGE_FILES_BUCKETNAME
  STORAGE_PRODUCTS_ARN
  STORAGE_PRODUCTS_NAME
  STORAGE_PRODUCTS_STREAMARN
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
  ENV
  REGION
  STORAGE_PRODUCTS_ARN
  STORAGE_PRODUCTS_NAME
  STORAGE_PRODUCTS_STREAMARN
Amplify Params - DO NOT EDIT *//*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const AWS = require('aws-sdk')
const express = require('express')
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const docClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10"
})
const ses = new AWS.SES({ apiVersion: '2010-12-01' })
const s3 = new AWS.S3({ signatureVersion: 'v4', region: "eu-west-1" });

let transporter = nodemailer.createTransport({
  SES: ses
});

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

const PRODUCTS_TABLE_NAME = `products-${process.env.ENV}`;
const BUCKET_NAME = 'product-files232730-dev'

/**********************
 * Example get method *
 **********************/

const getS3File = async (bucket, key) => {
  return await s3.getObject({
    Bucket: bucket,
    Key: key
  }).promise();
}

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
  }).promise();

  const file = await getS3File(BUCKET_NAME, product.file);

  console.log(file);

  res.json({ data: { ...product } });
});

app.post('/uploads', async (req, res) => {
  console.log(req);
  const key = req.body.key;
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: 'multipart/form-data',
    Expires: 60
  };

  try {

    const signedURL = await s3.getSignedUrl('putObject', params);

    await docClient.update({
      TableName: PRODUCTS_TABLE_NAME,
      Key: {
          id: req.body.id,
      },
      UpdateExpression: 'set #a = :File',
      ExpressionAttributeNames: {
          '#a': 'file',
      },
      ExpressionAttributeValues: {
          ':File': key,
      }
  }, (err, data) => {
      if (err) {
          console.log(err);
      } else {
        res.json({ data: signedURL });
      }
  })

  } catch (e) {
    const response = {
      err: e.message,
      body: "error occured"
    };
    return response;
  }

});

app.post('/email', async (req, res) => {
  const { email, id } = req.body;

  const {
    Item: product
  } = await docClient.get({
    TableName: PRODUCTS_TABLE_NAME,
    Key: {
      id,
    },
  }, (err, data) => {
    if (err) {
      res.status(404).send({
        message: 'Product was not found'
      })
      return
    }
  }).promise();

  const file = await getS3File(BUCKET_NAME, product.file);

  let info = await transporter.sendMail({
    from: '"Some name" olexandra.bilanenko@gmail.com',
    to: email,
    subject: "Hello",                // Subject line
    text: 'text',                      // plaintext version
    html: '<div>test</div>', // html version
    attachments: [{
        filename: product.file,
        content: file.Body
    }]
  });

  console.log("Message sent: %s", info.messageId);
});

app.post('/buy', async (req, res) => {
  
});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
