import { Currencies } from "./types"

const currencyTitle = {
    [Currencies.Uah]: 'грн',
    [Currencies.Usd]: '$'
}

export const getPriceByCurrency = (price: number, currency: Currencies) => {
    return `${price} ${currencyTitle[currency]}`
}