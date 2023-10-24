import { Amplify } from "aws-amplify"
import type { AppProps } from 'next/app'

import { Footer } from 'widgets/Footer'
import { Header } from 'widgets/Header'

import 'shared/styles/main.scss'

import "@aws-amplify/ui-react/styles.css"

import awsExports from "../aws-exports"

Amplify.configure({ ...awsExports, ssr: true })

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </>
    )
}