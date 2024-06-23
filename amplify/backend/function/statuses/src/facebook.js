const AWS = require('aws-sdk')
const adsSdk = require('facebook-nodejs-business-sdk');
// const axios = require('axios');
const Content = adsSdk.Content;
const CustomData = adsSdk.CustomData;
const EventRequest = adsSdk.EventRequest;
const UserData = adsSdk.UserData;
const ServerEvent = adsSdk.ServerEvent;

// const httpClientFB = axios.create({
//     baseURL: 'https://graph.facebook.com/v19.0',
// });

const clientId = '648513670787345';
const clientSecret = 'b622c1032b4f19f55909cdfac5bd340b';
// const clientId = '3676499979290556';
// const clientSecret = '4ee71ec84ba303d776fb06bea8706d1d';
const pixel_id = '456894110068958';
// const pixel_id = '1182858509827418';

const PRODUCT_PIXEL_ID = process.env.PRODUCT_PIXEL_ID;

// exports.fbAuth = async () => {
//     try {
//         const { data } = await httpClientFB.get('/oauth/access_token', {
//             params: {
//                 client_id: clientId,
//                 client_secret: clientSecret,
//                 grant_type: "client_credentials"
//             }
//         })


//         return data.access_token;
//     } catch (e) {
//         console.log(e);
//     }
// }

exports.sendPurchaseEvent = async ({
    email,
    productName,
    currency,
    price
}) => {

    // const {
    //     Parameters
    // } = await (new AWS.SSM())
    // .getParameters({
    //         Names: ["PRODUCT_ACCESS_MARKER"].map(secretName => process.env[secretName]),
    //         WithDecryption: true,
    //     })
    //     .promise();

    // const PRODUCT_ACCESS_MARKER = Parameters.pop().Value;

    // console.log(PRODUCT_ACCESS_MARKER)

    let current_timestamp = Math.floor(new Date() / 1000);

    const userData = (new UserData())
        .setEmails([email])

    const content = (new Content())
        .setId(productName)
        .setQuantity(1);

    const customData = (new CustomData())
        .setContents([content])
        .setCurrency(currency)
        .setValue(price);

    const serverEvent = (new ServerEvent())
        .setEventName('Purchase')
        .setEventTime(current_timestamp)
        .setUserData(userData)
        .setCustomData(customData)
        .setEventSourceUrl('http://bilanenco.com/products/inspobook-2024-summer')
        .setActionSource('website');

    const eventsData = [serverEvent];
    const eventRequest = (new EventRequest(`EAAElHvzRymMBO3iNW7B7xvEeubZCzMBUDPLc81UsWWJgKL5CcfFg9jwNQ8LUfjCXZBY9GdUb7kuW8yYZBWVBH6C9Cgpc7EkG1segJZCq3tapkZCruWoGzYTJR26HgsnGHwTAWekixc2QDzGtCpRv88oMCSaXYiIT9Ha72J5aG03oU1WnsTFJObgZCyhKlOWZAAEOAZDZD`, pixel_id))
        .setEvents(eventsData);

    const eventResponse = await eventRequest.execute();

    console.log('sended', eventResponse);

}

//https://graph.facebook.com/{API_VERSION}/{PIXEL_ID}/events?access_token={TOKEN}

