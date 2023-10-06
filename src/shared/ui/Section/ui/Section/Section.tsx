import cn from 'classnames'
import React, { PropsWithChildren } from 'react'

import css from './section.module.scss'

interface Props {
    title: string
    classNames?: string
}

export const Section: React.FC<PropsWithChildren<Props>> = ({ title, classNames, children }) => {
    return (
        <div className={cn(css.root, classNames)}>
            <div className={css.header}>
                <h3 className={css.title}>{title}</h3>
            </div>
            <div className={css.content}>
                {children}
            </div>
        </div>
    )
}
