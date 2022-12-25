import { GetServerSideProps } from "next";
import { i18nGetServerSideProps } from "../../helpers/i18nGetServerSidePropsMiddleware";
import { MobileLayout } from "../../layout/mobile/mobile-layout";
import { NextPageWithLayout } from "../_app";

const Page: NextPageWithLayout = () => {
  return <></>;
};

Page.getLayout = (page) => {
  return <MobileLayout activeTab="plan">{page}</MobileLayout>;
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await i18nGetServerSideProps(context, [
        "pages/plans/index",
        "user/common",
      ])),
    },
  };
};
