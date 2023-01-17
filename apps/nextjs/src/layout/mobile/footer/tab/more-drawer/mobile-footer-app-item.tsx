import { Indicator, UnstyledButton, Stack, ThemeIcon, MantineColor, Text } from "@mantine/core";
import { Icon123, TablerIcon } from "@tabler/icons";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { MobileFooterTabs } from "../../mobile-footer";
import { MobileFooterMoreTabs } from "./mobile-footer-more-drawer";

interface AppItemProps {
  option: AppOption;
}

export const MobileFooterAppItem = ({ option }: AppItemProps) => {
  const { t } = useTranslation("layout/footer/common");
  return (
    <Indicator label={<Text size={9}>{t("tab.more.drawer.newIndicator")}</Text>} showZero={false} size={18} color="indigo" withBorder inline disabled={!option.isNew}>
      <UnstyledButton key={option.id} component={Link} href={option.href}>
        <Stack align="center" spacing={4}>
          <ThemeIcon size="xl" color={option.color}>
            <Icon123 />
          </ThemeIcon>
          <Text size={11} maw={72} lineClamp={1} style={{ overflowWrap: "break-word" }}>
            {t(`tab.${option.id}.label`)}
          </Text>
        </Stack>
      </UnstyledButton>
    </Indicator>
  );
};

export interface AppOption {
  readonly id: MobileFooterMoreTabs | MobileFooterTabs;
  readonly icon: TablerIcon;
  readonly href: string;
  readonly color: MantineColor;
  readonly isNew?: boolean;
}
