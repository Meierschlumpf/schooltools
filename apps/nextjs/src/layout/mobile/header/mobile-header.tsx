import { Container, Group, Header, Stack } from "@mantine/core";
import { MobileHeaderActions } from "./mobile-header-actions";
import { MobileHeaderLogo } from "./mobile-header-logo";
import { MobileHeaderSearch } from "./mobile-header-search";

export const MobileHeader = () => {
  return (
    <Header height={88}>
      <Container h="100%">
        <Stack spacing={8} mt={2}>
          <Group position="apart">
            <MobileHeaderLogo />
            <MobileHeaderActions />
          </Group>
          <MobileHeaderSearch />
        </Stack>
      </Container>
    </Header>
  );
};
