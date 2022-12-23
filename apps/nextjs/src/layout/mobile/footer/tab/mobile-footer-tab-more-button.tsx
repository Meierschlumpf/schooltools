import { UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Icon123, IconDots } from "@tabler/icons";
import { MobileFooterTabBase } from "./mobile-footer-tab-base";

export const MobileFooterTabMoreButton = () => {
  const [drawerOpened, drawer] = useDisclosure(false);

  return (
    <>
      <UnstyledButton onClick={drawer.open}>
        <MobileFooterTabBase label="MEHR" icon={IconDots} />
      </UnstyledButton>
    </>
  );
};

export const moreFooterTabOptions = [
  { id: "example", label: "EXAMPLE", icon: Icon123, href: "/examples" },
] as const;

export type MobileFooterMoreTabs = typeof moreFooterTabOptions[number]["id"];
