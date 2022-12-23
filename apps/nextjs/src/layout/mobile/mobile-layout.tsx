import {
  ActionIcon,
  AppShell,
  Avatar,
  Badge,
  Card,
  Container,
  Footer,
  Group,
  Header,
  Indicator,
  Paper,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { openSpotlight } from "@mantine/spotlight";
import {
  IconAward,
  IconBell,
  IconCalendarEvent,
  IconClipboardCheck,
  IconDots,
  IconHome,
  IconListCheck,
  IconSearch,
  TablerIcon,
} from "@tabler/icons";
import { PropsWithChildren } from "react";

interface MobileLayoutProps extends PropsWithChildren {}

export const MobileLayout = ({ children }: MobileLayoutProps) => {
  const { colors, fn } = useMantineTheme();

  return (
    <AppShell
      header={
        <Header height={88}>
          <Container h="100%">
            <Stack spacing={8} mt={2}>
              <Group position="right" h="100%" spacing={4}>
                <ActionIcon size="lg" radius="xl">
                  <Indicator offset={2} size={8}>
                    <IconBell stroke={1} size={20} />
                  </Indicator>
                </ActionIcon>
                <ActionIcon size="lg" radius="xl">
                  <Avatar
                    size={24}
                    radius={24}
                    src="https://avatars.githubusercontent.com/u/63781622?s=40&v=4"
                  />
                </ActionIcon>
              </Group>
              <UnstyledButton onClick={() => openSpotlight()}>
                <Card withBorder h="34px" py={0} px="xs">
                  <Group h="100%" spacing="sm">
                    <IconSearch size={16} />
                    <Text size="sm" color={fn.rgba(colors.gray[6], 0.6)}>
                      Suchen
                    </Text>
                  </Group>
                </Card>
              </UnstyledButton>
            </Stack>
          </Container>
        </Header>
      }
      footer={
        <Footer height={72}>
          <Group
            style={{ justifyContent: "space-around" }}
            h="100%"
            w="100%"
            noWrap
            spacing={0}
          >
            <TabItem label="HOME" icon={IconHome} active />
            <TabItem label="PLAN" icon={IconCalendarEvent} />
            <TabItem label="BEWERTUNG" icon={IconClipboardCheck} />
            <TabItem label="AUFGABEN" icon={IconListCheck} />
            <TabItem label="MEHR" icon={IconDots} />
          </Group>
        </Footer>
      }
    >
      {children}
    </AppShell>
  );
};

interface TabItemProps {
  label: string;
  icon: TablerIcon;
  active?: boolean;
}

const TabItem = ({ label, icon: Icon, active }: TabItemProps) => {
  const { colors, fn } = useMantineTheme();

  return (
    <UnstyledButton>
      <Stack align="center" py="md" spacing={2}>
        <ThemeIcon
          color="transparent"
          w="40px"
          radius="xl"
          style={{
            backgroundColor: active ? fn.rgba(colors.gray[1], 0.1) : undefined,
          }}
        >
          <Icon size={20} />
        </ThemeIcon>
        <Text size={10}>{label}</Text>
      </Stack>
    </UnstyledButton>
  );
};
