import { TimeInput, TimeInputProps } from "@mantine/dates";
import { LooseKeys } from "@mantine/form/lib/types";
import { useTranslation } from "next-i18next";
import { useFormForwardContext } from "../../../hooks/useFormForwardContext";

type FormTimeInputProps<TFormValues> = Omit<TimeInputProps, "name"> & {
  name: LooseKeys<TFormValues>;
  translationPath: string;
};

export const FormTimeInput = <TFormValues,>({ name, translationPath, onChange, onBlur, onFocus, ...props }: FormTimeInputProps<TFormValues>) => {
  const { t } = useTranslation();
  const { inputProps } = useFormForwardContext(name, {
    onChange,
    onBlur,
    onFocus,
  });

  const label = props.label ?? t(`${translationPath}.label`);

  return <TimeInput label={label} {...props} {...inputProps} />;
};
