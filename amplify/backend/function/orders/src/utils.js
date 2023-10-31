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

exports.orderTypes = {
    full: 'FULL',
    presale: 'PRESALE'
}

exports.productNames = {
    [this.productTypes.course]: 'Курс',
    [this.productTypes.event]: 'Івент',
    [this.productTypes.service]: 'Послуга',
    [this.productTypes.others]: 'Інше',
}

const funnels = {
    ['master_class']: {
        type: this.productTypes.course,
        discount: 20,
    }
}

const currencies = {
    uah: 'uah',
    usd: 'usd'
}

exports.getProductPriceByCurrency = (currency, price, funnel = null, productType) => {
    let total = price;
    if(funnel && productType === funnels[funnel]?.type) {
        total -= funnels[funnel]?.discount;
    }
    if(currency === currencies.uah) return total * 100
    if(currency === currencies.usd) return Math.floor(total * 37.4406) * 100
}

exports.getTableNameByProductType = (type, env) => `${type}-${env}`