import cn from 'classnames'
import React from 'react'

import { ISingleEvent } from 'features/Banner/model/types'


import { Button } from 'shared/ui/Button'
import { Container } from 'shared/ui/Container'
import { getPriceByCurrency } from 'shared/ui/Currencies'

import css from './singleBanner.module.scss'

interface Props extends ISingleEvent {
    handleOpenModal?: () => void
}

export const SingleBanner: React.FC<Props> = ({
    currency,
    description,
    price,
    subType,
    title,
    handleOpenModal,
}) => {
    return (
        <div className={css.bannerWrapper}>
            <div className={css.bannerContent}>
                <Container>
                    <div className={css.bannerBox}>
                        <h1 className={cn("h1-title", css.bannerTitle)}>
                            <span>{title}</span>
                        </h1>
                        <h2>{subType}</h2>
                        <div className={css.bannerDescription}>
                            <div dangerouslySetInnerHTML={{ __html: description }} />
                        </div>
                        <Button className={css.button} onClick={handleOpenModal}>Придбати за {getPriceByCurrency(price, currency)}</Button>
                    </div>
                </Container>
            </div>
        </div>
    )
}
