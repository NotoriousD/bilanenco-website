import { Authenticator } from "@aws-amplify/ui-react"
import type { NextPage } from "next"
import Head from "next/head"

import { ProductList, mockProducts } from "widgets/ProductList"

import { Banner } from "features/Banner"
import { BannerType } from "features/Banner/ui/Banner"

const Home: NextPage = () => {
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
