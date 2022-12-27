import { Stack, Title } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { RefObject } from "react";
import { PlanDay } from "./plan-mobile-day";
import { months } from "../../../constants/date";
import { Lesson } from "@acme/db";

interface PlanMonthProps {
  isFirst: boolean;
  lessons: Lesson[];
  monthRef: RefObject<HTMLDivElement>;
}

export const PlanMonth = ({ lessons, isFirst, monthRef }: PlanMonthProps) => {
  const { t } = useTranslation(["common"]);
  const firstLesson = lessons.at(0);

  if (!firstLesson) return null;

  const month = firstLesson.date.getMonth();
  const year = firstLesson.date.getFullYear();
  const monthLabel = `${t(`month.${months[month]}`)} ${year}`;

  const reducedLessons = lessons
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
    .sort((a, b) => a.day - b.day);

  return (
    <Stack spacing={4}>
      {!isFirst ? (
        <Title order={4} mt="sm" align="start" ref={monthRef}>
          {monthLabel}
        </Title>
      ) : null}
      <Stack>
        {reducedLessons.map(({ day, lessons }) => (
          <PlanDay key={day} lessons={lessons} />
        ))}
      </Stack>
    </Stack>
  );
};
