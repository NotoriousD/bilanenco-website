import cn from "classnames";
import Image from 'next/image'
import React, { FC, useState } from 'react'
import { EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Button } from 'shared/ui/Button'
import { Container } from 'shared/ui/Container';
import css from './carousel.module.scss'

import 'swiper/css'
import 'swiper/css/effect-fade'

import { TCarouselItem, BannerType } from './types'

interface Props {
    items: TCarouselItem[]
    type: BannerType
    handlerOpenModal?: () => void
}

export const Carousel: FC<Props> = ({ items, type, handlerOpenModal }) => {

    switch (type) {
        case (BannerType.Carousel):
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
                    {items && items.map((item: TCarouselItem) => (
                        <SwiperSlide key={item.id}>
                            {
                                item?.imgSource &&
                                <Image src={item?.imgSource} className={css.image} alt='' />
                            }
                            <div>
                                {item?.title && <h1>Подія</h1>}
                                {item?.content && <div>text</div>}
                                <Button onClick={handlerOpenModal}>Записатися</Button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )
        case (BannerType.Banner):
            return (
                <div className={css.bannerWrapper}>
                    <Image
                        src={items[0]?.imgSource}
                        className={cn(css.image, { [css.bigImage]: type === BannerType.Banner })}
                        alt=''
                    />
                    <div className={css.bannerContent}>
                        <Container>
                            <div className={css.bannerBox}>
                                <h1 className={cn("h1-title", css.bannerTitle)}>
                                    <span>СЕЛФ-КОНТЕНТ</span>
                                </h1>
                                <h2>Майстер-клас із самостійної зйомки </h2>
                                <div className={css.bannerText}>
                                    <div className={css.bannerTextItem}>
                                        <h3>Для кого?</h3>
                                        <ul>
                                            <li> Для тих, кого нікому фотографувати;</li>
                                            <li>Для тих, хто мріє про естетичний контент, як в улюблених блогерів;</li>
                                            <li>Для тих, хто бажає вирізнятися та створювати унікальний креативний контент;</li>
                                            <li>Для тих, хто хоче апгрейднути свої скіли та бачення зйомки й заробляти більше;</li>
                                        </ul>
                                    </div>
                                    <div className={css.bannerTextItem}>
                                        <h3>Що ви отримаєте?</h3>
                                        <ul>
                                            <li>Рекомендації по налаштуваннях камери телефону, обладнанню, зйомці, позуванню;</li>

                                            <li>Секрети роботи та реалізації референсів 1:1,  дізнаєтеся, як створювати креативний контент, що впливає на вартість ваших зйомок;</li>
                                        </ul>
                                    </div>
                                </div>
                                <Button onClick={handlerOpenModal}>Придбати за 799 грн</Button>
                            </div>
                        </Container>
                    </div>
                </div>
            )
    }
}
