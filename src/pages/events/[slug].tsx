import React, { useState } from 'react'
import Head from "next/head"

import { Banner } from 'features/Banner'
import { BannerType } from 'features/Banner/ui/Banner'
import { Registration } from 'features/Registration';

export default function SingleEvent() {

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
            <Banner handlerOpenModal={handleOpenModal} type={BannerType.Banner}/>
            {openModal && <Registration packageId={"1"}  onClose={handleCloseModal} />}
        </>
    )
}
