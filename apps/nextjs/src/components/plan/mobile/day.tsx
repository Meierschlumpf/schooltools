import { Group, Stack, Text, Title } from "@mantine/core";
import { Lesson, PlanLesson } from "./lesson";

interface PlanDayProps {
  lessons: Lesson[];
}

export const PlanDay = ({ lessons }: PlanDayProps) => {
  return (
    <Group align="start">
      <Stack spacing={0} align="center">
        <Text color="dimmed" size="xs">
          {day[lessons.at(0)!.date.getDay()]}
        </Text>
        <Title order={4}>{lessons.at(0)!.date.getDate()}</Title>
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
