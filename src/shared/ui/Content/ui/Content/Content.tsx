import React, { PropsWithChildren } from "react"

import css from './content.module.scss'

export const Content: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={css.root}>
            {children}
        </div>
    )
};
