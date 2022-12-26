import { publicProcedure, router } from "../trpc";

export const planRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.lesson.findMany();
  }),
});
