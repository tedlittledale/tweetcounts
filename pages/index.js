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
import { useScroll } from "../utils/hooks/useScroll";

const Pages = styled("div")`
  display: grid;
  grid: 100vh 100vh/ 1fr;
  height: 100vh;
  ${withProp(["pageHeight"], (pageHeight) => `height: ${pageHeight}px;`)};
  overflow: hidden;
`;

const PagesScroller = styled("div")`
  position: absolute;
  transition: top 500ms ease-in-out;
  top: 0;
  top: ${withProp(
    ["currentPage", "pageHeight"],
    (currentPage, pageHeight) => `-${currentPage * pageHeight}px`
  )};
`;

const Home = ({ countdownModel, countdownModel: { currentPage } }) => {
  const [scrollDirection, setScrollDirection] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [lastScrollEvent, setLastScrolEvent] = useState(0);
  const [updateDiff, setUpdateDiff] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const handlers = useSwipeable({
    onSwiped: ({ dir }) => {
      const now = Date.now();
      console.log({ dir });
      setScrollDirection(dir === "Up" ? 1 : -1);
      setLastScrolEvent(now);
    },
    ...{
      delta: 10, // min distance(px) before a swipe starts
      preventDefaultTouchmoveEvent: false, // call e.preventDefault *See Details*
      trackTouch: true, // track touch input
      trackMouse: true, // track mouse input
      rotationAngle: 0 // set a rotation angle
    }
  });
  useEffect(() => {
    const now = Date.now();
    const diff = now - lastUpdate;
    if (diff > 50 && (scrollDirection === 1 || scrollDirection === -1)) {
      countdownModel.updatePage(scrollDirection);
    }
    setLastUpdate(now);

    return () => {};
  }, [lastScrollEvent]);
  useEffect(() => {
    const updateHeight = () => {
      setPageHeight(window.innerHeight);
    };
    setPageHeight(window.innerHeight);
    window.addEventListener("wheel", (e) => {
      const { deltaY } = e;

      setScrollDirection(deltaY > 0 ? 1 : -1);
      const now = Date.now();
      setUpdateDiff(now - lastUpdate);
      setLastScrolEvent(now);
    });
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Countdown to normal</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@_superted" />
        <meta property="og:url" content="https://countdown.tedspace.me/" />
        <meta property="og:title" content="Freedom calculator" />
        <meta
          property="og:description"
          content="Guestimating how long it will be before the UK vaccinates its way to herd immunity"
        />
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
      <Pages {...handlers} pageHeight={pageHeight}>
        <PagesScroller currentPage={currentPage} pageHeight={pageHeight}>
          <Header pageHeight={pageHeight} />
          <Timeline pageHeight={pageHeight} />
          <Breakdown pageHeight={pageHeight} />
        </PagesScroller>
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
