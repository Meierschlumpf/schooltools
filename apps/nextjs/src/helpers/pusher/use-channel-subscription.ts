import { usePusher } from "./use-pusher";
import * as PusherTypes from "pusher-js";
import { useEffect } from "react";
import { PusherChannel } from "@acme/api/src/pusher";

const channelMap = new Map<string, PusherTypes.Channel>();

export const useChannelSubscription = (channelName: PusherChannel) => {
  const pusher = usePusher();
  useEffect(() => {
    if (pusher && !channelMap.has(channelName)) {
      channelMap.set(channelName, pusher.subscribe(channelName));
    }

    return () => {
      if (pusher && channelMap.has(channelName)) {
        pusher.unsubscribe(channelName);
        channelMap.delete(channelName);
      }
    };
  }, [channelName, pusher]);

  return channelMap.get(channelName);
};
