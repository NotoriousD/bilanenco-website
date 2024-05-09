import { API } from 'aws-amplify'
import { GetServerSideProps } from "next"
import Head from "next/head"
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'

import { Product, Registration } from 'views/Product'

interface Props {
    product: any;
}

export default function SingleProductPage({ product }: Props) {
    const [packageId, setPackageId] = useState<string | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)
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

    const handleCloseModal = () => {
        setOpenModal(!openModal)
    }

    return (
        <>
            <Head>
                <title>{product.title}</title>
            </Head>
            <Product {...product} handleOpenModal={handleOpenModal} />
            {openModal && packageId && (
                <Registration
                    contactId={contactId}
                    productType='products'
                    currency={product.currency}
                    productId={slug as string}
                    funnel={funnel}
                    onClose={handleCloseModal}
                />
            )}
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const slug = params?.slug as string;
    const { data } = await API.get('products', `/product/${slug}`, {});
    console.log(data);

    if (!data) {
        return {
            notFound: true,
        }
    }

    if (data) {
        return {
            props: {
                product: data
            }
        }
    }

    return {
        props: {
            product: null
        }
    }
};
