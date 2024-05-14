const adsSdk = require('facebook-nodejs-business-sdk');
const axios = require('axios');
const Content = adsSdk.Content;
const CustomData = adsSdk.CustomData;
const EventRequest = adsSdk.EventRequest;
const UserData = adsSdk.UserData;
const ServerEvent = adsSdk.ServerEvent;

const httpClientFB = axios.create({
    baseURL: 'https://graph.facebook.com/v19.0',
});

const clientId = '648513670787345';
const clientSecret = 'b622c1032b4f19f55909cdfac5bd340b';
const access_token = 'EAAJN0dr6sREBO3BZBWbky7hV9mUpqwBJjZAeAj4nqjqAuzF7nlTi9SOBk3ZAMXYimkBqC22LSOf1gc6b5sEq56yIixY5LVcJ7UgC6pqU6n4IlAIMfpZBkJX7iBMCAmELKJb26i4H88WLUhLXNz38v2jhfDt1ZCRWZBO5k5cDZC3SWyCtX6X8vfq6xIj9v1yygwsR1Mc6MOTC11di1KzJQ6WZAsPcvac34mJStRDLLCdZABjZCP2LHbGuoB5vds1lgTCgZDZD';
const pixel_id = '456894110068958';
const api = adsSdk.FacebookAdsApi.init(access_token);

exports.fbAuth = async () => {
    try {
        const { data } = await httpClientFB.get('/oauth/access_token', {
            params: {
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: "client_credentials"
            }
        })


        return data.access_token;
    } catch(e) {
        console.log(e);
    }
}

exports.sendPurchaseEvent = async ({
    email,
    productName,
    currency,
    price
}) => {

    try {
        const accessToken = await this.fbAuth();

        console.log(accessToken);

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
        const eventRequest = (new EventRequest(accessToken, pixel_id))
            .setEvents(eventsData);
    
        eventRequest.execute().then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log('error', err);
        })
    } catch (e) {
        console.log('err', e);
    }
}

//https://graph.facebook.com/{API_VERSION}/{PIXEL_ID}/events?access_token={TOKEN}

