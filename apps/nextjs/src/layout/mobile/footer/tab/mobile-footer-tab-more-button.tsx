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
}

export const MobileFooterTabMoreButton = ({
  activeTab,
}: MobileFooterTabMoreButtonProps) => {
  const [drawerOpened, drawer] = useDisclosure(false);

  return (
    <>
      <UnstyledButton onClick={drawer.open}>
        <MobileFooterTabBase label="Mehr" icon={IconDots} />
      </UnstyledButton>
      <MobileFooterMoreDrawer
        opened={drawerOpened}
        closeDrawer={drawer.close}
        activeTab={activeTab}
      />
    </>
  );
};
