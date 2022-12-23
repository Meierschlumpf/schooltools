import { ActionIcon, Avatar, Group } from "@mantine/core";
import { MobileHeaderNotificationButton } from "./mobile-header-notification-button";
import { MoibleHeaderUserButton } from "./mobile-header-user-button";

export const MobileHeaderActions = () => {
  return (
    <Group h="100%" spacing={4}>
      <MobileHeaderNotificationButton />
      <MoibleHeaderUserButton />
    </Group>
  );
};
