import React, { useEffect } from "react";
import GlobalStyles from "../styles/globals/manifest";
import { Provider, rootStore } from "../models/Root";

export default function App({ Component, pageProps }) {
  return (
    <Provider value={rootStore}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  );
}
