export const defaultI18nNamespaces = [
  "common",
  "layout/footer/common",
  "layout/header/search",
  "layout/header/profile/common",
  "layout/header/profile/app-settings/language",
  "layout/header/notification/common",
] as const;

export const i18nNamespaces = [
  ...defaultI18nNamespaces,
  "user/common",
  "pages/index",
] as const;

export type i18nNamespaceType = typeof i18nNamespaces;
