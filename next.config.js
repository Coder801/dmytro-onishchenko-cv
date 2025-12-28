/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n: {
    locales: ["en", "ua"],
    defaultLocale: "en",
  },
  fallbackLng: "en",
  nonExplicitSupportedLngs: true,
  load: "languageOnly",
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coder801.github.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
