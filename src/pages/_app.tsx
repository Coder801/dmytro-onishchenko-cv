import "@/styles/base.scss";
import "@/styles/typography.scss";
import { Roboto } from "next/font/google";
import { appWithTranslation } from "next-i18next";

import type { AppProps } from "next/app";
import Head from "next/head";
import { ComponentType } from "react";

import { AppProvider } from "@/context/AppContext";

import Home from "./home";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

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
        <PageComponent {...pageProps} className={roboto.variable} />
      </AppProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
