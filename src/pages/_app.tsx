import "@/styles/base.scss";
import "@/styles/typography.scss";
import { Roboto } from "next/font/google";
import { appWithTranslation } from "next-i18next";
import { Provider } from "react-redux";

import type { AppProps } from "next/app";
import Head from "next/head";
import { ComponentType } from "react";
import { store } from "@/store";
import { AppProvider } from "@/context/AppContext";

import Home from "./home";

import "@/translate/i18n";

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
      <Provider store={store}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <AppProvider>
          <PageComponent {...pageProps} className={roboto.variable} />
        </AppProvider>
      </Provider>
    </>
  );
}

export default appWithTranslation(MyApp);
