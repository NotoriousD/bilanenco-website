import { Currencies } from "shared/ui/Currencies"

export interface Package {
    id: string
    name: string
    price: number
    description: string
    available_places: number
}

export interface ICourse {
    id: string
    title: string
    currency: Currencies
    date: string
    packages: Package[]
    isPresale: boolean
}