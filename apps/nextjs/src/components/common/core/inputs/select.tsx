import { Select, SelectProps } from "@mantine/core";
import { LooseKeys } from "@mantine/form/lib/types";
import { useTranslation } from "next-i18next";
import { useFormForwardContext } from "../../../../hooks/useFormForwardContext";

type FormSelectProps<TFormValues> = Omit<SelectProps, "name"> & {
  name: LooseKeys<TFormValues>;
  translationPath?: string;
};

export const FormSelect = <TFormValues,>({ name, translationPath, ...props }: FormSelectProps<TFormValues>) => {
  const { t } = useTranslation();
  const { inputProps } = useFormForwardContext(name, props);

  const label = props.label ?? t(`${translationPath}.label`);
  const placehoder = props.placeholder ?? t(`${translationPath}.placeholder`);

  return <Select label={label} placeholder={placehoder} {...props} {...inputProps} />;
};
