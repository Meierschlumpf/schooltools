import {
  ActionIcon,
  Chip,
  Drawer,
  Group,
  ScrollArea,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconArrowLeft, IconDots } from "@tabler/icons";
import { useState } from "react";

interface MobileHeaderNotificationDrawerProps {
  opened: boolean;
  closeDrawer: () => void;
}

export const MobileHeaderNotificationDrawer = ({
  opened,
  closeDrawer,
}: MobileHeaderNotificationDrawerProps) => {
  const { spacing } = useMantineTheme();
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
        <ScrollArea.Autosize
          maxHeight="calc(100vh - var(--mantine-footer-height) - 96px)"
          styles={{
            viewport: {
              paddingLeft: spacing.md,
              paddingRight: spacing.md,
            },
          }}
        ></ScrollArea.Autosize>
      </Stack>
    </Drawer>
  );
};
