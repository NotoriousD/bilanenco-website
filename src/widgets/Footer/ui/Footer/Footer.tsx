import React from "react"

import { Container } from "shared/ui/Container"
import { Logo } from "shared/ui/Logo"

import css from './footer.module.scss'

export const Footer: React.FC = () => {
    return (
        <div className={css.root}>
            <Container>
                <div className={css.content}>
                    <Logo />
                    Social List
                </div>
            </Container>
        </div>
    )
};
