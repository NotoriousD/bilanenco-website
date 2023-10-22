import React from "react"

import { Carousel } from 'entities/Carousel'

import { TCarouselItem, BannerType } from "entities/Carousel";

import mainImage from 'shared/assets/main.jpg';

import css from './banner.module.scss'

const mocks: TCarouselItem[] = [
    {
        id: "1",
        imgSource: mainImage,
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

interface IBanner {
    type?: BannerType
    handlerOpenModal?: () => void
}

export const Banner: React.FC<IBanner> = ({ type = BannerType.Banner, handlerOpenModal }) => {
    return (
        <div className={css.root}>
            <Carousel handlerOpenModal={handlerOpenModal} type={type} items={mocks} />
        </div>
    );
};
