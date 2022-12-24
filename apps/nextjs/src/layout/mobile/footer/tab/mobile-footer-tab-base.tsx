import { useMantineTheme, Stack, Text, ThemeIcon } from "@mantine/core";
import { TablerIcon } from "@tabler/icons";
import { useTranslation } from "next-i18next";

export interface MobileFooterTabBaseProps {
  id: string;
  icon: TablerIcon;
  active?: boolean;
}

export const MobileFooterTabBase = ({
  id,
  icon: Icon,
  active,
}: MobileFooterTabBaseProps) => {
  const { t } = useTranslation("layout/footer/common");
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
      <Text size={10}>{t(`tab.${id}.label`)}</Text>
    </Stack>
  );
};
