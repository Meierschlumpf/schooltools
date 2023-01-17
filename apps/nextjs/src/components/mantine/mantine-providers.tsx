import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { SpotlightProvider } from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons";
import { useTranslation } from "next-i18next";
import { PropsWithChildren } from "react";
import { mantineTheme } from "../../styles/mantine-theme";
import { mantineModals } from "./modals";

interface MantineProvidersProps extends PropsWithChildren {}

export const MantineProviders = ({ children }: MantineProvidersProps) => {
  const { t } = useTranslation(["layout/header/search"]);
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        ...mantineTheme,
      }}
    >
      <NotificationsProvider>
        <ModalsProvider modals={mantineModals}>
          <SpotlightProvider actions={[]} searchIcon={<IconSearch size={18} />} searchPlaceholder={t("layout/header/search:placeholder")} topOffset={34}>
            {children}
          </SpotlightProvider>
        </ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
};
