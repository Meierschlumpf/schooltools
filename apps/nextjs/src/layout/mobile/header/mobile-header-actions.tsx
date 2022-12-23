import { ActionIcon, Avatar, Group, Indicator } from "@mantine/core";
import { IconBell } from "@tabler/icons";

export const MobileHeaderActions = () => {
  return (
    <Group h="100%" spacing={4}>
      <ActionIcon size="lg" radius="xl">
        <Indicator offset={5} size={10} withBorder position="top-start">
          <IconBell stroke={1.5} size={24} />
        </Indicator>
      </ActionIcon>
      <ActionIcon size="lg" radius="xl">
        <Avatar
          size={24}
          radius={24}
          src="https://avatars.githubusercontent.com/u/63781622?s=40&v=4"
        />
      </ActionIcon>
    </Group>
  );
};
