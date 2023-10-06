import type { AppProps } from 'next/app'

import { Footer } from 'widgets/Footer'
import { Header } from 'widgets/Header'

import 'shared/styles/main.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </>
    )
}