import { Select, SelectProps } from "@mantine/core";
import { LooseKeys } from "@mantine/form/lib/types";
import { useFormForwardContext } from "../../../../hooks/useFormForwardContext";

type FormSelectProps<TFormValues> = Omit<SelectProps, "name"> & {
  name: LooseKeys<TFormValues>;
};

export const FormSelect = <TFormValues,>({ name, ...props }: FormSelectProps<TFormValues>) => {
  const { inputProps } = useFormForwardContext(name, props);

  return <Select {...props} {...inputProps} />;
};
