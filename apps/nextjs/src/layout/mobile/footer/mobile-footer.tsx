import { Footer, Group } from "@mantine/core";
import {
  IconCalendarEvent,
  IconClipboardCheck,
  IconHome,
  IconListCheck,
} from "@tabler/icons";
import { MobileFooterTabLink } from "./tab/mobile-footer-tab-link";
import { MobileFooterTabMoreButton } from "./tab/mobile-footer-tab-more-button";
import {
  MobileFooterMoreTabs,
  moreFooterTabOptions,
} from "./tab/more-drawer/mobile-footer-more-drawer";

interface MobileFooterProps {
  activeTab: MobileFooterTabs | MobileFooterMoreTabs;
}

export const MobileFooter = ({ activeTab }: MobileFooterProps) => {
  console.log(activeTab);
  const isDefaultTabActive = initialFooterTabs.some((x) => x.id === activeTab);
  const displayedTabs = isDefaultTabActive
    ? initialFooterTabs
    : initialFooterTabs.slice(0, 3);

  const otherActiveTab = moreFooterTabOptions.find((x) => x.id === activeTab);

  return (
    <Footer height={72}>
      <Group
        style={{ justifyContent: "space-around" }}
        h="100%"
        w="100%"
        noWrap
        spacing={0}
      >
        {displayedTabs.map((tab) => (
          <MobileFooterTabLink {...tab} active={tab.id === activeTab} />
        ))}
        {otherActiveTab ? (
          <MobileFooterTabLink {...otherActiveTab} active />
        ) : null}
        <MobileFooterTabMoreButton activeTab={activeTab} />
      </Group>
    </Footer>
  );
};

export const initialFooterTabs = [
  { id: "home", label: "Home", icon: IconHome, href: "/", color: "teal" },
  {
    id: "plan",
    label: "Plan",
    icon: IconCalendarEvent,
    href: "/plans",
    color: "teal",
  },
  {
    id: "task",
    label: "Aufgaben",
    icon: IconListCheck,
    href: "/tasks",
    color: "teal",
  },
  {
    id: "assessment",
    label: "Bewertungen",
    icon: IconClipboardCheck,
    href: "/assessments",
    color: "teal",
  },
] as const;

export type MobileFooterTabs = typeof initialFooterTabs[number]["id"];
