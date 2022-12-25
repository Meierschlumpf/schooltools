import {
  ActionIcon,
  Drawer,
  Group,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { IconArrowLeft, IconCheck } from "@tabler/icons";
import { setCookie } from "cookies-next";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { LOCALE_COOKIE_KEY } from "../../../../../../constants/cookies";
import { languages } from "../../../../../../constants/languages";

interface LanguageDrawerProps {
  opened: boolean;
  closeDrawer: () => void;
}

export const LanguageDrawer = ({
  opened,
  closeDrawer,
}: LanguageDrawerProps) => {
  const { t, i18n } = useTranslation(
    "layout/header/profile/app-settings/language",
  );
  const { colors } = useMantineTheme();
  const onLanguageSelection = (value: string) => {
    i18n.changeLanguage(value);
    setCookie(LOCALE_COOKIE_KEY, value);
  };

  const data = Object.entries(languages).map(([k, v]) => ({
    value: k,
    ...v,
    active: k === i18n.language,
  }));

  return (
    <Drawer
      opened={opened}
      onClose={closeDrawer}
      position="right"
      styles={{
        title: {
          width: "100%",
          margin: 0,
        },
      }}
      title={
        <Group spacing="sm">
          <ActionIcon radius="xl" onClick={closeDrawer}>
            <IconArrowLeft stroke={1.5} size={24} />
          </ActionIcon>
          <Title order={5}>{t("title")}</Title>
        </Group>
      }
      withCloseButton={false}
      size="100vw"
      padding="xs"
    >
      <ScrollArea.Autosize maxHeight="calc(100vh - var(--mantine-footer-height) - 64px)">
        <Stack>
          {data.map((language) => (
            <UnstyledButton
              key={language.value}
              onClick={() => onLanguageSelection(language.value)}
            >
              <Group position="apart">
                <Group>
                  <Image
                    src={language.image}
                    alt={language.label}
                    height={15}
                    width={25}
                  />
                  <Stack spacing={0}>
                    <Text weight={500} size="sm">
                      {language.label}
                    </Text>
                    <Text color="dimmed" size="xs">
                      {t(`item.${language.value}`)}
                    </Text>
                  </Stack>
                </Group>
                {language.active ? (
                  <ThemeIcon color="transparent">
                    <IconCheck color={colors.indigo[6]} size={20} />
                  </ThemeIcon>
                ) : null}
              </Group>
            </UnstyledButton>
          ))}
        </Stack>
      </ScrollArea.Autosize>
    </Drawer>
  );
};
