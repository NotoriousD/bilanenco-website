import { Authenticator } from "@aws-amplify/ui-react"
import { API } from 'aws-amplify'
import type { NextPage } from "next"
import Head from "next/head"
import { useCallback, useEffect } from "react"

import { ProductList, mockProducts } from "widgets/ProductList"

import { Banner } from "features/Banner"
import { BannerType } from "features/Banner/ui/Banner"

const Home: NextPage = () => {
    const fetchPackages = useCallback(async () => {
        try {
            const response = await API.get('events', '/events', {});
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        fetchPackages();
    }, [fetchPackages]);
    
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Banner type={BannerType.Carousel}/>
            <ProductList title="Івенти" list={mockProducts} />
            <ProductList title="Послуги" list={mockProducts} />
            <ProductList title="Курси" list={mockProducts} />
        </>
    );
};
export default Home;
