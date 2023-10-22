import React from 'react'
import Head from "next/head"

import { Banner } from 'features/Banner'
import { BannerType } from 'features/Banner/ui/Banner'

export default function SingleEvent() {
    return (
        <>
            <Head>
                <title>Події</title>
            </Head>
            <Banner type={BannerType.Banner}/>
        </>
    )
}
