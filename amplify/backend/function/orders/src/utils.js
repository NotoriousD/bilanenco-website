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
        discount: 15,
    }
}

const currencies = {
    uah: 'uah',
    usd: 'usd'
}

exports.getProductPriceByCurrency = (currency, price, funnel = null, productType) => {
    let total = price;
    if(funnel && productType === funnels[funnel]?.type) {
        const rate = price * (funnels[funnel]?.discount / 100)
        total -= rate;
    }
    if(currency === currencies.uah) return total * 100
    if(currency === currencies.usd) return Math.floor(total * 37.406) * 100
}

exports.getTableNameByProductType = (type, env) => `${type}-${env}`