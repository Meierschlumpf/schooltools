import { appRouter, createContext } from "@acme/api";
import superjson from "superjson";
import { createProxySSGHelpers as createProxySSGHelpersTrpc } from "@trpc/react-query/ssg";
import { GetServerSidePropsContext } from "next";

const createProxySSGHelpers = async (context: GetServerSidePropsContext) =>
  createProxySSGHelpersTrpc({
    router: appRouter,
    ctx: await createContext({
      req: context.req as any,
      res: context.res as any,
    }),
    transformer: superjson,
  });

export const prefetchTrpcQueries = async (context: GetServerSidePropsContext, callback?: (ssg: Awaited<ReturnType<typeof createProxySSGHelpers>>) => Promise<void>, prefetchUser = true) => {
  const ssg = createProxySSGHelpersTrpc({
    router: appRouter,
    ctx: await createContext({
      req: context.req as any,
      res: context.res as any,
    }),
    transformer: superjson,
  });

  if (prefetchUser) {
    await ssg.user.me.prefetch();
  }

  await callback?.(ssg);

  return ssg.dehydrate();
};
