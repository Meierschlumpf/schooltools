import { Lesson } from "@acme/db";
import { Card, Group, Text } from "@mantine/core";
import { getTimeByNumber } from "../../../helpers/date/getTimeByNumber";

interface PlanLessonProps {
  lesson: Lesson;
}

export const PlanLesson = ({ lesson }: PlanLessonProps) => {
  return (
    <Card shadow="sm" p="xs">
      <Group align="start" position="apart">
        <Text weight={500} size="sm">
          {lesson.title}
        </Text>
        <Text size="xs" color="dimmed">
          {getTimeByNumber(lesson.start)} - {getTimeByNumber(lesson.end)}
        </Text>
      </Group>
    </Card>
  );
};
