import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

import { Button } from 'shared/ui/Button'

import css from './card.module.scss'

import { CardProps } from './types'

export const Card: FC<CardProps> = ({
    id,
    title,
    date,
    availablePlaces,
    image,
}) => {
    return (
        <div className={css.root}>
            <Image src={image} alt={title} className={css.image} />
            <div className={css.description}>
                <div className={css.title}>{title}</div>
                {date && <div className={css.date}>{date}</div>}
                {availablePlaces && <div className={css.available}>{availablePlaces}</div>}
            </div>
            <div className={css.actions}>
                <Button>
                    Записатись
                </Button>
                <Link href={`/product/${id}`}>Детальніше</Link>
            </div>
        </div>
    )
}
