import { Button, Center } from "@mantine/core";
import { GetServerSideProps } from "next";
import { useCreatePlanModal } from "../../components/plan/create-modal";
import { i18nGetServerSideProps } from "../../helpers/i18nGetServerSidePropsMiddleware";

const Page = () => {
  const { open, close } = useCreatePlanModal();

  return (
    <Center h="100vh">
      <Button onClick={open} variant="filled">
        Open Modal
      </Button>
    </Center>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await i18nGetServerSideProps(context, [])),
    },
  };
};
