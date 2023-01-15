import { publicProcedure, router } from "../trpc";

export const semesterRouter = router({
  future: publicProcedure.query(async ({ ctx }) => {
    const now = new Date();
    return await ctx.prisma.semester.findMany({
      where: {
        start: {
          gt: now,
        },
      },
    });
  }),
});
