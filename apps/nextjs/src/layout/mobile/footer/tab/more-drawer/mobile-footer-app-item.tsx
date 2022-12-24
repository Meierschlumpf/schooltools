import {
  Indicator,
  UnstyledButton,
  Stack,
  ThemeIcon,
  MantineColor,
  Text,
} from "@mantine/core";
import { Icon123, TablerIcon } from "@tabler/icons";
import Link from "next/link";
import { MobileFooterTabs } from "../../mobile-footer";
import { MobileFooterMoreTabs } from "./mobile-footer-more-drawer";

interface AppItemProps {
  option: AppOption;
}

export const MobileFooterAppItem = ({ option }: AppItemProps) => {
  return (
    <Indicator
      label={<Text size={9}>Neu</Text>}
      showZero={false}
      size={18}
      color="indigo"
      withBorder
      inline
      disabled={!option.isNew}
    >
      <UnstyledButton key={option.id} component={Link} href={option.href}>
        <Stack align="center" spacing={4}>
          <ThemeIcon size="xl" color={option.color}>
            <Icon123 />
          </ThemeIcon>
          <Text
            size={11}
            maw={72}
            lineClamp={1}
            style={{ overflowWrap: "break-word" }}
          >
            {option.label}
          </Text>
        </Stack>
      </UnstyledButton>
    </Indicator>
  );
};

export interface AppOption {
  readonly id: MobileFooterMoreTabs | MobileFooterTabs;
  readonly label: string;
  readonly icon: TablerIcon;
  readonly href: string;
  readonly color: MantineColor;
  readonly isNew?: boolean;
}
