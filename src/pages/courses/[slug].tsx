import { API } from 'aws-amplify'
import { GetServerSideProps } from "next"
import Head from "next/head"
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'

import { Course } from 'widgets/Course'

import { Registration } from 'features/Registration'

import { ICourse } from 'entities/Courses'

interface Props {
    course: ICourse
}

export default function SingleCoursesPage({ course }: Props) {
    const [packageId, setPackageId] = useState<string | null>(null)
    const router = useRouter()
    const searchParams = useSearchParams()
    const slug = router.query.slug

    const contactId = searchParams?.get('contact_id')
    const funnel = searchParams?.get('funnel')

    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleOpenModal = useCallback((packageId: string) => {
        setPackageId(packageId)
        setOpenModal(!openModal)
    }, [openModal])

    const handleCloseModal = () => {
        setOpenModal(!openModal)
    };

    return (
        <>
            <Head>
                <title>{course.title}</title>
            </Head>
            <Course {...course} funnel={funnel} handleOpenModal={handleOpenModal} />
            {openModal && packageId && (
                <Registration
                    packageId={packageId}
                    contactId={contactId}
                    productType='courses'
                    currency={course.currency}
                    productId={slug as string}
                    packages={course.packages}
                    onClose={handleCloseModal}
                />
            )}
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const slug = params?.slug as string;
    const course = await API.get('courses', `/courses/${slug}`, {})

    if (!course.data) {
        return {
            notFound: true,
        }
    }

    if (course.data) {
        return {
            props: {
                course: course.data
            }
        }
    }

    return {
        props: {
            course: null,
        },
    };
};
