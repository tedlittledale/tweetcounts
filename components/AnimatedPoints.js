import React, { useState } from "react";
import { useSprings, animated } from "react-spring";
import styled, { keyframes } from "styled-components";
import { prop, withProp } from "styled-tools";
import { includes, append, without } from "ramda";

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
  line {
    stroke: #d8d8d8;
  }
  text {
    font-size: 12px;
  }
  line {
    stroke: black;
  }
  circle {
    cursor: pointer;
  }
`;

const colors = [
  "#006B3E",
  "#E9B949",
  "#FF8C01",
  "#ED2938",
  convertHexToRGBA("#000000", 60)
];
const highlightLabels = [
  "Medway",
  "Camden",
  "Havering",
  "Basildon",
  "Liverpool",
  "Bristol, City of",
  "Cornwall"
];

const Points = ({ points = [], total, isMobile }) => {
  const [labels, setLabels] = useState(highlightLabels);
  const springs = useSprings(
    points.length,
    points.map(({ x, y, tier, label }) => ({
      x,
      y,
      tier,
      label,
      x2: x + 17,
      y2: y - 17,
      config: { duration: 500 }
    }))
  );

  const Totals = styled.div`
    display: grid;
    grid: 1fr / 1fr;
  `;

  return (
    <>
      <PointsWrap>
        <defs>
          <filter x="0" y="0" width="1" height="1" id="solidwhite">
            <feFlood floodColor="white" result="bg" />
            <feMerge>
              <feMergeNode in="bg" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {springs.map(({ x, y, x2, y2 }, idx) => (
          <g key={idx}>
            <animated.circle
              fill={colors[points[idx].tier - 1]}
              stroke={"black"}
              strokeWidth={points[idx].label === "Camden" ? 0 : 0}
              cx={x}
              cy={points[idx].y}
              r={isMobile ? 2 : 4}
              data-areaname={points[idx].label}
              onMouseEnter={(e) => {
                setLabels(
                  append(e.currentTarget.dataset.areaname, highlightLabels)
                );
              }}
            />
            {(includes(points[idx].label, labels) ||
              points[idx].rank === 0 ||
              points[idx].rank === points.length - 1) && (
              <>
                <animated.text
                  filter="url(#solidwhite)"
                  x={x2}
                  y={points[idx].y}
                  dy={-20}
                  textAnchor="middle"
                >
                  {points[idx].label}
                </animated.text>
                <animated.line
                  x1={x}
                  y1={points[idx].y}
                  x2={x2}
                  y2={points[idx].y - 17}
                  strokeWidth={2}
                />
              </>
            )}
          </g>
        ))}
      </PointsWrap>
    </>
  );
};

export default Points;
