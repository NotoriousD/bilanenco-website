import cn from "classnames";
import Link from 'next/link'
import React, { FC } from 'react'


import { ServicesList } from 'features/ServicesList/ui/ServicesList'
import { ServiceCardProps } from 'entities/ServiceCard'
import { Container } from 'shared/ui/Container'

import css from './servicesBlock.module.scss'



interface Props {
    title: string
    list: ServiceCardProps[]
}

export const ServicesBlock: FC<Props> = ({ list, title }) => {
    return (
        <div className={css.root}>
            <Container>
                <h2 className={cn("h2-title", css.title)}>{title}</h2>
                <ServicesList list={list} />
                <div className={css.moreLink}>
                <Link href={`/services/`} >Дивитись бiльше</Link>
                </div>
            </Container>
        </div>
    )
}
