import React, { useRef } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { withProp } from "styled-tools";
import Link from "next/link";
import { compose } from "ramda";
import { observer } from "mobx-react-lite";
import { withPaths } from "../utils/store";
const CovidChart = dynamic(() => import("./CovidChart"), { ssr: false });
import TimelineDates from "./TimelineDates";
import Header from "./Header";
import Sources from "./Sources";
import { media } from "../utils/media";

import RootContext from "./RootContext";

const Wrapper = styled("div")`
  width: 100%;
  background: var(--color-selection-background);
`;

const Grid = styled("div")`
  background: var(--color-selection-background);
  display: grid;
  grid: 1fr/280px 1fr;
  ${withProp(
    "chartHeight",
    (chartHeight) => `margin-top: -${chartHeight}px;
      padding-bottom: ${chartHeight - 300}px;`
  )}
  ${media.phablet`grid: 1fr/1fr;`}
  ${media.phone`grid: 1fr/1fr;`}
`;

const ChartWrapper = styled("div")`
  background: var(--color-selection-background);
  display: grid;
  grid: 1fr/280px 1fr;
  ${media.phablet`grid: 1fr/1fr;`}
  ${media.phone`grid: 1fr/1fr;`}
  position: sticky;
  z-index: 10000;
  top: 0;
  left: 40px;
  overflow: visible;
  z-index: 1000;
  ${media.phablet`z-index: 1000000;`}
  ${media.phone`z-index: 1000000;`}
  width: 100%;
  ${withProp(
    "chartHeight",
    (chartHeight) => `height: ${chartHeight ? chartHeight : 0}px`
  )}
`;

const TimeLine = ({ currentChart }) => {
  const rootRef = useRef();
  return (
    <Wrapper className="wrapper" ref={rootRef}>
      <RootContext.Provider value={rootRef}>
        <Header />
        <div>
          <ChartWrapper chartHeight={currentChart.height}>
            <div></div>
            <CovidChart />
          </ChartWrapper>
          <Grid chartHeight={currentChart.height}>
            <TimelineDates />
            <div></div>
          </Grid>
        </div>

        <Sources />
      </RootContext.Provider>
    </Wrapper>
  );
};

export default compose(
  withPaths(["timelineModel.currentChart"]),
  observer
)(TimeLine);
