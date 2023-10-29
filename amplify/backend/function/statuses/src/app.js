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
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_EVENTS_ARN
	STORAGE_EVENTS_NAME
	STORAGE_EVENTS_STREAMARN
	STORAGE_ORDERS_ARN
	STORAGE_ORDERS_NAME
	STORAGE_ORDERS_STREAMARN
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_EVENTS_ARN
	STORAGE_EVENTS_NAME
	STORAGE_EVENTS_STREAMARN
	STORAGE_ORDERS_ARN
	STORAGE_ORDERS_NAME
	STORAGE_ORDERS_STREAMARN
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_ORDERS_ARN
	STORAGE_ORDERS_NAME
	STORAGE_ORDERS_STREAMARN
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
// const { google } = require('googleapis')
const { spCallback } =  require('./sendPulse')
const { getTableNameByProductType } = require('./utils')
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" })
const sesClient = new AWS.SES({ apiVersion: '2010-12-01' })

const EVENTS_TABLE_NAME = `events-${process.env.ENV}`
const COURSES_TABLE_NAME = `courses-${process.env.ENV}`
const ORDERS_TABLE_NAME = `orders-${process.env.ENV}`

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

const updateStatus = async (req, res, next) => {
  try {
    await docClient.update({
      TableName: ORDERS_TABLE_NAME,
      Key: {
        id: req.body.reference,
      },
      UpdateExpression: 'set #a = :Status',
      ExpressionAttributeNames: {
        '#a': 'order_status',
      },
      ExpressionAttributeValues: {
        ':Status': req.body.status,
      }
    }, (err, data) => {
      if(err) {
        res.status(404).send({ message: 'Status order not updated', body: err });
      } else {
        next();
      }
    });
  } catch(err) {
    res.status(404).json({ message: err });
  }
};

const updateCoursePackage = async (req, res, next) => {
  const order = await docClient.get({
    TableName: ORDERS_TABLE_NAME,
    Key: {
      id: req.body.reference,
    }
  }, (err, data) => {
    if(err) {
      res.status(404).json({ message: 'Something went wrong', body: err });
      return;
    }
  }).promise();

  if(Object.keys(order).length === 0) {
    res.status(404).json({ message: 'Order doesnt exist' });
    return;
  }

  const product = await docClient.get({
    TableName: getTableNameByProductType(order.Item.product_type, process.env.ENV),
    Key: {
      id: order.Item.product_id,
    }
  }, (err, data) => {
    if(err) {
      res.status(404).json({ message: 'Something went wrong', body: err });
      return;
    }
  }).promise();

  if(Object.keys(product).length === 0) {
    res.status(404).json({ message: 'Package doesnt exist' });
    return;
  }
  
  if(
    order.Item.product_type === 'courses' &&
    (req.body.status === 'failure' || req.body.status === 'reversed' || req.body.status === 'expired')
  ) {
    try {
      const packages = product.Item.packages.map((item) => {
        if(item.id === order.Item.package_id) {
          item.available_places += 1
        }
        return item
      })
      docClient.update({
        TableName: COURSES_TABLE_NAME,
        Key: {
          id: order.Item.product_id,
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
          res.status(404).json({ message: 'Cant increase available places', body: err });
        } else {
          next();
        }
      })
    } catch(err) {
      res.status(404).json({ message: err });
    }
  }

  const price = order.Item.product_type === 'events' ?
    product.Item.price :
    product.Item.packages.find((item) => item.id === order.Item.package_id)?.price

  req.details = {
    ...order.Item,
    courseName: product.Item.name,
    price: price,
  };

  next();
}

app.post('/status', updateStatus, updateCoursePackage, async (req, res) => {
  const { details } = req;
  if(req.body.status === 'success') {
    if(details.tContact_id) {
      await spCallback(details.tContact_id)
    }

    const params = {
      Destination: {
        ToAddresses: [ details.email ],
      },
      Source: 'olexandra.bilanenko@gmail.com',
      Template: 'test',
      TemplateData: JSON.stringify({}),
    }

    sesClient.sendTemplatedEmail(params, (err, data) => {
      if(err) {
        res.status(404).json(err)
        console.log(err);
      }
      console.log('email sended');
      res.status(200).json(data)
    })

  //   const auth = new google.auth.GoogleAuth({
  //     keyFile: `keys-${process.env.ENV}.json`, //the key file
  //     scopes: ["https://www.googleapis.com/auth/spreadsheets"], 
  //   });
  
  //   //Auth client Object
  //   const authClientObject = await auth.getClient();
  
  //   //Google sheets instance
  //   const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
  
  //   // spreadsheet id
  //   const spreadsheetId = process.env.GOOGLE_SHEETS_KEY;
  
  //   const user = [details.fullName, details.email, details.phone, details.courseName, details.price, details.order_status]
  
  //   //write data into the google sheets
  //   const data = await googleSheetsInstance.spreadsheets.values.append({
  //       auth,
  //       spreadsheetId,
  //       range: "2:2",
  //       valueInputOption: "USER_ENTERED",
  //       resource: {
  //           values: [user]
  //       },
  //   });
  
  //   res.status(200).json({ data });
  //   return;
  }
  res.status(200).json({ status: req.body.status })
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app