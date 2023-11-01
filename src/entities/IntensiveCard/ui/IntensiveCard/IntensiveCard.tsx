import cn from "classnames";
import React, { FC } from 'react'

import { Button } from 'shared/ui/Button'

import css from './intensiveCard.module.scss'

import { IntensiveCardProps } from './types'



export const IntensiveCard: FC<IntensiveCardProps> = ({
    id,
    title,
    text
}) => {
    return (
        <div className={css.root}>
            <div className={css.description}>
                <h2 className={cn("big-title",css.title)} dangerouslySetInnerHTML={{__html: title}}/>
                <div className={css.text} dangerouslySetInnerHTML={{__html: text}} />
            </div>
            <div className={css.link}>
                <Button as="a" href={`/services/${id}`}>Детальніше</Button>
            </div>
        </div>
    )
}
