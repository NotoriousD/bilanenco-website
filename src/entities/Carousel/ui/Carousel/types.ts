import { StaticImport } from "next/dist/shared/lib/get-img-props"

export type TCarouselItem = {
  id: string,
  title?: string,
  imgSource: string | StaticImport,
  content?: string
}

export enum BannerType {
  Carousel = "carousel",
  Banner = "banner"
}