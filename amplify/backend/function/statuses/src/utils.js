exports.getTableNameByProductType = (type, env) => `${type}-${env}`

exports.getEmailTemplateName = (productType, orderType) => {
    if(productType === 'events') {
        return 'MasterClassInstabook'
    }
    if(productType === 'courses') {
        if(orderType === 'PRESALE') {
            return 'WorkShopPresale'
        }
        if(orderType === 'FULL') {
            return 'WorkShopFullBuy'
        }
    }
    if(productType === 'products') {
        return 'MasterClassInstabook'
    }
}