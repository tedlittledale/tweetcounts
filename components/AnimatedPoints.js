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
  line {
    stroke: #d8d8d8;
  }
  text {
    color: black;
    font-size: 12px;
  }
  line {
    stroke: black;
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
  "Bristol, City of",
  "Cornwall"
];

const Points = ({ points = [], total }) => {
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
          <filter x="0" y="0" width="1" height="1" id="solid">
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
              cy={y}
              r="4"
            />
            {(includes(points[idx].label, highlightLabels) ||
              points[idx].rank === 0 ||
              points[idx].rank === points.length - 1) && (
              <>
                <animated.text
                  filter="url(#solid)"
                  x={x2}
                  y={y}
                  dy={-20}
                  textAnchor="middle"
                >
                  {points[idx].label}
                </animated.text>
                <animated.line x1={x} y1={y} x2={x2} y2={y2} strokeWidth={2} />
              </>
            )}
          </g>
        ))}
      </PointsWrap>
    </>
  );
};

export default Points;
