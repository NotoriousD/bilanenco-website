import React from "react"

import { Carousel } from 'entities/Carousel'

import mainImage from 'shared/assets/main.jpg';

import css from './banner.module.scss'

const mocks = [
    { src: mainImage },
    { src: mainImage }
]

export const Banner: React.FC = () => {
    return (
        <div className={css.root}>
            <Carousel items={mocks} />
        </div>
    );
};
