import { PusherChannel, PusherEvent, PusherEventData } from "@acme/api/src/pusher";
import { useEffect } from "react";
import { useChannelSubscription } from "./use-channel-subscription";

export const useChannelEvent = <TChannel extends PusherChannel, TEvent extends PusherEvent<TChannel>, TData extends PusherEventData<TChannel, TEvent>>(
  channelName: TChannel,
  eventName: TEvent,
  callback: (data: TData) => void,
) => {
  const channel = useChannelSubscription(channelName);

  useEffect(() => {
    if (channel) {
      channel.bind(eventName, callback);
    }

    return () => {
      if (channel) {
        channel.unbind(eventName, callback);
      }
    };
  }, [channelName, eventName, channel]);
};
