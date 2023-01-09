import { LooseKeys, UseFormReturnType } from "@mantine/form/lib/types";
import { FocusEventHandler } from "react";
import { useFormContext } from "../contexts/form";
import { useFormError } from "./useFormError";

export const useFormForwardContext = <TFormValues>(
  name: LooseKeys<TFormValues>,
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange?: (v: any) => void;
    onBlur?: FocusEventHandler<Element>;
    onFocus?: FocusEventHandler<Element>;
  },
  options?: {
    type: "checkbox" | "input";
  },
) => {
  const form = useFormContext() as UseFormReturnType<TFormValues>;

  const { error, ...inputProps } = form.getInputProps(name, options);

  const translatedError = useFormError(error);

  return {
    inputProps: {
      ...inputProps,
      error: translatedError,
      onChange: forwardFunction(inputProps.onChange, actions.onChange),
      onBlur: forwardFunction(inputProps.onBlur, actions.onBlur),
      onFocus: forwardFunction(inputProps.onFocus, actions.onFocus),
    },
    form,
  };
};

const forwardFunction =
  <TArg = unknown>(inputProp: (arg: TArg) => void, prop?: (arg: TArg) => void) =>
  (arg: TArg) => {
    inputProp(arg);
    prop?.(arg);
  };
