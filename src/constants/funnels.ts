export enum Funnels {
    MasterClass = 'master_class'
}

export const funnelsDiscount = {
    [Funnels.MasterClass]: 15
}

export const getPriceByFunnelDiscount = (price: number, funnel: string | null = null) => {
    const obj = {
        isDiscounted: false,
        discountPrice: price
    }
    if(funnel && funnel in funnelsDiscount) {
        const rate = price * (funnelsDiscount[funnel as Funnels] / 100)
        obj.isDiscounted = true
        obj.discountPrice = Math.round(price - rate)
        return obj
    }
    return obj
}