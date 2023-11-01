import { Authenticator } from "@aws-amplify/ui-react"
import { API } from 'aws-amplify'
import { GetServerSideProps } from "next"
import type { NextPage } from "next"
import Head from "next/head"
import { useCallback, useEffect } from "react"

import { Intensive, mockIntensive } from "widgets/Intensive"
import { Masterclasses , mockClasses } from "widgets/Masterclasses"
import { ServicesBlock, mockServices } from "widgets/ServicesBlock"

import heroBG from 'shared/assets/main.jpg'
import servicesBG from 'shared/assets/servicesBG.jpg'
import workshopBg from 'shared/assets/workshopBg.jpg'


import { Background } from "shared/ui/Background"
import { Content } from "shared/ui/Content"


const Home: NextPage = ({events}:any) => {
    // const fetchPackages = useCallback(async () => {
    //     try {
    //         const response = await API.post('emails', '/send', {
    //             body: {
    //                 name: 'test',
    //                 address: 'dkruhlikov@gmail.com'
    //             }
    //         });
    //         console.log(response)
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }, []);

    // useEffect(() => {
    //     fetchPackages();
    // }, [fetchPackages]);

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Content classNames="full-height">
                <Background src={heroBG} alt="Hero bg"/>
            </Content>
            <Content>
                <Background src={servicesBG} alt="services bg"/>
                <Masterclasses list={events} />
                <ServicesBlock title="Послуги" list={mockServices} />
            </Content>
            <Content>
                <Background src={workshopBg} alt="workshop bg"/>
                <Intensive list={mockIntensive}/>
            </Content>
        </>
    );
};
export default Home;


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const events = await API.get('events', `/events`, {});
    

    if (!events.data) {
        return {
            notFound: true,
        }
    }

    if (events.data) {
        return {
            props: {
                events: events.data
            }
        }
    }

    return {
        props: {
            events,
        },
    };
};
