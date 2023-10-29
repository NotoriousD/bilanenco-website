import Head from 'next/head'
import React from 'react'

import { Banner } from 'features/Banner'


export default function CoursesPage() {
    return (
        <>
            <Head>
                <title>Курси</title>
            </Head>
            <Banner handlerOpenModal={() => { }} />
        </>
    )
}
