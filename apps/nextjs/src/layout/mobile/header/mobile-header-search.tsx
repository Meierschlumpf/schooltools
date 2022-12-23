import {
  Card,
  Group,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { openSpotlight } from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons";

export const MobileHeaderSearch = () => {
  const { colors, fn } = useMantineTheme();

  return (
    <UnstyledButton onClick={() => openSpotlight()}>
      <Card withBorder h="34px" py={0} px="xs">
        <Group h="100%" spacing="sm">
          <IconSearch size={16} />
          <Text size="sm" color={fn.rgba(colors.gray[6], 0.6)}>
            Suchen
          </Text>
        </Group>
      </Card>
    </UnstyledButton>
  );
};
