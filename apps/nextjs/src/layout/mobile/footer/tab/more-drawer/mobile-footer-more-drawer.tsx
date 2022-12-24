import { Drawer, ScrollArea, Title, useMantineTheme } from "@mantine/core";
import { Icon123 } from "@tabler/icons";
import { initialFooterTabs, MobileFooterTabs } from "../../mobile-footer";
import { MobileFooterAppItem } from "./mobile-footer-app-item";

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
  const lastTabItem = initialFooterTabs.at(-1);

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
          {moreFooterTabOptions.some((x) => x.id === activeTab) &&
          lastTabItem ? (
            <MobileFooterAppItem option={lastTabItem} />
          ) : null}
          {moreFooterTabOptions
            .filter((o) => o.id !== activeTab)
            .map((option) => (
              <MobileFooterAppItem option={option} key={option.id} />
            ))}
        </div>
      </ScrollArea.Autosize>
    </Drawer>
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
