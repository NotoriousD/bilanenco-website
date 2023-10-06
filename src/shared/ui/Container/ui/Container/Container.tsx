import React, { PropsWithChildren } from "react"

import css from './container.module.scss'

export const Container: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={css.root}>
            {children}
        </div>
    )
};
