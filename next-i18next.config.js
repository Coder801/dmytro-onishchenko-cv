// next-i18next.config.js

const config = {
  i18n: {
    locales: ["en", "ua"],
    defaultLocale: "en",
  },
  debug: process.env.NODE_ENV === "development",
  reloadOnPrerender: process.env.NODE_ENV === "development",
};

export default config;
