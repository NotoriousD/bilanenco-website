import Link from 'next/link'
import React, { FC } from 'react'

import { ServiceCard, ServiceCardProps } from 'entities/ServiceCard'

import css from './servicesList.module.scss'



interface Props {
    list: ServiceCardProps[]
}

export const ServicesList: FC<Props> = ({ list }) => {
    return (
        <div className={css.root}>
            {list && list.map((item) => (
                <ServiceCard key={item.id} {...item} />
            ))}
        </div>
    )
}
