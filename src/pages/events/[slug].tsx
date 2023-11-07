import { API } from 'aws-amplify'
import { GetServerSideProps } from "next"
import Head from "next/head"
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { Banner } from 'features/Banner'
import { ISingleEvent } from 'features/Banner/model/types'
import { Registration } from 'features/Registration'

import { BannerType } from 'entities/Carousel'

interface Props {
    event: ISingleEvent
}

export default function SingleEventPage({ event }: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const slug = router.query.slug

    console.log(event);

    const contactId = searchParams?.get('contact_id')

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
            <Banner data={event} handlerOpenModal={handleOpenModal} type={BannerType.Banner} />
            {openModal && (
                <Registration
                    contactId={contactId}
                    productId={slug as string}
                    productType='events'
                    currency={event.currency}
                    onClose={handleCloseModal}
                />
            )}
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const slug = params?.slug as string;
    const event = await API.get('events', `/events/${slug}`, {})

    if (!event.data) {
        return {
            notFound: true,
        }
    }

    if (event.data) {
        return {
            props: {
                event: event.data
            }
        }
    }

    return {
        props: {
            event,
        },
    };
};
