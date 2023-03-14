import { router } from "../trpc";
import { userRouter } from "./user";
import { planRouter } from "./plan";
import { semesterRouter } from "./semester";
import { chatRouter } from "./chat";

export const appRouter = router({
  user: userRouter,
  plan: planRouter,
  semester: semesterRouter,
  chat: chatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
