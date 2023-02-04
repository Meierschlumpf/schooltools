import { appRouter, createContext } from "@acme/api";
import { Button, Container, SegmentedControl } from "@mantine/core";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import superjson from "superjson";
import { z } from "zod";
import { MobilePlanList } from "../../../../components/plan/mobile/mobile-list";
import { i18nGetServerSideProps } from "../../../../helpers/i18nGetServerSidePropsMiddleware";
import { MobileLayout } from "../../../../layout/mobile/mobile-layout";
import { trpc } from "../../../../utils/trpc";
import { NextPageWithLayout } from "../../../_app";

const Page: NextPageWithLayout = () => {
  const query = useRouter().query as QueryType;
  const { data } = trpc.plan.semester.useQuery(
    {
      year: parseInt(query.year ?? "0"),
      season: query.season ?? "autumn",
    },
    { enabled: !!query.year && !!query.season },
  );

  if (!query.season || !query.year) return null;

  return <MobilePlanList data={data ?? []} />;
};

Page.getLayout = (page) => {
  return <MobileLayout activeTab="plan">{page}</MobileLayout>;
};

export default Page;

// Query param schema to validate query parameters
const queryParamSchema = z.object({
  year: z.preprocess((s) => parseInt(z.string().regex(/^\d+$/).parse(s), 10), z.number().min(2000).max(2100)),
  season: z.enum(["spring", "autumn"]),
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query as QueryType;

  if (!query.year || !query.season || !queryParamSchema.safeParse(query).success)
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

  await ssg.plan.semester.prefetch({
    year: parseInt(query.year),
    season: query.season,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      ...(await i18nGetServerSideProps(context, ["pages/plans/index", "user/common"])),
    },
  };
};

type QueryType = { year?: string; season?: "autumn" | "spring" };
