import { createContext, MutableRefObject, useContext } from "react";

interface NextScheduleContextProps {
  nextScheduleDate: Date;
  dayRef: MutableRefObject<HTMLElement>;
}

export const NextScheduleContext =
  createContext<NextScheduleContextProps | null>(null);

export const useNextScheduleContext = () => useContext(NextScheduleContext);
