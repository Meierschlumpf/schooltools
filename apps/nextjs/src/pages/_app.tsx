// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppProps, AppType } from "next/app";

import { trpc } from "../utils/trpc";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { MantineProviders } from "../components/mantine/mantine-providers";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
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

export default trpc.withTRPC(MyApp);
