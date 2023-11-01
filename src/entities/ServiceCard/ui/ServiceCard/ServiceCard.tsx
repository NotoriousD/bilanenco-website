import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

import css from './serviceCard.module.scss'
import { ServiceCardProps } from './types'


export const ServiceCard: FC<ServiceCardProps> = ({
    id,
    title,
    text
}) => {
    return (
        <div className={css.root}>
            <div className={css.description}>
                <h3 className={css.title}>{title}</h3>
                <div className={css.text} dangerouslySetInnerHTML={{__html: text}} />
            </div>
            <div className={css.link}>
                <Link href={`/product/${id}`}>Детальніше</Link>
            </div>
        </div>
    )
}
