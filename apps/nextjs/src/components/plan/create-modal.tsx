import { Button, Grid, Group, Loader, Stack, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { closeModal, ContextModalProps } from "@mantine/modals";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";
import { z } from "zod";
import { days } from "../../constants/date";
import { FormProvider } from "../../contexts/form";
import { addMinutes } from "../../helpers/date/addMinutes";
import { dateToMinutes } from "../../helpers/date/dateToMinutes";
import { showSuccessNotification } from "../../helpers/notifications";
import { trpcGenericErrorHandler } from "../../helpers/trpc";
import { trpc } from "../../utils/trpc";
import { FormSelect } from "../common/core/inputs/select";
import { FormTimeInput } from "../common/dates/time-input";
import { openModal } from "../mantine/modals";

export const CreatePlanModal = ({ context, id }: ContextModalProps<Record<string, never>>) => {
  const form = useForm<FormType>({
    validate: zodResolver(validationSchema),
    validateInputOnBlur: true,
    validateInputOnChange: ["end"],
  });
  const { mutateAsync: createAsync, isLoading } = trpc.plan.create.useMutation();

  const handleClose = () => {
    context.closeModal(id);
  };

  const handleSubmit = async ({ semesterId, weekDay, start, end }: FormType) => {
    await createAsync(
      {
        semesterId: semesterId!,
        weekDay: parseInt(weekDay!),
        start: dateToMinutes(start!),
        end: dateToMinutes(end!),
      },
      {
        onError: trpcGenericErrorHandler,
        onSuccess() {
          showSuccessNotification({
            title: "Semesterplan erstellt",
            message: "Der Semesterplan wurde erfolgreich erstellt",
          });
          handleClose();
        },
      },
    );
  };

  const semesterSelectProps = useSemesterSelectQuery();
  const weekDayData = useWeekDayData();

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <FormProvider form={form}>
        <Stack>
          <Grid>
            <Grid.Col span={12}>
              <FormSelect<FormType> data-autofocus name="semesterId" placeholder="Bitte das Semester auswählen..." label="Semester" {...semesterSelectProps} />
            </Grid.Col>
            <Grid.Col span={12}>
              <FormSelect<FormType> name="weekDay" data={weekDayData} placeholder="Bitte den Schultag auswählen..." label="Schultag" />
            </Grid.Col>
            <Grid.Col span={12}>
              <FormTimeInput<FormType>
                name="start"
                onChange={(v) => {
                  form.setFieldValue("end", addMinutes(v, 90));
                }}
                label="Beginn der Lektion"
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <FormTimeInput<FormType> name="end" label="Ende der Lektion" />
            </Grid.Col>
          </Grid>
          <Group position="right" spacing="xs">
            <Button variant="subtle" onClick={handleClose} disabled={isLoading}>
              Abbrechen
            </Button>
            <Button type="submit" disabled={isLoading} loading={isLoading} loaderPosition="right">
              Erstellen
            </Button>
          </Group>
        </Stack>
      </FormProvider>
    </form>
  );
};

const useSemesterSelectQuery = () => {
  const { data: semesters, isLoading } = trpc.semester.future.useQuery();

  const mappedData = useMemo(
    () =>
      semesters?.map((x) => ({
        value: x.id,
        label: x.start.getMonth() === 1 ? `Feb. ${x.start.getFullYear()}` : `Aug. ${x.start.getFullYear()}`,
      })) ?? [],
    [semesters],
  );

  const icon = isLoading ? <Loader size="xs" /> : null;

  return {
    data: mappedData,
    icon,
  };
};

const useWeekDayData = () => {
  const { t } = useTranslation();
  return days.slice(1).map((d, i) => ({
    value: (i + 1).toString(), // 1, 2, 3, 4, 5, 6
    label: t(`common:weekDay.${d}.label`),
  }));
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

interface FormType {
  semesterId?: string;
  weekDay?: string;
  start?: Date;
  end?: Date;
  test?: boolean;
}

const validationSchema = z
  .object({
    start: z.date({
      required_error: "common.required",
    }),
    end: z.date({
      required_error: "common.required",
    }),
  })
  .refine((obj) => obj.start.getTime() < obj.end.getTime(), {
    message: "plan.endSmallerThanStart",
    path: ["end"],
  })
  .and(
    z.object({
      semesterId: z.string({
        required_error: "common.required",
      }),
      weekDay: z
        .string({
          required_error: "common.required",
        })
        .regex(/\d/),
    }),
  );
