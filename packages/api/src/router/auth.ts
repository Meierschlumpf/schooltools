import { publicProcedure, router } from "../trpc";

export const userRouter = router({
  session: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  me: publicProcedure.query(({ ctx }) => {
    return ctx.session?.user;
  }),
});
