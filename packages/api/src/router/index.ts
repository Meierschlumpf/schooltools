import { router } from "../trpc";
import { authRouter } from "./auth";
import { planRouter } from "./plan";
import { semesterRouter } from "./semester";

export const appRouter = router({
  auth: authRouter,
  plan: planRouter,
  semester: semesterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
