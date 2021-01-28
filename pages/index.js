import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import Head from "next/head";
import { useMouseWheel } from "react-use";
import styled from "styled-components";
import { withProp } from "styled-tools";
import { getSnapshot } from "mobx-state-tree";
import { compose, path } from "ramda";
import { observer } from "mobx-react-lite";
import { withPaths } from "../utils/store";
import { parse, addDays, format } from "date-fns/fp";
import Header from "../components/Header";
import Timeline from "../components/Timeline";
import Breakdown from "../components/Breakdown";
import { initializeStore } from "../store";

const Pages = styled("div")``;

const Home = () => {
  return (
    <>
      <Head>
        <title>Example Title</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@_superted" />
        <meta property="og:url" content="https://countdown.tedspace.me/" />
        <meta property="og:title" content="Freedom calculator" />
        <meta property="og:description" content="Example Description" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dc1yk89ve/image/upload/v1611689943/Screenshot_2021-01-26_at_19.38.28_ouuy8y.png"
        />
        <link rel="icon" href="animated-favicon.gif" type="image/gif"></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Pages>
        <Header />
      </Pages>
    </>
  );
};

export default compose(withPaths(["exampleModel"]), observer)(Home);

// The date returned here will be different for every request that hits the page,
// that is because the page becomes a serverless function instead of being statically
// exported when you use `getServerSideProps` or `getInitialProps`
export async function getStaticProps() {
  const store = initializeStore();

  return { props: { initialState: getSnapshot(store) } };
}
