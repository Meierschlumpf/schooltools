import { Group, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { RefObject } from "react";
import { days } from "../../../constants/date";
import { useNextScheduleContext } from "../../../contexts/next-schedule-context";
import { isToday } from "../../../helpers/date/isToday";
import { RouterOutputs } from "../../../utils/trpc";
import { PlanLesson } from "./mobile-lesson";

interface PlanDayProps {
  lessons: RouterOutputs["plan"]["currentSchoolYear"];
}

export const PlanDay = ({ lessons }: PlanDayProps) => {
  const { t } = useTranslation(["pages/plans/index", "common"]);
  const { colors } = useMantineTheme();
  const dayRef = useNextScheduleContext()?.dayRef;
  const nextScheduleDate = useNextScheduleContext()?.nextScheduleDate;
  const firstLesson = lessons.at(0);

  if (!firstLesson) return null;

  const isNextScheduleDate = firstLesson.date.getTime() === nextScheduleDate?.getTime();

  const dayLabel = t(`common:weekDay.${days[firstLesson.date.getDay()]}.short`);

  return (
    <Group align="start" mt={isNextScheduleDate ? "sm" : undefined}>
      <Stack spacing={0} align="center">
        <Text color="dimmed" size="xs">
          {dayLabel}
        </Text>
        <Title color={isToday(firstLesson.date) ? colors.indigo[3] : undefined} ref={isNextScheduleDate ? (dayRef as RefObject<HTMLHeadingElement>) : undefined} order={4}>
          {firstLesson.date.getDate()}
        </Title>
      </Stack>
      <Stack style={{ flex: 1 }} spacing="xs" pos="relative">
        {isNextScheduleDate ? (
          <Text pos="absolute" top={-20} size="sm" color="indigo">
            {t("action.nextSchedule")}
          </Text>
        ) : null}
        {lessons
          .sort((a, b) => a.start - b.start)
          .map((l) => (
            <PlanLesson key={l.id} lesson={l} />
          ))}
      </Stack>
    </Group>
  );
};
