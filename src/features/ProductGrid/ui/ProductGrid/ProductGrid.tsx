import React, { FC } from 'react'

import { Card, CardProps } from 'entities/Card'

import css from './productGrid.module.scss'

interface Props {
    list: CardProps[]
}

export const ProductGrid: FC<Props> = ({ list }) => {
    return (
        <div className={css.root}>
            {list && list.map((item) => (
                <Card key={item.id} {...item} />
            ))}
        </div>
    )
}
