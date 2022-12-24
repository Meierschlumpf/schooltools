import {
  ActionIcon,
  Avatar,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconBell,
  IconChevronRight,
  IconCode,
  IconInfoCircle,
  IconKey,
  IconLanguage,
  IconPalette,
  IconPencil,
  IconQuestionCircle,
  TablerIcon,
} from "@tabler/icons";
import { UserDrawerButton } from "./user-drawer-button";

interface MobileHeaderUserDrawerProps {
  opened: boolean;
  closeDrawer: () => void;
}

export const MobileHeaderUserDrawer = ({
  opened,
  closeDrawer,
}: MobileHeaderUserDrawerProps) => {
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
          <Title order={5}>Dein Profil</Title>
        </Group>
      }
      withCloseButton={false}
      size="100%"
      padding="xs"
    >
      <ScrollArea.Autosize maxHeight="calc(100vh - var(--mantine-footer-height) - 64px)">
        <Stack>
          <Group>
            <Avatar
              size={64}
              radius={32}
              src="https://avatars.githubusercontent.com/u/63781622?s=512&v=4"
            />
            <Stack spacing={0}>
              <Text weight={500}>Meierschlumpf</Text>
              <Text color="dimmed" size="xs">
                meierschlumpf@gmail.com
              </Text>
              <Text weight={300} size="xs" mt={6}>
                Verfügbar
              </Text>
            </Stack>
          </Group>
          <Divider />
          <Text weight={500} size="sm">
            App Einstellungen
          </Text>
          <Stack spacing={0}>
            <UserDrawerButton
              icon={IconLanguage}
              label="Sprache"
              activeValue="Deutsch"
            />
            <UserDrawerButton
              icon={IconPalette}
              label="Erscheinungsbild"
              activeValue="Dunkel"
            />
            <UserDrawerButton icon={IconPencil} label="Nutzerprofil" />
            <UserDrawerButton
              icon={IconKey}
              label="Privatsphäre & Sicherheit"
            />
            <UserDrawerButton icon={IconBell} label="Benachrichtigungen" />
          </Stack>
          <Divider />
          <Text weight={500} size="sm">
            Hilfe & Neuigkeiten
          </Text>
          <Stack spacing={0}>
            <UserDrawerButton icon={IconQuestionCircle} label="Hilfe" />
            <UserDrawerButton
              icon={IconInfoCircle}
              label="Neuigkeiten"
              activeValue="Alpha-0.1 (2022-12)"
            />
          </Stack>
          <Divider />
          <Text weight={500} size="sm">
            Entwickler
          </Text>
          <Stack spacing={0}>
            <UserDrawerButton icon={IconCode} label="Entwicklereinstellungen" />
          </Stack>
        </Stack>
      </ScrollArea.Autosize>
    </Drawer>
  );
};
