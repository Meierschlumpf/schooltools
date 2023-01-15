import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { SCHOOLYEAR_END, SCHOOLYEAR_START } from "../constants";
import { publicProcedure, router } from "../trpc";

export const planRouter = router({
  currentSchoolYear: publicProcedure.query(async ({ ctx }) => {
    const start = getCurrentSchoolYearStart();
    const end = getCurrentSchoolYearEnd();

    const lessons = await ctx.prisma.lesson.findMany({
      where: {
        AND: [
          {
            date: {
              gte: start,
            },
          },
          {
            date: {
              lt: end,
            },
          },
        ],
      },
      include: {
        plan: true,
      },
    });

    return lessons.map(({ plan, ...lesson }) => ({
      ...lesson,
      start: lesson.start ?? plan.defaultLessonStart,
      end: lesson.end ?? plan.defaultLessonEnd,
    }));
  }),
  create: publicProcedure
    .input(
      z.object({
        semesterId: z.string().max(24),
        weekDay: z.number().min(1).max(6),
        start: z
          .number()
          .positive()
          .max(24 * 60),
        end: z
          .number()
          .positive()
          .max(24 * 60),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.start >= input.end) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Start should not be greater than end",
        });
      }

      const plan = await ctx.prisma.plan.findFirst({
        where: {
          semesterId: input.semesterId,
        },
      });

      if (plan) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "This plan already exists!",
        });
      }

      const res = await ctx.prisma.plan.create({
        data: {
          semesterId: input.semesterId,
          weekDay: input.weekDay,
          defaultLessonStart: input.start,
          defaultLessonEnd: input.end,
        },
      });

      return res;
    }),
});

const getCurrentSchoolYearStart = () => {
  const now = new Date();
  const [month, day] = SCHOOLYEAR_START;
  const thisYearStart = new Date(now.getFullYear(), month - 1, day);
  const lastYearStart = new Date(now.getFullYear() - 1, month - 1, day);

  return now >= thisYearStart ? thisYearStart : lastYearStart;
};

const getCurrentSchoolYearEnd = () => {
  const now = new Date();
  const [month, day] = SCHOOLYEAR_END;
  const thisYearEnd = new Date(now.getFullYear(), month - 1, day, 23, 59, 59, 999);
  const nextYearEnd = new Date(now.getFullYear() + 1, month - 1, day, 23, 59, 59, 999);

  return now < thisYearEnd ? thisYearEnd : nextYearEnd;
};
