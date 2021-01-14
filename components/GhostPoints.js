import React from "react";
import { useSprings, animated } from "react-spring";
import styled, { keyframes } from "styled-components";
import { prop, withProp } from "styled-tools";
import { includes } from "ramda";

import convertHexToRGBA from "../utils/hextorgba";

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
    color: black;
    font-size: 12px;
  }
`;

const colors = [
  "#006B3E",
  "#FFE733",
  "#FF8C01",
  "#ED2938",
  convertHexToRGBA("#ED2938", 60)
];
const highlightLabels = [
  "Medway",
  "Camden",
  "Havering",
  "Basildon",
  "Liverpool",
  "Cornwall"
];

const Points = ({ points, currentPoints }) => {
  const springs = useSprings(
    points.length,
    points.map(({ x, y, tier, label }, idx) => ({
      x,
      y,
      tier,
      label,
      y2: currentPoints[idx].y,
      config: { duration: 500 }
    }))
  );
  console.log({ points });
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
            <animated.line
              x1={x}
              y1={y}
              x2={x}
              y2={y2}
              strokeWidth={4}
              stroke={convertHexToRGBA(colors[points[idx].tier - 1], 90)}
            />
          </g>
        ))}
      </PointsWrap>
    </>
  );
};

export default Points;
