import cn from "classnames";
import Image from 'next/image'
import React, { FC, useState } from 'react'
import { EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import css from './singleCarousel.module.scss'

import 'swiper/css'


export type Props = {
    items: any[]
    renderItem: (item:any) => React.ReactNode
}

export const SingleCarousel: FC<Props> = ({ items, renderItem}) => {
    return (
        <Swiper
            modules={[EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            {items && items.map((item) => (
                <SwiperSlide key={item.id}>
                    {renderItem(item)}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
