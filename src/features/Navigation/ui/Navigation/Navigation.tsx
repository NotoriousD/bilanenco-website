import Link from 'next/link'
import React from 'react'

import { mockMenu } from './mocks'

import css from './navigation.module.scss'

import { Menu } from './types'


interface Props {
    list?: Menu[]
}

export const Navigation: React.FC<Props> = ({ list = mockMenu }) => {
    return (
        <ul className={css.root}>
            {list && list.map(({ id, title, path }) => (
                <li key={id} className={css.menuItem}>
                    <Link href={path} className={css.link}>{title}</Link>
                </li>
            ))}
        </ul>
    )
}
