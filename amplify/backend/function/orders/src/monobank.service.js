const axios = require('axios');

const httpClient = axios.create({
    baseURL: process.env.PAYMENT_URL,
});

const currencyCodes = {
    usd: 840,
    uah: 980,
};

exports.getExchangeRates = async () => {
    try {
        const response = await httpClient.get('/bank/currency');

        const rate = response.data.find((item) => item.currencyCodeA === currencyCodes.usd && item.currencyCodeB === currencyCodes.uah);

        if (rate) {
            return rate.rateSell;
        }
    } catch (e) {
        console.log(e);
    }
};

exports.monobankCreateInvoice = async ({
    orderId,
    productId,
    amount,
    destination,
    name,
    redirectUrl,
    webHookUrl,
    token,
}) => {
    try {
        const response = await httpClient.post('/api/merchant/invoice/create', {
            amount,
            ccy: currencyCodes.uah,
            merchantPaymInfo: {
                reference: orderId,
                destination,
                basketOrder: [{
                    name,
                    qty: 1,
                    sum: amount,
                    code: productId,
                }]
            },
            redirectUrl,
            webHookUrl,
            validity: 3600,
        }, {
            headers: {
                'X-Token': token,
            }
        });

        if(response.data) {
            return response.data;
        }
    } catch(e) {
        return e.response.data
    }
}