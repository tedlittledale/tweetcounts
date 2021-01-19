import Timeline from "../components/Timeline";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tracks of our tiers</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@_superted" />
        <meta property="og:url" content="https://covid-timeline.tedspace.me/" />
        <meta property="og:title" content="Tracks of our tiers" />
        <meta
          property="og:description"
          content="A timeline visualisation showing the relationship between covid case
          rates and local restriction tiers in the lead up to the January 2021
          lockdown."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dc1yk89ve/image/upload/v1611052322/Screenshot_2021-01-19_at_10.22.23_dwsbss.png"
        />
      </Head>
      <Timeline title="Index Page" linkTo="/other" />
    </>
  );
}
