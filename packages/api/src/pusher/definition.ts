import { z } from "zod";

export const pusherDefinition = {
  chat: {
    message: z.object({
      message: z.string().min(1).max(1000),
      user: z.string().min(1).max(1000),
    }),
  },
  another: {
    example: z.object({
      example: z.string().min(1).max(1000),
    }),
  },
} as const;
