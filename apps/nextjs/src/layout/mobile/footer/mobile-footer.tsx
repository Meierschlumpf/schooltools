import { Footer, Group } from "@mantine/core";
import {
  IconCalendarEvent,
  IconClipboardCheck,
  IconHome,
  IconListCheck,
} from "@tabler/icons";
import { MobileFooterTabLink } from "./tab/mobile-footer-tab-link";
import {
  MobileFooterMoreTabs,
  MobileFooterTabMoreButton,
  moreFooterTabOptions,
} from "./tab/mobile-footer-tab-more-button";

interface MobileFooterProps {
  activeTab: MobileFooterTabs | MobileFooterMoreTabs;
}

export const MobileFooter = ({ activeTab }: MobileFooterProps) => {
  console.log(activeTab);
  const isDefaultTabActive = initialTabs.some((x) => x.id === activeTab);
  const displayedTabs = isDefaultTabActive
    ? initialTabs
    : initialTabs.slice(0, 3);

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
        <MobileFooterTabMoreButton />
      </Group>
    </Footer>
  );
};

const initialTabs = [
  { id: "home", label: "HOME", icon: IconHome, href: "/" },
  { id: "plan", label: "PLAN", icon: IconCalendarEvent, href: "/plans" },
  { id: "task", label: "AUFGABEN", icon: IconListCheck, href: "/tasks" },
  {
    id: "assessment",
    label: "BEWERTUNGEN",
    icon: IconClipboardCheck,
    href: "/assessments",
  },
] as const;

export type MobileFooterTabs = typeof initialTabs[number]["id"];
