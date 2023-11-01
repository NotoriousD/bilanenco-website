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
    description
}) => {
    return (
        <div className={css.root}>
            <div className={css.description}>
                <div className={css.head}>
                    <div className={cn("h2-title",css.title)}>Майстер клас</div>
                    {title && <div className={css.subtitle}>{title}</div>}
                </div>
                {description && <div className={css.text} dangerouslySetInnerHTML={{__html:description}} />}
            </div>
            <div className={css.action}>
                <Button as={"a"} href={`/services/${id}`}>Детальніше</Button>
            </div>
        </div>
    )
}
