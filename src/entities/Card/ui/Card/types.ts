import { StaticImageData } from "next/image"

export interface CardProps {
    id: string
    title: string
    image: StaticImageData
    date?: string
    availablePlaces?: number
}