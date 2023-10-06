import React from "react"

import { Navigation } from 'features/Navigation'

import { Button } from "shared/ui/Button"
import { Container } from "shared/ui/Container"
import { Logo } from "shared/ui/Logo"

import css from "./header.module.scss"

export const Header: React.FC = ({ }) => {
    return (
        <header className={css.root}>
            <Container>
                <div className={css.content}>
                    <Logo />
                    <nav className={css.nav}>
                        <Navigation />
                        <Button>
                            Ввійти
                        </Button>
                    </nav>
                </div>
            </Container>
        </header>
    );
};
