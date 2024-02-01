/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_COURSES_ARN
	STORAGE_COURSES_NAME
	STORAGE_COURSES_STREAMARN
	STORAGE_PRESALES_ARN
	STORAGE_PRESALES_NAME
	STORAGE_PRESALES_STREAMARN
Amplify Params - DO NOT EDIT */
/*
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
const docClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10"
})
const {
  validation
} = require('./validation')

const COURSES_TABLE_NAME = `courses-${process.env.ENV}`
const PRESALE_TABLE_NAME = `presales-${process.env.ENV}`

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


/**********************
 * Example get method *
 **********************/

app.get('/courses', async (req, res) => {
  await docClient.scan({
    TableName: COURSES_TABLE_NAME,
  }, (err, data) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    res.status(200).json({
      data: data.Items
    })
  })
});

app.get('/courses/:id', async (req, res) => {
  const {
    Item: course
  } = await docClient.get({
    TableName: COURSES_TABLE_NAME,
    Key: {
      id: req.params.id,
    },
  }, (err, data) => {
    if (err) {
      res.status(404).send({
        message: 'Event was not found'
      })
      return
    }
  }).promise()

  if (course) {
    let isPresale = false
    const params = {
      TableName: PRESALE_TABLE_NAME,
      Key: {
        id: req.params.id,
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

    const today = new Date().getTime()

    if (presale) {
      const endDate = new Date(presale.end_date).getTime()
      const startDate = new Date(presale.start_date).getTime()

      if (today >= startDate && today <= endDate) {
        isPresale = true
      }
    }

    const endSaleDate = new Date(presale.end_sale_date).getTime()
    const startSaleDate = new Date(presale.start_sale_date).getTime()

    const isSale = today >= startSaleDate && today <= endSaleDate

    res.status(200).json({ data: { ...course, isPresale, isSale } })
  }
});

/****************************
 * Example post method *
 ****************************/

app.post('/courses', function (req, res) {

  const {
    error
  } = validation.validate(req.body)

  if (error) {
    res.status(404).json(error)
    return
  }

  docClient.put({
    TableName: COURSES_TABLE_NAME,
    Item: req.body
  }, (err, data) => {
    if (err) {
      console.log(err)
      res.status(404).json(err)
      return
    }
    res.status(200).json({
      message: 'Course was created',
      data
    })
  })

});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app