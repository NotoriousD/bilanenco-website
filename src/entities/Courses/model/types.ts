import { Currencies } from "shared/ui/Currencies"

export interface Package {
    id: string
    name: string
    price: number
    description: string
    available_places: number
    sale_price: number
}

export interface ICourse {
    id: string
    title: string
    currency: Currencies
    date: string
    packages: Package[]
    isPresale: boolean
    isSale: boolean
    start_sale_date: string
    end_sale_date: string
}

export interface _Product {
    id: string
    title: string
    currency: Currencies
}