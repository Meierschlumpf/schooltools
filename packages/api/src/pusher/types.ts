import { z } from "zod";
import { pusherDefinition } from "./definition";

type PusherChannels = typeof pusherDefinition;
export type PusherChannel = keyof PusherChannels;
export type PusherEventMiddleware<TChannel extends PusherChannel = PusherChannel> = keyof PusherChannels[TChannel];
export type PusherEvent<TChannel extends PusherChannel = PusherChannel> = PusherEventMiddleware<TChannel> extends string ? PusherEventMiddleware<TChannel> : never;
type ZodType<TChannel extends PusherChannel = PusherChannel, TEvent extends PusherEvent<TChannel> = PusherEvent<TChannel>> = PusherChannels[TChannel][TEvent];
export type PusherEventData<TChannel extends PusherChannel, TEvent extends PusherEvent<TChannel>> = ZodType<TChannel, TEvent> extends z.ZodType<infer T, any> ? T : never;
