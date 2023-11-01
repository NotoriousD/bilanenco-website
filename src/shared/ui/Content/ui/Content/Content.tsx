import cn from "classnames";
import React, { PropsWithChildren } from "react"

import css from './content.module.scss'

type Props = {
    classNames?: string
}

export const Content: React.FC<PropsWithChildren<Props>> = ({ children, classNames }) => {
    return (
        <div className={cn(css.root, classNames)}>
            {children}
        </div>
    )
};
