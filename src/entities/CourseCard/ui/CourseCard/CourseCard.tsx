import cn from "classnames";
import Link from 'next/link'
import React, { FC } from 'react'

import { Button } from "shared/ui/Button";

import css from './courseCard.module.scss'

import { CourseCardProps } from './types'


export const CourseCard: FC<CourseCardProps> = ({
    id,
    title,
    subtitle,
    text
}) => {
    return (
        <div className={css.root}>
            <div className={css.description}>
                <div className={cn("h2-title",css.title)}>{title}</div>
                <div className={css.subtitle}>{subtitle}</div>
                <div className={css.text} dangerouslySetInnerHTML={{__html:text}} />
            </div>
            <div className={css.action}>
                <Button as={"a"} href={"/services/"} >Детальніше</Button>
            </div>
        </div>
    )
}
