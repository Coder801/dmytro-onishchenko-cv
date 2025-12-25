/** @type {import('next').NextConfig} */

import nextI18NextConfig from "./next-i18next.config.js";

const nextConfig = {
  i18n: nextI18NextConfig.i18n,
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
