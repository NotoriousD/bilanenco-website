
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')
const uuid = require('uuid')
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" })
const validation = require('./validation')

const EVENTS_TABLE_NAME = `events-${process.env.ENV}`

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


/**********************
 * Example get method *
 **********************/

app.get('/events', async (req, res) => {
  await docClient.get({
    TableName: EVENTS_TABLE_NAME,
  }, (err, data) => {
    if(err) {
      res.status(404).send({ message: 'Events: something went wrong' })
      return
    }
    res.status(200).json(data)
  })
});

app.get('/events/:id', async (req, res) => {
  await docClient.get({
    TableName: EVENTS_TABLE_NAME,
    Key: {
      id: req.params.id,
    }
  }, (err, data) => {
    if(err) {
      res.status(404).send({ message: 'Event was not found' })
      return
    }
    res.status(200).json(data)
  })
});

/****************************
* Example post method *
****************************/

app.post('/events', function(req, res) {

  const { error } = validation.validate(req.body)

  if(error) {
    res.status(404).json(error);
    return;
  }

  const newEvent = {
    id: uuid.v4(),
    ...req.body
  }

  docClient.put({
    TableName: EVENTS_TABLE_NAME,
    Item: newEvent
  }, (err, data) => {
    if(err) {
      res.status(404).send({ message: 'Event was not created' })
      return
    }
    res.status(200).json({ message: 'Event was created', data })
  })
});

app.post('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
