// src/pages/_app.tsx
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { MantineProviders } from "../components/mantine/mantine-providers";
import { trpc } from "../utils/trpc";
import nextI18nConfig from "../../next-i18next.config.js";
import { appWithTranslation } from "next-i18next";

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{ session: Session | null }> & {
  Component: NextPageWithLayout;
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <MantineProviders>
        {getLayout(<Component {...pageProps} />)}
      </MantineProviders>
    </SessionProvider>
  );
};

export default appWithTranslation<any>(
  trpc.withTRPC(MyApp),
  nextI18nConfig as any,
);
