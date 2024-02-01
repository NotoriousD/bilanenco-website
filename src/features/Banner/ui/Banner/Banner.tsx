import React from "react"

import { ISingleEvent } from 'features/Banner/model/types'

import { Carousel } from 'entities/Carousel'

import { TCarouselItem, BannerType } from "entities/Carousel"

import eventMainImage from 'shared/assets/main-event.jpg'
import mainImage from 'shared/assets/main.jpg'

import { SingleBanner } from '../SingleBanner'

import css from './banner.module.scss'

const mocks: TCarouselItem[] = [
    {
        id: "1",
        imgSource: eventMainImage,
        title: "text",
        content: "test"
    },
    {
        id: "2",
        imgSource: mainImage,
        title: "text",
        content: "aaaa"
    }
]

export interface IBanner {
    type?: BannerType
    data?: ISingleEvent
    handlerOpenModal: () => void
}

export const Banner: React.FC<IBanner> = ({ type = BannerType.Banner, data, handlerOpenModal }) => {

    if (type === BannerType.Banner && data) {
        return (
            <div className={css.root}>
                <SingleBanner {...data} handleOpenModal={handlerOpenModal} />
            </div>
        )
    }

    if (type === BannerType.Carousel) {
        return (
            <div className={css.root}>
                <Carousel handlerOpenModal={handlerOpenModal} type={type} items={mocks} />
            </div>
        )
    }
};
