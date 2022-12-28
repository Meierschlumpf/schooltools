import { ActionIcon, Indicator } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBell } from "@tabler/icons";
import { MobileHeaderNotificationDrawer } from "./notification-drawer/mobile-header-notification-drawer";

export const MobileHeaderNotificationButton = () => {
  const [openedDrawer, drawer] = useDisclosure(false);

  return (
    <>
      <ActionIcon size="lg" radius="xl" onClick={drawer.open}>
        <Indicator offset={5} size={10} withBorder position="top-start">
          <IconBell stroke={1.5} size={24} />
        </Indicator>
      </ActionIcon>
      <MobileHeaderNotificationDrawer
        opened={openedDrawer}
        closeDrawer={drawer.close}
      />
    </>
  );
};
