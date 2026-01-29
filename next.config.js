import { execSync } from "child_process";
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync("./package.json", "utf8"));

const getGitHash = () => {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "unknown";
  }
};

/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    APP_VERSION: pkg.version,
    GIT_HASH: getGitHash(),
  },
  i18n: {
    locales: ["en", "ua"],
    defaultLocale: "en",
  },
  load: "languageOnly",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
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
