import { Card, Center, Grid, Paper, RingProgress, Stack, Text, Title, UnstyledButton, useMantineTheme } from "@mantine/core";
import { IconBook2, IconCalendarTime, IconUsers, IconUserX, TablerIcon } from "@tabler/icons";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Link from "next/link";
import { CurrentAvatar } from "../components/common/avatar-current";
import { i18nGetServerSideProps } from "../helpers/i18nGetServerSidePropsMiddleware";
import { MobileLayout } from "../layout/mobile/mobile-layout";
import { trpc } from "../utils/trpc";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const { data: user } = trpc.user.me.useQuery();
  const { t } = useTranslation(["pages/index", "user/common"]);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack>
        <Stack align="center" spacing={0} pos="relative">
          <RingProgress
            sections={[{ value: 42, color: "indigo" }]}
            style={{ overflow: "visible" }}
            thickness={10}
            size={200}
            roundCaps
            label={
              <Center>
                <CurrentAvatar color="transparent" radius={64} size={128} />
              </Center>
            }
          />

          <Paper withBorder pos="absolute" top={167} py={2} w={48} style={{ zIndex: 2 }} shadow="xl">
            <Text align="center" weight={500}>
              30
            </Text>
          </Paper>
          <Title order={3}>{user?.name}</Title>
          <Text color="dimmed">{t("user/common:role.apprentice.label")}</Text>
        </Stack>
        <Grid>
          <FastAction href="#" label={t("fastAction.class.label")} icon={IconUsers} />
          <FastAction href="#" label={t("fastAction.subject.label")} icon={IconBook2} />
          <FastAction href="#" label={t("fastAction.schedule.label")} icon={IconCalendarTime} />
          <FastAction href="#" label={t("fastAction.absence.label")} icon={IconUserX} />
        </Grid>
      </Stack>
    </>
  );
};

Home.getLayout = (page) => {
  return <MobileLayout activeTab="home">{page}</MobileLayout>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await i18nGetServerSideProps(context, ["pages/index", "user/common"])),
    },
  };
};

interface FastActionProps {
  href: string;
  label: string;
  icon: TablerIcon;
}

const FastAction = ({ href, label, icon: Icon }: FastActionProps) => {
  const { colors } = useMantineTheme();
  return (
    <Grid.Col span={6}>
      <UnstyledButton component={Link} href={href} w="100%">
        <Card bg={colors.indigo[7]} withBorder style={{ borderColor: "#fff6" }}>
          <Stack spacing={4} align="center" style={{ color: "#fff" }}>
            <Icon size={24} stroke={1.5} />
            <Text size="sm" align="center" weight={500}>
              {label}
            </Text>
          </Stack>
        </Card>
      </UnstyledButton>
    </Grid.Col>
  );
};
