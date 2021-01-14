import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { compose } from "ramda";
import { observer, useObservable, useObserver } from "mobx-react-lite";
import { injectPick, withPaths } from "../utils/store";

import Axes from "./Axes";
import Legend from "./Legend";
import GhostPoints from "./GhostPoints";
import AnimatedPoints from "./AnimatedPoints";
import { media } from "../utils/media";

const ChartWrap = styled("div")`
  width: 100%;
  position: relative;
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  h2 {
    background-image: linear-gradient(
      to bottom right,
      hsl(205, 87%, 29%),
      hsl(205, 76%, 39%)
    );
    margin: 0 0 10px;
    padding: 20px 40px;
    border-radius: 5px 5px 0 0;
    text-align: left;
    color: #fff;
    font-weight: normal;
    letter-spacing: 0.8px;
  }
  > div {
    max-width: 960px;
    ${media.phablet`width: 90%;`}
    ${media.phone`width: 90%;`}
    border-radius: 5px;
    box-sizing: border-box;
    background: white;
    margin: 0 auto;
    > div {
      position: relative;
    }
  }
`;

const Credit = styled.div`
  padding: 20px;
  text-align: left;
  a {
    text-decoration: underline;
    color: hsl(205, 82%, 33%);
  }
  margin-bottom: 30px;
`;

const CovidChart = ({ currentChart, currentDate, timelineModel }) => {
  const keyCharts = timelineModel.getKeyChart();
  console.log({ keyCharts });
  const targetRef = useRef();
  useEffect(() => {
    const { width } = targetRef.current.getBoundingClientRect();
    currentChart && currentChart.setUpScales({ width });
  }, [currentDate]);
  console.log(currentChart.tiers.toJSON());
  const currentPoints =
    currentChart.state === "ready" ? currentChart.points() : [];
  return (
    <>
      <ChartWrap>
        <div ref={targetRef}>
          {currentChart && currentChart.state === "ready" ? (
            <div>
              <Axes
                yTicks={currentChart.yAxis()}
                xTicks={currentChart.xAxis()}
                xLabel="Rank of case rate"
                yLabel="New cases (7 day rolling average)"
              ></Axes>

              {keyCharts.map((keyChart) => (
                <GhostPoints
                  currentPoints={currentPoints}
                  points={currentChart.getGhostPoints(keyChart)}
                ></GhostPoints>
              ))}
              <AnimatedPoints
                total={currentChart.englandTotal}
                points={currentPoints}
              ></AnimatedPoints>
              <Legend
                tiers={currentChart.tiers.toJSON()}
                keyDateLegend={timelineModel.getKeyChartLegend()}
                width={currentChart.width}
              />
            </div>
          ) : (
            <p>Loading</p>
          )}
        </div>
      </ChartWrap>
    </>
  );
};

export default compose(
  withPaths(["timelineModel.currentChart", "timelineModel"]),
  observer
)(CovidChart);
