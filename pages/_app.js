import { Provider } from "mobx-react";
import { useStore } from "../store";
import GlobalStyles from "../styles/globals/manifest";

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialState);

  return (
    <Provider store={store}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  );
}
