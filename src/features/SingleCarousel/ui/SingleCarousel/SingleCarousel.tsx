import cn from "classnames"
import React, { FC } from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import css from './singleCarousel.module.scss';

import 'swiper/css';
import 'swiper/css/pagination';



export type Props = {
    items: any[]
    renderItem: (item: any) => React.ReactNode
}

export const SingleCarousel: FC<Props> = ({ items, renderItem }) => {
    return (
        <Swiper
            modules={[Pagination]}
            spaceBetween={5}
            slidesPerView={1}
            navigation
            speed={1000}
            pagination={{
                clickable: true,
            }}
            // scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log()}
            onSlideChange={() => console.log()}
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
