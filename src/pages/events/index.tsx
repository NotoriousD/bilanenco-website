import Head from 'next/head'
import React from 'react'

import { Banner } from 'features/Banner'

export default function EventsPage() {
  return (
    <>
      <Head>
        <title>Події</title>
      </Head>
      <Banner handlerOpenModal={() => { }} />
    </>
  )
}
