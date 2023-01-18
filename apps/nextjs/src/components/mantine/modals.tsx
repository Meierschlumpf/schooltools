import { ContextModalProps, openContextModal as mantineOpenContextModal } from "@mantine/modals";
import { OpenContextModal } from "@mantine/modals/lib/context";
import { FC } from "react";
import { CreatePlanModal } from "../plan/create-modal";

const createModal = <TOptions extends Record<string, FC<ContextModalProps<any>>>>(options: TOptions) => {
  return options;
};

export const mantineModals = createModal({
  createPlanModal: CreatePlanModal,
});

type MatineModals = typeof mantineModals;

type InnerProps<TKey extends keyof MatineModals> = Parameters<MatineModals[TKey]>[0]["innerProps"];

export const openModal = <TKey extends keyof MatineModals>(options: OpenContextModal<InnerProps<TKey>> & { modal: TKey }) => {
  if (typeof window === "undefined") return;

  return mantineOpenContextModal(options);
};
