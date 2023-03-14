import { z, ZodSchema } from "zod";
import { pusherInstance } from "../pusher/instance";
import { protectedProcedure, router } from "../trpc";

export const chatRouter = router({
  sendMessage: protectedProcedure
    .input(
      z.object({
        message: z.string().min(1).max(1000),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      pusherInstance().trigger("chat", "message", {
        message: input.message,
        user: ctx.session.user.name ?? "unknown",
      });
    }),
});

type MessageProcedure = PusherMessageReturn<any, any>;
type PusherChannelInput = ZodSchema | undefined;
type PusherMessage = Record<string, MessageProcedure>;

type PusherRouterReturn<TMessages extends PusherMessage, TChannelInput extends PusherChannelInput> = TChannelInput extends undefined
  ? TMessages
  : TChannelInput extends ZodSchema
  ? (input: z.infer<Exclude<TChannelInput, undefined>>) => TMessages
  : never;

const pusherRouter = <TMessages extends PusherMessage, TChannelInput extends PusherChannelInput = undefined>(
  messages: TMessages,
  channelInput?: TChannelInput,
): PusherRouterReturn<TMessages, TChannelInput> => {
  if (channelInput === undefined) {
    return messages as PusherRouterReturn<TMessages, TChannelInput>;
  }

  return ((input: z.infer<Exclude<TChannelInput, undefined>>) => messages) as PusherRouterReturn<TMessages, TChannelInput>;
};

type TriggerFunction<TTriggerInput extends ZodSchema> = (input: z.infer<TTriggerInput>) => void;

type PusherMessageReturn<TMessageInput extends ZodSchema | undefined, TTriggerInput extends ZodSchema> = TMessageInput extends undefined
  ? {
      trigger: TriggerFunction<TTriggerInput>;
    }
  : TMessageInput extends ZodSchema
  ? (messageInput: z.infer<Exclude<TMessageInput, undefined>>) => {
      trigger: TriggerFunction<TTriggerInput>;
    }
  : never;

const message = <TMessageInput extends ZodSchema | undefined = undefined>(messageInputSchema?: TMessageInput) => ({
  input: <TTriggerInput extends ZodSchema>(triggerInputSchema: TTriggerInput): PusherMessageReturn<TMessageInput, TTriggerInput> => {
    const trigger = (input: TTriggerInput extends undefined ? void : z.infer<Exclude<TTriggerInput, undefined>>) => {
      return;
    };

    if (messageInputSchema === undefined) {
      return {
        trigger,
      } as PusherMessageReturn<TMessageInput, TTriggerInput>;
    }

    return ((messageInput: z.infer<Exclude<TMessageInput, undefined>>) => ({
      trigger,
    })) as PusherMessageReturn<TMessageInput, TTriggerInput>;
  },
});

const exampleChatRouter = pusherRouter(
  {
    updatedMessage: message(
      z.object({
        id: z.number(),
      }),
    ).input(z.object({ message: z.string() })),
  },
  z.object({ id: z.number() }),
);

const exampleAppRouter = pusherRouter({
  updated: message().input(z.object({ message: z.string() })),
});

const examplePrivateChatRouter = pusherRouter(
  {
    receivedMessage: message().input(z.object({ message: z.string() })),
  },
  z.object({ id: z.number() }),
);

const rootRouter = {
  chat: exampleChatRouter,
  app: exampleAppRouter,
  privateChat: examplePrivateChatRouter,
};

type RootRouter = typeof rootRouter;

type FunctionType = (...args: any) => any;
type ForwardFunctionOrValue<T> = T extends FunctionType ? ReturnType<T> : T;

type FunctionOrValue<TCurrent, TInner> = TCurrent extends FunctionType ? (...args: Parameters<TCurrent>) => TInner : TInner;

type ConstructClientRootRouter<TRootRouter extends Record<string, PusherRouterReturn<PusherMessage, PusherChannelInput>>> = {
  [channelKey in keyof TRootRouter]: FunctionOrValue<
    TRootRouter[channelKey],
    {
      [messageKey in keyof ForwardFunctionOrValue<TRootRouter[channelKey]>]: FunctionOrValue<
        ForwardFunctionOrValue<TRootRouter[channelKey]>[messageKey],
        {
          subscribe: (callback: (input: Parameters<ForwardFunctionOrValue<ForwardFunctionOrValue<TRootRouter[channelKey]>[messageKey]>["trigger"]>[0]) => Promise<void> | void) => void;
        }
      >;
    }
  >;
};

type ClientRootRouter = ConstructClientRootRouter<RootRouter>;

const pusherClient: ClientRootRouter = {} as ClientRootRouter;
