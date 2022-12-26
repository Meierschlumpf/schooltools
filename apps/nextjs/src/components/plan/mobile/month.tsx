import { Stack, Title } from "@mantine/core";
import { RefObject } from "react";
import { PlanDay } from "./day";
import { Lesson } from "./lesson";

interface PlanMonthProps {
  isFirst: boolean;
  lessons: Lesson[];
  monthRef: RefObject<HTMLDivElement>;
}

export const PlanMonth = ({ lessons, isFirst, monthRef }: PlanMonthProps) => {
  const month = lessons.at(0)!.date.getMonth();
  const year = lessons.at(0)!.date.getFullYear();

  return (
    <Stack spacing={4}>
      {!isFirst ? (
        <Title order={4} mt="sm" align="start" ref={monthRef}>
          {months[month]} {year}
        </Title>
      ) : null}
      <Stack>
        {lessons
          .reduce((previous: { day: number; lessons: Lesson[] }[], current) => {
            const currentDay = current.date.getDate();
            const index = previous.findIndex((x) => x.day === currentDay);
            if (index !== -1) {
              previous[index]?.lessons.push(current);
              return previous;
            }
            previous.push({ day: currentDay, lessons: [current] });
            return previous;
          }, [])
          .sort((a, b) => a.day - b.day)
          .map(({ lessons }) => (
            <PlanDay lessons={lessons} />
          ))}
      </Stack>
    </Stack>
  );
};

export const months = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];
