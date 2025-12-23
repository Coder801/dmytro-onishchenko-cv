/** @type {import('next').NextConfig} */

import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  basePath: isProd ? "/<repository-name>" : "",
  assetPrefix: isProd ? "/<repository-name>/" : "",
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
