import { ActionIcon, Divider, Drawer, Group, ScrollArea, Stack, Text, Title, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowLeft, IconBell, IconCode, IconInfoCircle, IconKey, IconLanguage, IconLogout, IconPalette, IconPencil, IconQuestionCircle } from "@tabler/icons";
import { signOut } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { CurrentAvatar } from "../../../../../components/common/avatar-current";
import { languages } from "../../../../../constants/languages";
import { trpc } from "../../../../../utils/trpc";
import { LanguageDrawer } from "./app-settings/language-drawer";
import { UserDrawerButton } from "./user-drawer-button";

interface MobileHeaderUserDrawerProps {
  opened: boolean;
  closeDrawer: () => void;
}

export const MobileHeaderUserDrawer = ({ opened, closeDrawer }: MobileHeaderUserDrawerProps) => {
  const { t, i18n } = useTranslation("layout/header/profile/common");
  const [languageDrawerOpened, languageDrawer] = useDisclosure(false);
  const { data: user } = trpc.user.me.useQuery();
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();
  console.log(colorScheme);

  return (
    <Drawer
      opened={opened}
      onClose={closeDrawer}
      position="bottom"
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
      size="100%"
      padding="xs"
    >
      <ScrollArea.Autosize maxHeight="calc(100vh - var(--mantine-footer-height) - 64px)">
        <Stack>
          <Group>
            <CurrentAvatar size={64} radius={32} />
            <Stack spacing={0}>
              <Text weight={500}>{user?.name}</Text>
              <Text color="dimmed" size="xs">
                {user?.email}
              </Text>
              <Text weight={300} size="xs" mt={6}>
                {t("status.available")}
              </Text>
            </Stack>
          </Group>
          <Divider />
          <Text weight={500} size="sm">
            {t("section.app-settings.heading")}
          </Text>
          <Stack spacing={0}>
            <UserDrawerButton
              icon={IconLanguage}
              label={t("section.app-settings.items.language.label")}
              activeValue={languages[i18n.language as keyof typeof languages].label}
              onClick={languageDrawer.open}
            />
            <LanguageDrawer opened={languageDrawerOpened} closeDrawer={languageDrawer.close} />
            <UserDrawerButton
              icon={IconPalette}
              label={t("section.app-settings.items.appearance.label")}
              activeValue={t(`section.app-settings.items.appearance.activeValue.${colorScheme}`)}
              onClick={() => toggleColorScheme()}
            />
            <UserDrawerButton icon={IconPencil} label={t("section.app-settings.items.profile.label")} />
            <UserDrawerButton icon={IconKey} label={t("section.app-settings.items.privacy.label")} />
            <UserDrawerButton icon={IconBell} label={t("section.app-settings.items.notification.label")} />
          </Stack>
          <Divider />
          <Text weight={500} size="sm">
            {t("section.account.heading")}
          </Text>
          <Stack spacing={0}>
            <UserDrawerButton showChevron={false} onClick={signOut} icon={IconLogout} label={t("section.account.items.logout.label")} />
          </Stack>
          <Divider />
          <Text weight={500} size="sm">
            {t("section.help.heading")}
          </Text>
          <Stack spacing={0}>
            <UserDrawerButton icon={IconQuestionCircle} label={t("section.help.items.help.label")} />
            <UserDrawerButton icon={IconInfoCircle} label={t("section.help.items.news.label")} activeValue="Alpha-0.1 (2022-12)" />
          </Stack>
          <Divider />
          <Text weight={500} size="sm">
            {t("section.developer.heading")}
          </Text>
          <Stack spacing={0}>
            <UserDrawerButton icon={IconCode} label={t("section.developer.items.settings.label")} />
          </Stack>
        </Stack>
      </ScrollArea.Autosize>
    </Drawer>
  );
};
