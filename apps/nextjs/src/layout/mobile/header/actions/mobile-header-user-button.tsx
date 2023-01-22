import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CurrentAvatar } from "../../../../components/common/avatar-current";
import { MobileHeaderUserDrawer } from "./user-drawer/mobile-header-user-drawer";

export const MoibleHeaderUserButton = () => {
  const [openedDrawer, drawer] = useDisclosure(false);

  return (
    <>
      <ActionIcon size="lg" radius="xl" onClick={drawer.open}>
        <CurrentAvatar size={24} radius={12} />
      </ActionIcon>
      <MobileHeaderUserDrawer opened={openedDrawer} closeDrawer={drawer.close} />
    </>
  );
};
