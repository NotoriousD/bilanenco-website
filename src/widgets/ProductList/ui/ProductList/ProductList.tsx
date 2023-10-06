import React, { FC } from 'react'

import { ProductGrid } from 'features/ProductGrid'

import { CardProps } from 'entities/Card'

import { Button } from 'shared/ui/Button'
import { Container } from 'shared/ui/Container'
import { Section } from 'shared/ui/Section'

import css from './productList.module.scss'

interface Props {
    title: string
    list: CardProps[]
    more?: string
}

export const ProductList: FC<Props> = ({ title, list, more }) => {
    return (
        <div className={css.root}>
            <Container>
                <Section title={title}>
                    <ProductGrid list={list} />
                </Section>
                {more && (
                    <Button>
                        Більше
                    </Button>
                )}
            </Container>
        </div>
    )
}
