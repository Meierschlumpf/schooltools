import { PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";
import { mantineTheme } from "../../styles/mantine-theme";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { SpotlightProvider } from "@mantine/spotlight";
import { mantineModals } from "./modals";

interface MantineProvidersProps extends PropsWithChildren {}

export const MantineProviders = ({ children }: MantineProvidersProps) => {
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
          <SpotlightProvider actions={[]}>{children}</SpotlightProvider>
        </ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
};
