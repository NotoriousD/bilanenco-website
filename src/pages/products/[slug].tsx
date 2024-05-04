import { API } from 'aws-amplify'
import { GetServerSideProps } from "next"
import Head from "next/head"
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'

import { Course } from 'widgets/Course'

import { Registration } from 'features/Registration'
import { RegistrationPresale } from 'features/RegistrationPresale'

import { ICourse } from 'entities/Courses'
import { Product } from 'views/Product'

interface Props {
    product: any;
}

export default function SingleCoursesPage({ product }: Props) {
    const [packageId, setPackageId] = useState<string | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [openPresaleModal, setOpenPresaleModal] = useState<boolean>(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const slug = router.query.slug

    console.log(product);

    const contactId = searchParams?.get('contact_id')
    const funnel = searchParams?.get('funnel')

    const handleOpenModal = useCallback((packageId: string) => {
        setPackageId(packageId)
        setOpenModal(!openModal)
    }, [openModal])

    const handleOpenPresaleModal = useCallback(() => {
        setOpenModal(false);
        setOpenPresaleModal(true)
    }, [])

    const handleCloseModal = () => {
        setOpenModal(!openModal)
    }

    const handleClosePresaleModal = useCallback(() => {
        setOpenPresaleModal(false)
    }, [])

    return (
        <>
            <Head>
                <title>{product.title}</title>
            </Head>
            <Product {...product} handleOpenModal={() => { }} />
            {/* <Course {...course} funnel={funnel} handleOpenModal={handleOpenModal} /> */}
            {/* {openModal && packageId && (
                <Registration
                    packageId={packageId}
                    contactId={contactId}
                    productType='courses'
                    currency={course.currency}
                    productId={slug as string}
                    packages={course.packages}
                    funnel={funnel}
                    isPresale={course?.isPresale}
                    onClose={handleCloseModal}
                    onClick={handleOpenPresaleModal}
                />
            )} */}
            {/* {openPresaleModal && packageId && (
                <RegistrationPresale
                    packageId={packageId}
                    contactId={contactId}
                    productType='courses'
                    productId={slug as string}
                    packages={course.packages}
                    onClose={handleClosePresaleModal}
                />
            )} */}
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const slug = params?.slug as string;
    const { data } = await API.get('products', `/product/${slug}`, {})

    // if (!course.data) {
    //     return {
    //         notFound: true,
    //     }
    // }

    // if (course.data) {
    //     return {
    //         props: {
    //             course: course.data
    //         }
    //     }
    // }

    return {
        props: {
            product: data,
        }
    };
};
