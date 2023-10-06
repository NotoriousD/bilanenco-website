import Image from 'next/image'
import React from "react"

import logoIcon from 'shared/assets/logo.svg'

import css from './logo.module.scss'

interface Props {

}

export const Logo: React.FC<Props> = ({ }) => {
    return <div className={css.root}>
        <Image src={logoIcon} alt="" />
    </div>
}
