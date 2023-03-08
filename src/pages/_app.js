import { Modal } from "@redq/reuse-modal";
import React, { useEffect } from "react";
import Head from "next/head";
import Sticky from "react-stickynode";
import { DrawerProvider } from "common/contexts/DrawerContext";
import Navbar from "containers/Navbar";
import { ThemeProvider } from "styled-components";
import { theme } from "common/theme";
import ResetCSS from "common/assets/css/style";
import GlobalStyle from "containers/app.style";
import "common/assets/css/rc-collapse.css";
import localFont from "@next/font/local";

export function reportWebVitals(metric) {
  // console.log(metric);
}

const FractulAltBold = localFont({
  src: "fonts/FractulAltBold/font.woff2",
  variable: "--factul-alt-bold",
});

const FractulAltLight = localFont({
  src: "fonts/FractulAltLight/font.woff2",
});
const FractulRegular = localFont({
  src: "fonts/FractulRegular/font.woff2",
});

export default function CustomApp({ Component, pageProps }) {
  useEffect(() => {
    try {
      const loader = document.getElementById("aut-splash-loading");
      if (loader) {
        loader.style.display = "none";
      }
    } catch (error) {}
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <>
        <Head>
          <title>Try Āut</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
          <meta property="og:title" content="Try Āut" />
          <meta
            name="description"
            content="Do more with your DAO. Āut is a suite of DAO-native Tools to expand decentralized communities."
          />
          <meta
            property="og:description"
            content="Do more with your DAO. Āut is a suite of DAO-native Tools to expand decentralized communities."
          />
        </Head>
        <ResetCSS />
        <GlobalStyle />
        <style jsx global>
          {`
            :root {
              /* ... */
              --fractul-alt-light: ${FractulAltLight.style.fontFamily};
              --fractul-alt-bold: ${FractulAltBold.style.fontFamily};
              --fractul-regular: ${FractulRegular.style.fontFamily};
            }
          `}
        </style>
        <Sticky top={0} innerZ={200} activeClass="sticky-nav-active">
          <DrawerProvider>
            <Navbar />
          </DrawerProvider>
        </Sticky>
        <Component {...pageProps} />
      </>
    </ThemeProvider>
  );
}
