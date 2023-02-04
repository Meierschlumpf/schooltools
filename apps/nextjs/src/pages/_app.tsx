// src/pages/_app.tsx
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

import { ColorScheme } from "@mantine/core";
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext, NextPage } from "next";
import { appWithTranslation } from "next-i18next";
import { ReactElement, ReactNode } from "react";
import nextI18nConfig from "../../next-i18next.config.js";
import { MantineProviders } from "../components/mantine/mantine-providers";
import { THEME_COOKIE_KEY } from "../constants/cookies";
import { trpc } from "../utils/trpc";

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{ session: Session | null; colorScheme: ColorScheme }> & {
  Component: NextPageWithLayout;
};

const App = (props: AppPropsWithLayout) => {
  const {
    Component,
    pageProps: { session, colorScheme, ...pageProps },
  } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <MantineProviders colorScheme={colorScheme}>{getLayout(<Component {...pageProps} />)}</MantineProviders>
    </SessionProvider>
  );
};

App.getInitialProps = async ({ ctx }: { ctx: GetServerSidePropsContext }) => {
  return {
    pageProps: {
      colorScheme: (getCookie(THEME_COOKIE_KEY, ctx) as string) ?? "dark",
    },
  };
};

export default appWithTranslation<any>(trpc.withTRPC(App), nextI18nConfig as any);
