import { useMantineTheme, UnstyledButton, Group, Text, ThemeIcon } from "@mantine/core";
import { TablerIcon, IconChevronRight } from "@tabler/icons";

interface UserDrawerButtonProps {
  icon: TablerIcon;
  label: string;
  onClick?: () => void;
  activeValue?: string;
  showChevron?: boolean;
}

export const UserDrawerButton = ({ icon: Icon, label, onClick, activeValue, showChevron = true }: UserDrawerButtonProps) => {
  const { colors } = useMantineTheme();

  return (
    <UnstyledButton py="xs" onClick={onClick}>
      <Group>
        <ThemeIcon color="transparent">
          <Icon stroke={1.5} color={colors.gray[6]} />
        </ThemeIcon>
        <Group style={{ flex: 1 }} position="apart">
          <Text>{label}</Text>
          <Group>
            <Text color="dimmed" size="sm">
              {activeValue}
            </Text>
            {showChevron ? <IconChevronRight size={20} /> : null}
          </Group>
        </Group>
      </Group>
    </UnstyledButton>
  );
};
