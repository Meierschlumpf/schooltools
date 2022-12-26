import { Card, Group, Text } from "@mantine/core";

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

const getTimeByNumber = (number: number) => {
  const hour = Math.floor(number / 60);
  const minute = number % 60;
  const hourString = hour <= 9 ? `0${hour}` : hour.toString();
  const minuteString = minute <= 9 ? `0${minute}` : minute.toString();
  return `${hourString}:${minuteString}`;
};

export type Lesson = {
  id: string;
  title: string | null;
  date: Date;
  start: number;
  end: number;
};
