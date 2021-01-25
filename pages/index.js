import { useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import { getSnapshot } from "mobx-state-tree";
import { compose, path } from "ramda";
import { observer } from "mobx-react-lite";
import { withPaths } from "../utils/store";
import { parse, addDays, format } from "date-fns/fp";
import Header from "../components/Header";
import Timeline from "../components/Timeline";
import { initializeStore } from "../store";
import { useScroll } from "../utils/hooks/useScroll";

const Pages = styled("div")`
  display: grid;
  grid: 100vh 100vh/ 1fr;
`;

const PageSection = styled("div")`
  display: grid;
  grid: 100vh 100vh/ 1fr;
`;

const Home = ({ countdownModel, countdownModel: { currentPage } }) => {
  const { scrollY, scrollDirection } = useScroll();
  useEffect(() => {
    if (scrollDirection === 1 || scrollDirection === -1) {
      countdownModel.updatePage(scrollDirection);
    }

    return () => {};
  }, [scrollDirection, scrollY]);
  useEffect(() => {
    var pageHeight = window.innerHeight;
    console.log({ currentPage });
    window.scrollTo({
      left: 0,
      top: currentPage * pageHeight,
      behavior: "smooth"
    });
    return () => {};
  }, [currentPage]);
  return (
    <>
      <Head>
        <title>Countdown to normal</title>
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
        <Timeline />
      </Pages>
    </>
  );
};

export default compose(withPaths(["countdownModel"]), observer)(Home);

// The date returned here will be different for every request that hits the page,
// that is because the page becomes a serverless function instead of being statically
// exported when you use `getServerSideProps` or `getInitialProps`
export async function getStaticProps() {
  const response = await fetch(
    "https://coronavirus.data.gov.uk/api/v1/data?filters=areaType=overview&structure=%7B%22areaType%22:%22areaType%22,%22areaName%22:%22areaName%22,%22areaCode%22:%22areaCode%22,%22date%22:%22date%22,%22newPeopleVaccinatedFirstDoseByPublishDate%22:%22newPeopleVaccinatedFirstDoseByPublishDate%22,%22newPeopleVaccinatedSecondDoseByPublishDate%22:%22newPeopleVaccinatedSecondDoseByPublishDate%22,%22cumPeopleVaccinatedFirstDoseByPublishDate%22:%22cumPeopleVaccinatedFirstDoseByPublishDate%22,%22cumPeopleVaccinatedSecondDoseByPublishDate%22:%22cumPeopleVaccinatedSecondDoseByPublishDate%22%7D&format=json",
    {
      method: "GET"
    }
  ).then((response) => {
    if (!response.ok) {
      return response.text().then((err) => {
        throw err;
      });
    }
    return response.json();
  });

  const cleanData = response.data.map(
    (
      {
        date,
        newPeopleVaccinatedFirstDoseByPublishDate,
        newPeopleVaccinatedSecondDoseByPublishDate,
        cumPeopleVaccinatedFirstDoseByPublishDate,
        cumPeopleVaccinatedSecondDoseByPublishDate
      },
      idx
    ) => {
      return {
        date,
        newPeopleVaccinatedFirstDoseByPublishDate,
        newPeopleVaccinatedSecondDoseByPublishDate,
        cumPeopleVaccinatedFirstDoseByPublishDate,
        cumPeopleVaccinatedSecondDoseByPublishDate
      };
    }
  );

  const store = initializeStore();
  store.countdownModel.processData(cleanData);

  return { props: { initialState: getSnapshot(store) } };
}
