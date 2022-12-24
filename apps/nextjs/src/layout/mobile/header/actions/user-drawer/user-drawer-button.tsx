import {
  useMantineTheme,
  UnstyledButton,
  Group,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { TablerIcon, IconChevronRight } from "@tabler/icons";

interface UserDrawerButtonProps {
  icon: TablerIcon;
  label: string;
  activeValue?: string;
}

export const UserDrawerButton = ({
  icon: Icon,
  label,
  activeValue,
}: UserDrawerButtonProps) => {
  const { colors } = useMantineTheme();

  return (
    <UnstyledButton py="xs">
      <Group>
        <ThemeIcon color="transparent">
          <Icon stroke={1.5} color={colors.gray[6]} />
        </ThemeIcon>
        <Group style={{ flex: 1 }} position="apart">
          <Text color="white">{label}</Text>
          <Group>
            <Text color="dimmed" size="sm">
              {activeValue}
            </Text>
            <IconChevronRight size={20} />
          </Group>
        </Group>
      </Group>
    </UnstyledButton>
  );
};
