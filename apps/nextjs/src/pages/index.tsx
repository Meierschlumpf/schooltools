import { Title } from "@mantine/core";
import Head from "next/head";
import { MobileLayout } from "../layout/mobile/mobile-layout";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title>Hello World</Title>
    </>
  );
};

Home.getLayout = (page) => {
  return <MobileLayout activeTab="home">{page}</MobileLayout>;
};

export default Home;
