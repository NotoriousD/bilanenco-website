export enum Funnels {
    MasterClass = 'master_class'
}

export const funnelsDiscount = {
    [Funnels.MasterClass]: 20
}

export const getPriceByFunnelDiscount = (price: number, funnel: string | null = null) => {
    const obj = {
        isDiscounted: false,
        discountPrice: price
    }
    if(funnel && funnel in funnelsDiscount) {
        obj.isDiscounted = true
        obj.discountPrice = price - funnelsDiscount[funnel as Funnels]
        return obj
    }
    return obj
}