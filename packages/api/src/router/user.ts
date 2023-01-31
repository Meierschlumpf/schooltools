import { publicProcedure, router } from "../trpc";

export const userRouter = router({
  session: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  me: publicProcedure.query(({ ctx }) => {
    const user = ctx.prisma.user.findFirst({
      where: {
        id: ctx.session?.user.id,
      },
    });
    return user;
  }),
});
