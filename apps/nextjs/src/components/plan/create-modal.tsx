import { Button, Grid, Group, Select, Stack, Title } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { closeModal, ContextModalProps } from "@mantine/modals";
import { useTranslation } from "next-i18next";
import { days } from "../../constants/date";
import { openModal } from "../mantine/modals";

export const CreatePlanModal = ({
  context,
  id,
}: ContextModalProps<Record<string, never>>) => {
  const { t } = useTranslation();

  const handleClose = () => {
    context.closeModal(id);
  };

  return (
    <Stack>
      <Grid>
        <Grid.Col span={12}>
          <Select data-autoFocus data={[]} label="Semester" />
        </Grid.Col>
        <Grid.Col span={12}>
          <Select
            data={days.slice(1).map((d) => t(`common:weekDay.${d}.label`))}
            label="Schultag"
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TimeInput label="Beginn der Lektion" />
        </Grid.Col>
        <Grid.Col span={12}>
          <TimeInput label="Ende der Lektion" />
        </Grid.Col>
      </Grid>
      <Group position="right" spacing="xs">
        <Button variant="subtle" onClick={handleClose}>
          Abbrechen
        </Button>
        <Button>Erstellen</Button>
      </Group>
    </Stack>
  );
};

export const useCreatePlanModal = () => {
  const open = () =>
    openModal({
      title: <Title order={4}>Semesterplan erstellen</Title>,
      modal: "createPlanModal",
      innerProps: {},
      size: "xl",
    });

  const close = () => closeModal("createPlanModal");
  return {
    open,
    close,
  };
};
