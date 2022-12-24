import { UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDots } from "@tabler/icons";
import { MobileFooterTabs } from "../mobile-footer";
import { MobileFooterTabBase } from "./mobile-footer-tab-base";
import {
  MobileFooterMoreDrawer,
  MobileFooterMoreTabs,
} from "./more-drawer/mobile-footer-more-drawer";

interface MobileFooterTabMoreButtonProps {
  activeTab: MobileFooterTabs | MobileFooterMoreTabs;
  disclosure: ReturnType<typeof useDisclosure>;
}

export const MobileFooterTabMoreButton = ({
  activeTab,
  disclosure,
}: MobileFooterTabMoreButtonProps) => {
  const [drawerOpened, drawer] = disclosure;

  return (
    <>
      <UnstyledButton onClick={drawer.toggle}>
        <MobileFooterTabBase id="more" icon={IconDots} active={drawerOpened} />
      </UnstyledButton>
      <MobileFooterMoreDrawer
        opened={drawerOpened}
        closeDrawer={drawer.close}
        activeTab={activeTab}
      />
    </>
  );
};
