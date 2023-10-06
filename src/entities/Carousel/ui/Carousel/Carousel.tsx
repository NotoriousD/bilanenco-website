import Image from 'next/image'
import React, { FC } from 'react'
import { EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import css from './carousel.module.scss'

import 'swiper/css'
import 'swiper/css/effect-fade'

interface Props {
    items: any[]
}

export const Carousel: FC<Props> = ({ items }) => {
    return (
        <Swiper
            modules={[EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            effect="fade"
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            {items && items.map((item) => (
                <SwiperSlide key={item.key}>
                    <Image src={item.src} className={css.image} alt='' />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
