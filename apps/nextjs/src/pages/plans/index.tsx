import { appRouter, createContext } from "@acme/api";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { GetServerSideProps } from "next";
import superjson from "superjson";
import { i18nGetServerSideProps } from "../../helpers/i18nGetServerSidePropsMiddleware";
import { MobileLayout } from "../../layout/mobile/mobile-layout";
import { trpc } from "../../utils/trpc";
import { NextPageWithLayout } from "../_app";
import { MobilePlanList } from "../../components/plan/mobile/mobile-list";

const Page: NextPageWithLayout = () => {
  const { data } = trpc.plan.currentSchoolYear.useQuery();

  return <MobilePlanList data={data ?? []} />;
};

Page.getLayout = (page) => {
  return <MobileLayout activeTab="plan">{page}</MobileLayout>;
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext({
      req: context.req as any,
      res: context.res as any,
    }),
    transformer: superjson,
  });

  await ssg.plan.currentSchoolYear.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
      ...(await i18nGetServerSideProps(context, ["pages/plans/index", "user/common"])),
    },
  };
};
