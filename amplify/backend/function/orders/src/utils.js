exports.statuses = {
    pending: 'pending',
    invoiceCreated: 'invoice_created',
    paid: 'paid',
    failure: 'failure',
}

exports.productTypes = {
    course: 'courses',
    event: 'events',
    service: 'services',
    others: 'others'
}

exports.productNames = {
    [this.productTypes.course]: 'Курс',
    [this.productTypes.event]: 'Івент',
    [this.productTypes.service]: 'Послуга',
    [this.productTypes.others]: 'Інше',
}

exports.currencies = {
    uah: 'uah',
    usd: 'usd'
}

exports.getProductPriceByCurrency = (currency, price) => {
    if(currency === this.currencies.uah) return price
    if(currency === this.currencies.usd) return Math.floor(price * 37.4406) * 100
}

exports.getTableNameByProductType = (type, env) => `${type}-${env}`
