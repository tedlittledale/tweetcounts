import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { getSnapshot } from "mobx-state-tree";
import Chart from "../components/Chart";
import { useMst } from "../models/Root";
import getTweetCounts from "../lib/api/twitter/getTweetCounts";

const Pages = styled("div")``;

export default function Index(props) {
  const { chartModel } = useMst();
  console.log({ chartModel, props });
  chartModel.processData({ data: props.results });
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
        <Chart />
      </Pages>
    </>
  );
}

export async function getStaticProps() {
  // Instead of fetching your `/api` route you can call the same
  // function directly in `getStaticProps`
  const results = await getTweetCounts();

  // Props returned will be passed to the page component
  return { props: { results } };
}
