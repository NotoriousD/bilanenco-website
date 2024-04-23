import React, { FC } from 'react'

import { SingleCarousel } from "features/SingleCarousel";
import { CourseCard, CourseCardProps } from "entities/CourseCard";
import { Container } from 'shared/ui/Container'

import css from './masterclasses.module.scss'

interface Props {
    list: CourseCardProps[]
}

export const Masterclasses: FC<Props> = ({ list }) => {
    return (
        <div className={css.root}>
            <Container>
                <SingleCarousel items={list} renderItem={(item: CourseCardProps) => <CourseCard {...item} />} />
            </Container>
        </div>
    )
}
