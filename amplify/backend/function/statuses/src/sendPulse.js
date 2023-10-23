const axios = require('axios');

const httpClient = axios.create({
    baseURL: process.env.SEND_PULSE_URL,
});

exports.spCallback = async (contactId) => {
    try {
        const { data } = await httpClient.post('/oauth/access_token', {
            grant_type: "client_credentials",
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
        });

        console.log("TOKEN", data);

        if (data.access_token) {
            await httpClient.post('/telegram/flows/run', {
                contact_id: contactId,
                flow_id: "65362e7643f1a5f882055e0b",
            }, {
                headers: {
                    'Authorization': `Bearer ${data.access_token}` 
                }
            })
        }
    } catch(err) {
        console.log(err);
    }
}