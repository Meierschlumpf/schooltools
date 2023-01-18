import { AppShell } from "@mantine/core";
import { PropsWithChildren } from "react";
import { MobileFooter, MobileFooterTabs } from "./footer/mobile-footer";
import { MobileFooterMoreTabs } from "./footer/tab/more-drawer/mobile-footer-more-drawer";
import { MobileHeader } from "./header/mobile-header";

interface MobileLayoutProps extends PropsWithChildren {
  activeTab: MobileFooterTabs | MobileFooterMoreTabs;
}

export const MobileLayout = ({ children, activeTab }: MobileLayoutProps) => {
  return (
    <AppShell header={<MobileHeader />} footer={<MobileFooter activeTab={activeTab} />}>
      {children}
    </AppShell>
  );
};
