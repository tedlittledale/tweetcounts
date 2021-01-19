import React, { useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { withProp } from "styled-tools";
import { compose } from "ramda";
import { observer, useObservable, useObserver } from "mobx-react-lite";
import { injectPick, withPaths } from "../utils/store";
import Axes from "./Axes";
import Legend from "./Legend";
import GhostPoints from "./GhostPoints";
import Annotation from "./Annotation";
import AnimatedPoints from "./AnimatedPoints";
import { media } from "../utils/media";

const ChartWrap = styled("div")`
  width: 100%;
  padding-top: 50px;
  padding-left: 20px;
  ${media.phablet` padding-left: 0px;`}
  ${media.phone` padding-left: 0px;`}
  border-left: 1px solid var(--color-faint);
  ${media.phablet` padding-top: 50px;`}
  ${media.phone` padding-top: 50px;`}
  position: relative;
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background: var(--color-selection-background);
  > div {
    max-width: 100%;
    ${media.phablet`width: 100%;`}
    ${media.phone`width: 100%;`}
    ${withProp(
      "chartHeight",
      (chartHeight) => `height: ${chartHeight ? chartHeight : 0}px;`
    )}
    border-radius: 5px;
    box-sizing: border-box;
    margin: 0 auto;
    > div {
      position: relative;
    }
  }
`;

const CovidChart = ({
  currentChart,
  currentChart: { annotation, width, height, state },
  timelineModel
}) => {
  const keyCharts = timelineModel.getKeyChart();
  console.log({ keyCharts });
  const targetRef = useRef();
  const updateScales = () => {
    const { width } = targetRef.current.getBoundingClientRect();

    const height = window.innerHeight;
    currentChart && currentChart.setUpScales({ width, height });
  };
  console.log(currentChart.annotation);
  useEffect(() => {
    async function fetchData() {
      let cases = await import("../models/casesMap");
      timelineModel.setCases(cases.default);
      timelineModel.setDate("2020-12-02");
      updateScales();
      // ...
    }
    fetchData();
    window.addEventListener("resize", updateScales);
    return () => {
      window.removeEventListener("resize", updateScales);
    };
  }, []);

  const currentPoints = state === "ready" ? currentChart.points() : [];
  return (
    <>
      <ChartWrap chartHeight={height}>
        <div ref={targetRef}>
          {currentChart && state === "ready" ? (
            <div>
              {annotation && <Annotation content={annotation} width={width} />}
              <Axes
                yTicks={currentChart.yAxis()}
                xTicks={currentChart.xAxis()}
                xLabel="Rank of case rate"
                yLabel="New cases (7 day rolling average)"
                height={height}
                isMobile={currentChart.isMobile}
              ></Axes>
              <Legend
                tiers={currentChart.tiers.toJSON()}
                keyDateLegend={timelineModel.getKeyChartLegend()}
                width={currentChart.width}
                height={currentChart.height}
                isMobile={currentChart.isMobile}
              />
              {keyCharts && (
                <GhostPoints
                  height={height}
                  date={timelineModel.currentDate}
                  currentPoints={currentPoints}
                  isMobile={currentChart.isMobile}
                  keyCharts={keyCharts.map((keyChart) =>
                    currentChart.getGhostPoints(keyChart)
                  )}
                ></GhostPoints>
              )}
              <AnimatedPoints
                height={height}
                date={timelineModel.currentDate}
                total={currentChart.englandTotal}
                isMobile={currentChart.isMobile}
                points={currentPoints}
              ></AnimatedPoints>
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
