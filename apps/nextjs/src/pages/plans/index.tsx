import { GetServerSideProps } from "next";
import { MobilePlanList } from "../../components/plan/mobile/mobile-list";
import { prefetchTrpcQueries } from "../../helpers/prefetchTrpcQueries";
import { i18nGetServerSideProps } from "../../helpers/i18nGetServerSidePropsMiddleware";
import { MobileLayout } from "../../layout/mobile/mobile-layout";
import { trpc } from "../../utils/trpc";
import { NextPageWithLayout } from "../_app";

const Page: NextPageWithLayout = () => {
  const { data } = trpc.plan.currentSchoolYear.useQuery();

  return <MobilePlanList data={data ?? []} />;
};

Page.getLayout = (page) => {
  return <MobileLayout activeTab="plan">{page}</MobileLayout>;
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      trpcState: await prefetchTrpcQueries(context, async (ssg) => {
        await ssg.plan.currentSchoolYear.prefetch();
      }),
      ...(await i18nGetServerSideProps(context, ["pages/plans/index", "user/common"])),
    },
  };
};
