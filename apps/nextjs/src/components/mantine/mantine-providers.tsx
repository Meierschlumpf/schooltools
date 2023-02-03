import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { SpotlightProvider } from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons";
import { setCookie } from "cookies-next";
import { useTranslation } from "next-i18next";
import { PropsWithChildren, useState } from "react";
import { THEME_COOKIE_KEY } from "../../constants/cookies";
import { mantineTheme } from "../../styles/mantine-theme";
import { mantineModals } from "./modals";

interface MantineProvidersProps extends PropsWithChildren {
  colorScheme: ColorScheme;
}

export const MantineProviders = ({ children, colorScheme: activeScheme }: MantineProvidersProps) => {
  const { t } = useTranslation(["layout/header/search"]);
  const [colorScheme, setColorScheme] = useState<ColorScheme>(activeScheme);
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextValue = value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextValue);
    setCookie(THEME_COOKIE_KEY, nextValue);
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          ...mantineTheme,
          colorScheme: colorScheme,
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
    </ColorSchemeProvider>
  );
};
