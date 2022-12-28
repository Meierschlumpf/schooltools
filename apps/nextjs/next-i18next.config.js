const path = require("path");

module.exports = {
  // https://www.i18next.com/overview/configuration-options#logging
  i18n: {
    defaultLocale: "de",
    locales: ["en", "de"],
    fallbackLng: "en",
    localeDetection: true,
    returnEmptyString: false,
    localePath: path.resolve("./public/locales"),
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
  react: { useSuspense: false },
};
