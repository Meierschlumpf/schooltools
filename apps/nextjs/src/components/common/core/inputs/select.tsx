import { Select, SelectProps } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { LooseKeys } from "@mantine/form/lib/types";
import { t } from "i18next";
import { useFormContext } from "../../../plan/create-modal";

type FormSelectProps<TFormValues> = SelectProps & {
  name: LooseKeys<TFormValues>;
};

export const FormSelect = <TFormValues,>({ name, ...props }: FormSelectProps<TFormValues>) => {
  const form = useFormContext() as UseFormReturnType<TFormValues>;

  const { error, value, onChange, onFocus, onBlur } = form.getInputProps(name);

  const translatedError = useFormError(error);

  console.log(error);

  return <Select {...props} />;
};

const useFormError = (error: string) => {
  return t("");
};
