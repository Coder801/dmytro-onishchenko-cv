import "@/styles/base.scss";
import "@/styles/typography.scss";
import "@/translate/i18n";

import type { AppProps } from "next/app";
import { Oswald, Roboto } from "next/font/google";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { ComponentType } from "react";
import { Provider } from "react-redux";

import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Themes } from "@/config/types";
import { AppProvider } from "@/context/AppContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { store } from "@/store";

import Home from "./home";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-gluten",
});

function MyApp({ Component, pageProps, router }: AppProps) {
  const routesMap: Record<string, ComponentType> = {
    "/": Home,
  };

  const PageComponent = routesMap[router.pathname] || Component;

  return (
    <>
      <GoogleAnalytics />
      <Provider store={store}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="version"
            content={`${process.env.APP_VERSION}-${process.env.GIT_HASH}`}
          />
          <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
        </Head>
        <AppProvider>
          <ThemeProvider initialTheme={Themes.river}>
            <PageComponent
              {...pageProps}
              className={`${roboto.variable} ${oswald.variable}`}
            />
          </ThemeProvider>
        </AppProvider>
      </Provider>
    </>
  );
}

export default appWithTranslation(MyApp);
