import { useMantineTheme, Stack, Text, ThemeIcon } from "@mantine/core";
import { TablerIcon } from "@tabler/icons";

export interface MobileFooterTabBaseProps {
  label: string;
  icon: TablerIcon;
  active?: boolean;
}

export const MobileFooterTabBase = ({
  label,
  icon: Icon,
  active,
}: MobileFooterTabBaseProps) => {
  const { colors, fn } = useMantineTheme();

  return (
    <Stack align="center" py="md" spacing={2}>
      <ThemeIcon
        color="transparent"
        w="40px"
        radius="xl"
        style={{
          backgroundColor: active ? fn.rgba(colors.gray[1], 0.1) : undefined,
        }}
      >
        <Icon size={20} />
      </ThemeIcon>
      <Text size={10}>{label}</Text>
    </Stack>
  );
};
