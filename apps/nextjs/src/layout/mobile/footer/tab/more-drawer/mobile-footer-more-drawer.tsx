import {
  Drawer,
  Indicator,
  MantineColor,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { Icon123, TablerIcon } from "@tabler/icons";
import Link from "next/link";
import { initialFooterTabs, MobileFooterTabs } from "../../mobile-footer";

interface MobileFooterMoreDrawerProps {
  opened: boolean;
  closeDrawer: () => void;
  activeTab: MobileFooterTabs | MobileFooterMoreTabs;
}

export const MobileFooterMoreDrawer = ({
  opened,
  closeDrawer,
  activeTab,
}: MobileFooterMoreDrawerProps) => {
  const { spacing } = useMantineTheme();

  return (
    <Drawer
      withCloseButton={false}
      onClose={closeDrawer}
      opened={opened}
      position="bottom"
      size="calc(100% - var(--mantine-header-height) - 128px)"
      padding="sm"
      title={<Title order={5}>Weitere Funktionen</Title>}
      styles={{
        header: {
          paddingLeft: spacing.md,
          paddingRight: spacing.md,
          marginBottom: spacing.xs,
        },
      }}
      zIndex={250}
    >
      <ScrollArea.Autosize
        maxHeight="calc(100vh - var(--mantine-header-height) - var(--mantine-footer-height) - 192px)"
        styles={{
          viewport: {
            paddingLeft: spacing.md,
            paddingRight: spacing.md,
          },
        }}
      >
        <div
          style={{
            marginTop: spacing.md,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 38px)",
            gap: "32px",
            justifyContent: "space-between",
          }}
        >
          {moreFooterTabOptions.some((x) => x.id === activeTab) ? (
            <AppItem option={initialFooterTabs.at(-1)!} />
          ) : null}
          {moreFooterTabOptions
            .filter((o) => o.id !== activeTab)
            .map((option) => (
              <AppItem option={option} key={option.id} />
            ))}
        </div>
      </ScrollArea.Autosize>
    </Drawer>
  );
};

interface AppItemProps {
  option: AppOption;
}

const AppItem = ({ option }: AppItemProps) => {
  return (
    <Indicator
      label={<Text size={9}>Neu</Text>}
      showZero={false}
      size={18}
      color="indigo"
      withBorder
      inline
      disabled={!option.isNew}
    >
      <UnstyledButton key={option.id} component={Link} href={option.href}>
        <Stack align="center" spacing={4}>
          <ThemeIcon size="xl" color={option.color}>
            <Icon123 />
          </ThemeIcon>
          <Text
            size={11}
            maw={72}
            lineClamp={1}
            style={{ overflowWrap: "break-word" }}
          >
            {option.label}
          </Text>
        </Stack>
      </UnstyledButton>
    </Indicator>
  );
};

export const moreFooterTabOptions = [
  {
    id: "example",
    label: "Example",
    icon: Icon123,
    href: "/examples",
    color: "teal",
  },
] as const;

export type MobileFooterMoreTabs = typeof moreFooterTabOptions[number]["id"];

export interface AppOption {
  readonly id: MobileFooterMoreTabs | MobileFooterTabs;
  readonly label: string;
  readonly icon: TablerIcon;
  readonly href: string;
  readonly color: MantineColor;
  readonly isNew?: boolean;
}
