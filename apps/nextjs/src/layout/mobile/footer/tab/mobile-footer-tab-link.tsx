import { UnstyledButton } from "@mantine/core";
import Link from "next/link";
import {
  MobileFooterTabBase,
  MobileFooterTabBaseProps,
} from "./mobile-footer-tab-base";

interface MobileFooterTabLinkProps extends MobileFooterTabBaseProps {
  href: string;
}

export const MobileFooterTabLink = ({
  href,
  ...baseProps
}: MobileFooterTabLinkProps) => {
  return (
    <UnstyledButton component={Link} href={href}>
      <MobileFooterTabBase {...baseProps} />
    </UnstyledButton>
  );
};
