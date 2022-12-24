import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useEffect, useRef, useState } from "react";

const getTimeAgo = (date: Date): [string] | [string, number] | string => {
  const now = new Date().getTime();
  let difference = now - date.getTime();
  // convert to seconds
  difference /= 1000;
  if (difference < 30) return ["justNow"];
  if (difference < 60) return ["second", Math.floor(difference)];
  // convert to minutes
  difference /= 60;
  if (difference < 60) return ["minute", Math.floor(difference)];
  // convert to hours
  difference /= 60;
  if (difference < 24) return ["hour", Math.floor(difference)];
  // convert to days
  difference /= 24;
  if (difference < 30) return ["day", Math.floor(difference)];

  return dayjs(date).format("DD. MMM YYYY");
};

export const useTimeAgo = (date: Date) => {};

export const useTimeAgoWithUpdates = (date: Date) => {
  const ref = useRef<NodeJS.Timeout>();
  const { t } = useTranslation("common");
  const result = getTimeAgo(date);
  const [difference, setDifference] = useState<{
    version: number;
    value: string;
  }>({
    version: 0,
    value:
      typeof result === "string"
        ? result
        : t(`timeAgo.${result[0]}`, { count: result[1] }),
  });

  useEffect(() => {
    const timeUntilNextUpdate = getTimeUntilNextUpdate(date);
    ref.current = setTimeout(() => {
      const result = getTimeAgo(date);
      setDifference((old) => ({
        version: old.version + 1,
        value:
          typeof result === "string"
            ? result
            : t(`timeAgo.${result[0]}`, { count: result[1] }),
      }));
    }, timeUntilNextUpdate);
    return () => ref.current && clearInterval(ref.current);
  }, [difference, date]);

  return difference.value;
};

const getTimeUntilNextUpdate = (date: Date) => {
  const now = new Date().getTime();
  let difference = now - date.getTime();
  // convert to seconds
  let count = 0;
  count += 1000 - (difference % 1000);
  difference /= 1000;
  if (difference < 60) return count;
  // convert to minutes
  count += (60 - (difference % 60)) * 1000;
  difference /= 60;
  if (difference < 60) return count;
  // convert to hours
  count += (60 - (difference % 60)) * 1000 * 60;
  difference /= 60;
  if (difference < 24) return count;
  // convert to days
  count += (24 - (difference % 24)) * 1000 * 60 * 60;
  difference /= 24;
  if (difference < 30) return count;

  return Infinity;
};
