import { Amplify } from "aws-amplify"
import dynamic from 'next/dynamic'
import type { AppProps } from 'next/app'

import 'shared/styles/main.scss'

import "@aws-amplify/ui-react/styles.css"

import awsExports from "../aws-exports"

const Header = dynamic(() => import('widgets/Header').then(mod => mod.Header))
const Footer = dynamic(() => import('widgets/Footer').then(mod => mod.Footer))

Amplify.configure({ ...awsExports, ssr: true })

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            {/* <Header /> */}
            <Component {...pageProps} />
            {/* <Footer /> */}
        </>
    )
}