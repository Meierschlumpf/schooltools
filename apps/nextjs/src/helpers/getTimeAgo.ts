import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

export const getTimeAgo = (date: Date) => {
  const now = new Date().getTime();
  let difference = now - date.getTime();
  // convert to seconds
  difference /= 1000;
  if (difference < 30) return "jetzt gerade";
  if (difference < 60) return `vor ${Math.floor(difference)} Sekunden`;
  // convert to minutes
  difference /= 60;
  if (difference < 60) return `vor ${Math.floor(difference)} Minuten`;
  // convert to hours
  difference /= 60;
  if (difference < 24) return `vor ${Math.floor(difference)} Stunden`;
  // convert to days
  difference /= 24;
  if (difference < 30) return `vor ${Math.floor(difference)} Tagen`;

  return dayjs(date).format("DD. MMM YYYY");
};

export const getTimeAgoWithUpdates = (date: Date) => {
  const ref = useRef<NodeJS.Timeout>();
  const [difference, setDifference] = useState<{
    version: number;
    value: string;
  }>({ version: 0, value: getTimeAgo(date) });

  useEffect(() => {
    const timeUntilNextUpdate = getTimeUntilNextUpdate(date);
    ref.current = setTimeout(() => {
      setDifference((old) => ({
        version: old.version + 1,
        value: getTimeAgo(date),
      }));
    }, timeUntilNextUpdate);
    return () => ref.current && clearInterval(ref.current);
  }, [difference]);

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
