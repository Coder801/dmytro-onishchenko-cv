import "@/styles/base.scss";
import "@/styles/typography.scss";

import type { AppProps } from "next/app";
import Head from "next/head";
import { ComponentType } from "react";

import { AppProvider } from "@/context/AppContext";

import Home from "./home";

function MyApp({ Component, pageProps, router }: AppProps) {
  const routesMap: Record<string, ComponentType> = {
    "/": Home,
  };

  const PageComponent = routesMap[router.pathname] || Component;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppProvider>
        <PageComponent {...pageProps} />
      </AppProvider>
    </>
  );
}

export default MyApp;
