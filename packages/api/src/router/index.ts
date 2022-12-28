import { router } from "../trpc";
import { authRouter } from "./auth";
import { planRouter } from "./plan";

export const appRouter = router({
  auth: authRouter,
  plan: planRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
