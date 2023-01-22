import { getServerSession } from "@acme/auth";
import { Anchor, Button, Center, Stack, Text, Title } from "@mantine/core";
import { IconBrandDiscord, IconSchool } from "@tabler/icons";
import { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import { Trans, useTranslation } from "next-i18next";
import Head from "next/head";
import { i18nGetServerSideProps } from "../helpers/i18nGetServerSidePropsMiddleware";
import { NextPageWithLayout } from "./_app";

const LoginPage: NextPageWithLayout = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center mt="40%">
        <Stack w="80%" maw="300px" align="center">
          <Stack spacing={0} align="center">
            <IconSchool size={128} />
            <Title order={2}>School - Tools</Title>
          </Stack>

          <Text size="md" weight={500} mt="lg">
            {t("pages/login:title")}
          </Text>

          <Button fullWidth onClick={() => signIn("discord")} rightIcon={<IconBrandDiscord size={16} stroke={1.5} />}>
            Discord
          </Button>

          <Text size="sm">
            <Trans i18nKey="pages/login:note" components={[<Anchor key="a" href="https://discord.gg" target="_blank" />]}></Trans>
          </Text>
        </Stack>
      </Center>
    </>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // redirection when session already defined
  const session = await getServerSession(context);
  if (session)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };

  return {
    props: {
      ...(await i18nGetServerSideProps(context, ["pages/login"])),
    },
  };
};
