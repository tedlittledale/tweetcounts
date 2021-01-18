import React from "react";
import { useSprings, animated } from "react-spring";
import styled, { keyframes } from "styled-components";
import { prop, withProp } from "styled-tools";
import { includes } from "ramda";

import convertHexToRGBA from "../utils/hextorgba";
import highlightPoints from "../models/highlightPoints";

const PointsWrap = styled("svg")`
  display: grid;
  grid: 1fr / 1fr;
  justify-items: center;
  position: absolute;
  height: 600px;
  width: 100%;
  top: 0;
  left: 0;
  text {
    color: var(--color-page-content);
    font-size: 12px;
  }
`;

const colors = ["#006B3E", "#E9B949", "#FF8C01", "#ED2938", "#990000"];
const highlightLabels = [
  "Medway",
  "Camden",
  "Havering",
  "Basildon",
  "Liverpool",
  "Cornwall"
];

const Points = ({ keyCharts, currentPoints, isMobile, date }) => {
  console.log({ keyCharts, currentPoints });
  const springs = useSprings(
    currentPoints.length,
    currentPoints.map(({ x, tier, label }, idx) => ({
      x,
      tier,
      label,
      config: { duration: 500 }
    }))
  );

  return (
    <>
      <PointsWrap>
        {/* <polyline fill="none" stroke="#ccc" strokeWidth="2" points={lines} /> */}
        {springs.map(({ x, y, y2 }, idx) => (
          <g key={idx}>
            {/* <animated.circle
              fill={convertHexToRGBA(colors[points[idx].tier - 1], 30)}
              stroke={"black"}
              strokeWidth={points[idx].label === "Camden" ? 2 : 1}
              cx={x}
              cy={y}
              r="4"
            /> */}
            {keyCharts[0].length &&
              keyCharts.map((chartPoints, idx2) => (
                <animated.line
                  strokeOpacity={
                    highlightPoints[date] &&
                    highlightPoints[date][currentPoints[idx].label]
                      ? 1
                      : highlightPoints[date]
                      ? 0.2
                      : 1
                  }
                  x1={x}
                  y1={
                    idx2 === 0
                      ? currentPoints[idx].y
                      : keyCharts[idx2 - 1][idx].y
                  }
                  x2={x}
                  y2={chartPoints[idx].y}
                  strokeWidth={isMobile ? 2 : 4}
                  stroke={convertHexToRGBA(
                    colors[chartPoints[idx].tier - 1],
                    80
                  )}
                />
              ))}
          </g>
        ))}
      </PointsWrap>
    </>
  );
};

export default Points;
