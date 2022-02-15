import React, { useEffect } from "react";
import { Provider, rootStore } from "../models/Root";
import GlobalStyles from "../styles/globals/manifest";

export default function App({ Component, pageProps }) {
  console.log({ Provider, rootStore });
  return (
    <Provider value={rootStore}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  );
}
