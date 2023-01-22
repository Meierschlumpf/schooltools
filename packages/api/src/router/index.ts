import { router } from "../trpc";
import { userRouter } from "./auth";
import { planRouter } from "./plan";
import { semesterRouter } from "./semester";

export const appRouter = router({
  user: userRouter,
  plan: planRouter,
  semester: semesterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
