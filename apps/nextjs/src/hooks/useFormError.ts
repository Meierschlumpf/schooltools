import { useTranslation } from "next-i18next";

export const useFormError = (errorTranslationKey: string) => {
  const { t } = useTranslation("form");
  return t(errorTranslationKey);
};
