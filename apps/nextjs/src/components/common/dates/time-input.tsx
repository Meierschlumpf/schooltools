import { TimeInput, TimeInputProps } from "@mantine/dates";
import { LooseKeys } from "@mantine/form/lib/types";
import { useFormForwardContext } from "../../../hooks/useFormForwardContext";

type FormTimeInputProps<TFormValues> = Omit<TimeInputProps, "name"> & {
  name: LooseKeys<TFormValues>;
};

export const FormTimeInput = <TFormValues,>({ name, onChange, onBlur, onFocus, ...props }: FormTimeInputProps<TFormValues>) => {
  const { inputProps } = useFormForwardContext(name, {
    onChange,
    onBlur,
    onFocus,
  });

  return <TimeInput {...props} {...inputProps} />;
};
