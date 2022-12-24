module.exports = {
  // https://www.i18next.com/overview/configuration-options#logging
  i18n: {
    defaultLocale: "de",
    locales: ["en", "de"],
    fallbackLng: "en",
    localeDetection: true,
    returnEmptyString: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
  react: { useSuspense: false },
};
