exports.getTableNameByProductType = (type, env) => `${type}-${env}`

exports.getEmailTemplateName = (productType, orderType) => {
    if(productType === 'events') {
        return 'test'
    }
    if(productType === 'courses') {
        if(orderType === 'PRESALE') {
            return 'WorkShopPresale'
        }
        if(orderType === 'FULL') {
            return 'WorkShopFullBuy'
        }
    }
}