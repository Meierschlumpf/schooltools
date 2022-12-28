import { ActionIcon, Avatar } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MobileHeaderUserDrawer } from "./user-drawer/mobile-header-user-drawer";

export const MoibleHeaderUserButton = () => {
  const [openedDrawer, drawer] = useDisclosure(false);

  return (
    <>
      <ActionIcon size="lg" radius="xl" onClick={drawer.open}>
        <Avatar
          size={24}
          radius={12}
          src="https://avatars.githubusercontent.com/u/63781622?s=40&v=4"
        />
      </ActionIcon>
      <MobileHeaderUserDrawer
        opened={openedDrawer}
        closeDrawer={drawer.close}
      />
    </>
  );
};
