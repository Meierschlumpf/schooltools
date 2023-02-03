import { Button, Center } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { useCreatePlanModal } from "../../components/plan/create-modal";
import { i18nGetServerSideProps } from "../../helpers/i18nGetServerSidePropsMiddleware";
import { withRoleCheck } from "../../helpers/serverSidePropsMiddleware";

const Page = () => {
  const { t } = useTranslation();
  const { open } = useCreatePlanModal();

  return (
    <Center h="100vh">
      <Button onClick={open} variant="filled" rightIcon={<IconPlus size={16} stroke={1.5} />}>
        {t("action.create")}
      </Button>
    </Center>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = withRoleCheck(["Teacher", "Admin"], async (context) => {
  return {
    props: {
      ...(await i18nGetServerSideProps(context, ["plan/common"])),
    },
  };
});
