import Image, { StaticImageData } from "next/image";
import React, { PropsWithChildren } from "react"

import css from './background.module.scss'

export type Background = {
    src: StaticImageData | string
    alt: string
}


export const Background: React.FC<Background> = ({ src,alt }) => {
    return <Image
            src={src}
            alt={alt ? alt : ""}
            className={css.root}
        ></Image>
};
