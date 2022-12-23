import {
  ActionIcon,
  Chip,
  Drawer,
  Group,
  ScrollArea,
  Stack,
  Title,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import { useState } from "react";
import { NotificationItem } from "../../../../../components/common/notifications/notification-item";

interface MobileHeaderNotificationDrawerProps {
  opened: boolean;
  closeDrawer: () => void;
}

const exampleNotification = {
  id: "1",
  user: {
    id: "1",
    username: "Meierschlumpf",
    profileSrc: "https://avatars.githubusercontent.com/u/63781622?s=40&v=4",
  },
  createdAt: new Date(),
  content: "Hello world",
  isRead: true,
};

export const MobileHeaderNotificationDrawer = ({
  opened,
  closeDrawer,
}: MobileHeaderNotificationDrawerProps) => {
  const [tab, setTab] = useState("all");

  return (
    <Drawer
      opened={opened}
      onClose={closeDrawer}
      position="bottom"
      styles={{
        title: {
          width: "100%",
          margin: 0,
        },
      }}
      title={
        <Group spacing="sm">
          <ActionIcon radius="xl" onClick={closeDrawer}>
            <IconArrowLeft stroke={1.5} size={24} />
          </ActionIcon>
          <Title order={5}>Benachrichtigungen</Title>
        </Group>
      }
      withCloseButton={false}
      size="100%"
      padding="xs"
    >
      <Stack spacing="xs">
        <Group>
          <Chip.Group value={tab} onChange={(value: string) => setTab(value)}>
            <Chip size="xs" variant="filled" value="all" color="indigo">
              Alle
            </Chip>
            <Chip size="xs" variant="filled" value="tasks" color="indigo">
              Aufgaben
            </Chip>
            <Chip size="xs" variant="filled" value="assessments" color="indigo">
              Bewertungen
            </Chip>
          </Chip.Group>
        </Group>
        <ScrollArea.Autosize maxHeight="calc(100vh - var(--mantine-footer-height) - 96px)">
          <Stack spacing={4}>
            <NotificationItem notification={exampleNotification} />
            <NotificationItem notification={exampleNotification} />
            <NotificationItem notification={exampleNotification} />
            <NotificationItem notification={exampleNotification} />
            <NotificationItem notification={exampleNotification} />
            <NotificationItem notification={exampleNotification} />
            <NotificationItem notification={exampleNotification} />
          </Stack>
        </ScrollArea.Autosize>
      </Stack>
    </Drawer>
  );
};
