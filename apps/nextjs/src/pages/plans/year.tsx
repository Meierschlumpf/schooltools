import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { z } from "zod";
import { MobilePlanList } from "../../components/plan/mobile/mobile-list";
import { prefetchTrpcQueries } from "../../helpers/createProxySSGHelpers";
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

  if (!query.start || !query.end) return null;

  return <MobilePlanList data={data ?? []} />;
};

Page.getLayout = (page) => {
  return <MobileLayout activeTab="plan">{page}</MobileLayout>;
};

export default Page;

// Query param schema to validate query parameters
const queryParamSchema = z
  .object({
    start: z.preprocess((s) => parseInt(z.string().regex(/^\d+$/).parse(s), 10), z.number().min(2000).max(2099)),
    end: z.preprocess((e) => parseInt(z.string().regex(/^\d+$/).parse(e), 10), z.number().min(2001).max(2100)),
  })
  .refine((query) => query.end > query.start);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query as QueryType;

  if (!query.start || !query.end || !queryParamSchema.safeParse(query).success)
    return {
      notFound: true,
    };

  return {
    props: {
      trpcState: prefetchTrpcQueries(context, async (ssg) => {
        await ssg.plan.schoolYear.prefetch({
          start: parseInt(query.start!),
          end: parseInt(query.end!),
        });
      }),
      ...(await i18nGetServerSideProps(context, ["pages/plans/index", "user/common"])),
    },
  };
};

type QueryType = { start?: string; end?: string };
