import { Group, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { isToday } from "../../../helpers/date/isToday";
import { Lesson, PlanLesson } from "./lesson";

interface PlanDayProps {
  lessons: Lesson[];
}

export const PlanDay = ({ lessons }: PlanDayProps) => {
  const { colors } = useMantineTheme();
  const firstLesson = lessons.at(0)!;

  return (
    <Group align="start">
      <Stack spacing={0} align="center">
        <Text color="dimmed" size="xs">
          {day[firstLesson!.date.getDay()]}
        </Text>
        <Title
          color={isToday(firstLesson.date) ? colors.indigo[3] : undefined}
          order={4}
        >
          {firstLesson!.date.getDate()}
        </Title>
      </Stack>
      <Stack style={{ flex: 1 }} spacing="xs">
        {lessons
          .sort((a, b) => a.start - b.start)
          .map((l) => (
            <PlanLesson key={l.id} lesson={l} />
          ))}
      </Stack>
    </Group>
  );
};

const day = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
