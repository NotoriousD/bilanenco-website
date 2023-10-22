import Head from "next/head"
import { useRouter } from 'next/router'
import React, { useState } from 'react'


import { Banner } from 'features/Banner'
import { Registration } from 'features/Registration'

import { BannerType } from 'entities/Carousel'

export default function SingleEvent() {
    const router = useRouter();
    const slug = router.query.slug;

    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleOpenModal = () => {
        setOpenModal(!openModal);
    }

    const handleCloseModal = () => {
        setOpenModal(!openModal);
    };

    return (
        <>
            <Head>
                <title>Події</title>
            </Head>
            <Banner handlerOpenModal={handleOpenModal} type={BannerType.Banner} />
            {openModal && <Registration packageId={"1"} productId={slug as string} onClose={handleCloseModal} />}
        </>
    )
}
