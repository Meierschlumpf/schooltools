import {
  Avatar,
  Card,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useTimeAgoWithUpdates } from "../../../helpers/getTimeAgo";

interface NotificationItemProps {
  notification: {
    id: string;
    sender: {
      id: string;
      username: string;
      profileSrc: string;
    };
    createdAt: Date;
    content: string;
    isRead: boolean;
  };
}

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  const { colors } = useMantineTheme();
  return (
    <Card
      shadow="sm"
      style={{
        borderLeft: !notification.isRead
          ? `1px solid ${colors.indigo[6]}`
          : undefined,
      }}
    >
      <Group align="start">
        <Avatar
          size="md"
          radius="xl"
          src={notification.sender.profileSrc}
          alt={notification.sender.username}
        />
        <Stack style={{ flex: 1 }} spacing={4}>
          <Group position="apart">
            <Text weight={500} size="sm">
              {notification.sender.username}
            </Text>
            <Text size="xs" color="dimmed">
              {useTimeAgoWithUpdates(notification.createdAt)}
            </Text>
          </Group>
          <Text size="sm" color="dimmed" lineClamp={4}>
            {notification.content}
          </Text>
        </Stack>
      </Group>
    </Card>
  );
};
