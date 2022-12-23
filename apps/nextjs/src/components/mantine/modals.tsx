import { Button, Text } from "@mantine/core";
import {
  ContextModalProps,
  openContextModal as mantineOpenContextModal,
} from "@mantine/modals";
import { OpenContextModal } from "@mantine/modals/lib/context";
import { FC } from "react";

const createModal = <
  TOptions extends Record<string, FC<ContextModalProps<any>>>,
>(
  options: TOptions,
) => {
  return options;
};

const TestModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string }>) => (
  <>
    <Text size="sm">{innerProps.modalBody}</Text>
    <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
      Close modal
    </Button>
  </>
);

export const mantineModals = createModal({
  test: TestModal,
});

type MatineModals = typeof mantineModals;

type InnerProps<TKey extends keyof MatineModals> = Parameters<
  MatineModals[TKey]
>[0]["innerProps"];

export const openModal = <TKey extends keyof MatineModals>(
  options: OpenContextModal<InnerProps<TKey>> & { modal: TKey },
) => {
  if (typeof window === "undefined") return;

  return mantineOpenContextModal(options);
};
openModal({
  modal: "test",
  innerProps: {
    modalBody: "",
  },
});
