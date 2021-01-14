import React, { useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { inject, observer } from "mobx-react";
import CovidChart from "./CovidChart";
import TimelineDates from "./TimelineDates";
import Header from "./Header";

import RootContext from "./RootContext";

const Wrapper = styled("div")`
  width: 100%;
`;

const Grid = styled("div")`
  display: grid;
  grid: 1fr/400px 1fr;
  margin-top: -520px;
`;

const ChartWrapper = styled("div")`
  display: grid;
  grid: 1fr/400px 1fr;
  position: sticky;
  z-index: 10000;
  top: 0;
  left: 20px;
  overflow: visible;
  z-index: 1000;
  width: 100%;
  height: 520px;
`;

const Dates = styled.div`
  p {
    height: 250px;
  }
`;

const TimeLine = () => {
  const rootRef = useRef();
  return (
    <Wrapper className="wrapper" ref={rootRef}>
      <RootContext.Provider value={rootRef}>
        <Header />
        <ChartWrapper>
          <div></div>
          <CovidChart />
        </ChartWrapper>
        <Grid>
          <TimelineDates />
          <div></div>
        </Grid>
      </RootContext.Provider>
    </Wrapper>
  );
};

export default TimeLine;
