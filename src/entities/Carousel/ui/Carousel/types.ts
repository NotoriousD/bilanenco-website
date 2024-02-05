import { StaticImport } from "next/dist/shared/lib/get-img-props"

export type TCarouselItem = {
  id: string,
  imgSource: string | StaticImport,
}

export enum BannerType {
  Carousel = "carousel",
  Banner = "banner"
}