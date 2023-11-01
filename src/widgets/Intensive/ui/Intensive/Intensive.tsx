import React, { FC } from 'react'


import { SingleCarousel } from "features/SingleCarousel";
import { IntensiveCard, IntensiveCardProps } from "entities/IntensiveCard";
import { Container } from 'shared/ui/Container'

import css from './Intensive.module.scss'
interface Props {
    list: IntensiveCardProps[]
}

export const Intensive: FC<Props> = ({ list }) => {
    return (
        <div className={css.root}>
            <Container>
                <SingleCarousel items={list} renderItem={(item: IntensiveCardProps) => <IntensiveCard {...item} />} />
            </Container>
        </div>
    )
}
