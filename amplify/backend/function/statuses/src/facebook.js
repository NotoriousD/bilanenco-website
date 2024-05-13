const adsSdk = require('facebook-nodejs-business-sdk');
const Content = adsSdk.Content;
const CustomData = adsSdk.CustomData;
const EventRequest = adsSdk.EventRequest;
const UserData = adsSdk.UserData;
const ServerEvent = adsSdk.ServerEvent;

const access_token = 'EAAJN0dr6sREBO3BZBWbky7hV9mUpqwBJjZAeAj4nqjqAuzF7nlTi9SOBk3ZAMXYimkBqC22LSOf1gc6b5sEq56yIixY5LVcJ7UgC6pqU6n4IlAIMfpZBkJX7iBMCAmELKJb26i4H88WLUhLXNz38v2jhfDt1ZCRWZBO5k5cDZC3SWyCtX6X8vfq6xIj9v1yygwsR1Mc6MOTC11di1KzJQ6WZAsPcvac34mJStRDLLCdZABjZCP2LHbGuoB5vds1lgTCgZDZD';
const pixel_id = '456894110068958';
const api = adsSdk.FacebookAdsApi.init(access_token);

exports.sendPurchaseEvent = async ({
    email,
    productName,
    currency,
    price
}) => {

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
    const eventRequest = (new EventRequest(access_token, pixel_id))
        .setEvents(eventsData);

    try {
        const response = await eventRequest.execute();

        console.log(response);
    } catch(e) {
        console.log('error', e);
    }
}

//https://graph.facebook.com/{API_VERSION}/{PIXEL_ID}/events?access_token={TOKEN}

