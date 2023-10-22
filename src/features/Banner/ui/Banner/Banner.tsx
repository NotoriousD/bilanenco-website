import React from "react"

import { Carousel } from 'entities/Carousel'

import mainImage from 'shared/assets/main.jpg';

import css from './banner.module.scss'


import { TCarouselItem } from "entities/Carousel/ui/Carousel/types";




export enum BannerType {
    Carousel = "carousel",
    Banner = "banner"  
}

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
    type: BannerType
    handlerOpenModal?: () => void
}

export const Banner: React.FC<IBanner> = ({type, handlerOpenModal}) => {
    return (
        <div className={css.root}>
            <Carousel handlerOpenModal={handlerOpenModal} type={type}  items={mocks} />
        </div>
    );
};
