import { appRouter, createContext } from "@acme/api";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import superjson from "superjson";
import { MobilePlanList } from "../../components/plan/mobile/mobile-list";
import { i18nGetServerSideProps } from "../../helpers/i18nGetServerSidePropsMiddleware";
import { MobileLayout } from "../../layout/mobile/mobile-layout";
import { trpc } from "../../utils/trpc";
import { NextPageWithLayout } from "../_app";

const Page: NextPageWithLayout = () => {
  const query = useRouter().query as QueryType;
  const { data } = trpc.plan.schoolYear.useQuery(
    {
      start: parseInt(query.start ?? "0"),
      end: parseInt(query.end ?? "0"),
    },
    { enabled: !!query.start && !!query.end },
  );

  if (!query.start || !query.end) return <></>;

  return <MobilePlanList data={data ?? []} />;
};

Page.getLayout = (page) => {
  return <MobileLayout activeTab="plan">{page}</MobileLayout>;
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query as QueryType;

  // TODO: validate query with zod schema
  if (!query.start || !query.end)
    return {
      notFound: true,
    };

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext({
      req: context.req as any,
      res: context.res as any,
    }),
    transformer: superjson,
  });

  await ssg.plan.schoolYear.prefetch({
    start: parseInt(query.start),
    end: parseInt(query.end),
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      ...(await i18nGetServerSideProps(context, ["pages/plans/index", "user/common"])),
    },
  };
};

type QueryType = { start?: string; end?: string };
