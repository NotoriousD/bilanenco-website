import { Authenticator } from "@aws-amplify/ui-react"
import { API } from 'aws-amplify'
import type { NextPage } from "next"
import Head from "next/head"
import { useCallback, useEffect } from "react"

import { Masterclasses , mockClasses } from "widgets/Masterclasses"
import { ProductList, mockProducts } from "widgets/ProductList"
import { ServicesBlock, mockServices } from "widgets/ServicesBlock"

import { Banner } from "features/Banner"
import { BannerType } from "entities/Carousel"
import servicesBG from 'shared/assets/servicesBG.jpg'
import { Background } from "shared/ui/Background"
import { Content } from "shared/ui/Content"




const Home: NextPage = () => {
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
            <Banner handlerOpenModal={() => { }} type={BannerType.Carousel} />
            <Content>
                <Background src={servicesBG} alt="bg"/>
                <Masterclasses list={mockClasses} />
                <ServicesBlock title="Послуги" list={mockServices} />
            </Content>
            
            <ProductList title="Івенти" list={mockProducts} />
            <ProductList title="Послуги" list={mockProducts} />
            <ProductList title="Курси" list={mockProducts} />
        </>
    );
};
export default Home;
