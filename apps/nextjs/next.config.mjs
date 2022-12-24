import * as i18nConfig from "./next-i18next.config.js";

// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  i18n: i18nConfig.i18n,
  swcMinify: true,
  experimental: {
    // Enables hot-reload and easy integration for local packages
    transpilePackages: ["@acme/api", "@acme/auth", "@acme/db"],
  },
  // We already do linting on GH actions
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
};

export default config;
