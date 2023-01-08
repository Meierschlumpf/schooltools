import { Button, Grid, Group, Loader, Select, Stack, Title } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { closeModal, ContextModalProps } from "@mantine/modals";
import { NotificationProps, showNotification } from "@mantine/notifications";
import { TRPCClientErrorLike } from "@trpc/client";
import { useTranslation } from "next-i18next";
import { z } from "zod";
import { days } from "../../constants/date";
import { trpc } from "../../utils/trpc";
import { openModal } from "../mantine/modals";

export const CreatePlanModal = ({ context, id }: ContextModalProps<Record<string, never>>) => {
  const { t } = useTranslation();
  const form = useForm<FormType>({
    validate: zodResolver(validationSchema),
  });
  const { mutateAsync: createAsync, isLoading } = trpc.plan.create.useMutation();
  const { data: semesters, ...semestersQuery } = trpc.semester.future.useQuery();

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

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Grid>
          <Grid.Col span={12}>
            <Select
              data-autofocus
              placeholder="Bitte das Semester auswählen..."
              data={
                semesters?.map((x) => ({
                  value: x.id,
                  label: x.start.getMonth() === 1 ? `Feb. ${x.start.getFullYear()}` : `Aug. ${x.start.getFullYear()}`,
                })) ?? []
              }
              label="Semester"
              {...form.getInputProps("semesterId")}
              icon={semestersQuery.isLoading ? <Loader size="xs" /> : null}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Select
              placeholder="Bitte den Schultag auswählen..."
              {...form.getInputProps("weekDay")}
              selectOnBlur
              data={days.slice(1).map((d, i) => ({
                value: (i + 1).toString(), // 1, 2, 3, 4, 5, 6
                label: t(`common:weekDay.${d}.label`),
              }))}
              label="Schultag"
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TimeInput
              {...form.getInputProps("start")}
              onChange={(v) => {
                const end = new Date(v.getFullYear(), v.getMonth(), v.getDate(), v.getHours(), v.getMinutes() + 90);
                form.setFieldValue("end", end);
                form.getInputProps("start").onChange(v);
              }}
              label="Beginn der Lektion"
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TimeInput {...form.getInputProps("end")} label="Ende der Lektion" />
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
    </form>
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

interface FormType {
  semesterId?: string;
  weekDay?: string;
  start?: Date;
  end?: Date;
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

const dateToMinutes = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return hours * 60 + minutes;
};

const showValidationErrorNotification = () => {
  showErrorNotification({
    title: "Validierungsfehler",
    message: "Bitte überprüfen sie Ihre Eingabe",
  });
};

const showServerErrorNotification = () => {
  showErrorNotification({
    title: "Serverfehler",
    message: "Ooups! Da ging wohl was schief.",
  });
};

const showErrorNotification = (props: NotificationProps) => {
  showNotification({
    ...props,
    color: "red",
  });
};

const showSuccessNotification = (props: NotificationProps) => {
  showNotification({
    ...props,
    color: "teal",
  });
};

const trpcGenericErrorHandler = (error: TRPCClientErrorLike<any>) => {
  if (error.data?.code === "BAD_REQUEST") {
    showValidationErrorNotification();
  } else {
    showServerErrorNotification();
  }
};
