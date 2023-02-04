import { createStyles, Stack, Text, ThemeIcon } from "@mantine/core";
import { TablerIcon } from "@tabler/icons";
import { useTranslation } from "next-i18next";

export interface MobileFooterTabBaseProps {
  id: string;
  icon: TablerIcon;
  active?: boolean;
}

export const MobileFooterTabBase = ({ id, icon: Icon, active }: MobileFooterTabBaseProps) => {
  const { t } = useTranslation("layout/footer/common");
  const { classes } = useStyles({ active });

  return (
    <Stack align="center" py="md" spacing={2}>
      <ThemeIcon color="transparent" w="40px" radius="xl" className={classes.themeIcon}>
        <Icon size={20} />
      </ThemeIcon>
      <Text size={10}>{t(`tab.${id}.label`)}</Text>
    </Stack>
  );
};

const useStyles = createStyles(({ colorScheme, fn, colors }, { active }: { active: boolean | undefined }) => ({
  themeIcon: {
    backgroundColor: !active ? undefined : colorScheme === "dark" ? fn.rgba(colors.gray[1], 0.1) : fn.rgba(colors.dark[9], 0.1),
    color: colorScheme === "dark" ? colors.gray[0] : colors.dark[6],
  },
}));
