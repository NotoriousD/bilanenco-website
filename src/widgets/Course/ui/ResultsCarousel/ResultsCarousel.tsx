import React from 'react'

import { BannerType, Carousel } from 'entities/Carousel'

import { resultCarouselItems } from '../../model'

export const ResultsCarousel = () => {
    return (
        <Carousel
            type={BannerType.Carousel}
            items={resultCarouselItems}
            slidesPerView={4}
            spaceBetween={15}
            withBorderRadius
            breakpoints={{
                900: {
                    slidesPerView: 4
                },
                550: {
                    slidesPerView: 2
                },
                320: {
                    slidesPerView: 1
                }
            }}
        />
    )
}
