import cn from "classnames";
import Image from 'next/image'
import React, { FC, useState } from 'react'
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'

import css from './singleCarousel.module.scss';

import 'swiper/css';
import 'swiper/css/pagination';



export type Props = {
    items: any[]
    renderItem: (item:any) => React.ReactNode
}

export const SingleCarousel: FC<Props> = ({ items, renderItem}) => {
    return (
        <Swiper
            modules={[Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            speed={1200}
            pagination={{ 
                clickable: true,
            }}
            // scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            className={cn("single-swiper", css.root)}
        >
            {items && items.map((item) => (
                <SwiperSlide key={item.id}>
                    {renderItem(item)}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
