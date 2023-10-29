import { Currencies } from 'shared/ui/Currencies'

export interface ISingleEvent {
    id: string
    currency: Currencies
    date: string
    description: string
    price: number
    subType: string
    title: string
    slug: string
}