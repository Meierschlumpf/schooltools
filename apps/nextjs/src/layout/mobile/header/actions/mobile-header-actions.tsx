import { ActionIcon, Avatar, Group } from "@mantine/core";
import { MobileHeaderNotificationButton } from "./mobile-header-notification-button";

export const MobileHeaderActions = () => {
  return (
    <Group h="100%" spacing={4}>
      <MobileHeaderNotificationButton />
      <ActionIcon size="lg" radius="xl">
        <Avatar
          size={24}
          radius={12}
          src="https://avatars.githubusercontent.com/u/63781622?s=40&v=4"
        />
      </ActionIcon>
    </Group>
  );
};
