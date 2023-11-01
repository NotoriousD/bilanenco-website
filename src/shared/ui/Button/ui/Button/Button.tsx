import cx from 'classnames'
import Link from 'next/link';
import React, { PropsWithChildren, ReactNode, ElementType, ComponentProps, memo } from "react"

import css from './button.module.scss';


export enum ButtonVariants {
    Outlined = 'outlined',
    Primary = 'primary',
    Contained = 'container',
    Text = 'text',
}

export const ButtonDefaultType = 'button' as const
export type ButtonDefaultAsType = typeof ButtonDefaultType

export type ButtonOwnProps<E extends ElementType> = {
    as?: E
    variant?: ButtonVariants
    icon?: ReactNode
}

export type ButtonProps<E extends ElementType> = PropsWithChildren<ButtonOwnProps<E>> &
    Omit<ComponentProps<E>, keyof ButtonOwnProps<E>>

const variants = {
    [ButtonVariants.Contained]: css.contained,
    [ButtonVariants.Outlined]: css.outlined,
    [ButtonVariants.Primary]: css.primary,
    [ButtonVariants.Text]: css.text,
};

export const Button = memo(<E extends React.ElementType = ButtonDefaultAsType>({
    children,
    as,
    variant = ButtonVariants.Primary,
    icon,
    className,
    href,
    ...otherProps
}: ButtonProps<E>) => {
    const Component = as === "a" ? Link : ButtonDefaultType
    return (
        <Component
            className={cx(css.root, variants[variant], {
                [css.between]: Boolean(icon),
            }, className)}
            href={href}
            {...otherProps}
        >
            {children}
            {icon && <>{icon}</>}
        </Component>
    )
})
