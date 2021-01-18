import React from "react";
import styled from "styled-components";

const AxesWrap = styled("div")`
  display: grid;
  grid: 1fr / 1fr;
  justify-items: center;
  position: relative;
  height: 520px;
  line {
    stroke: var(--color-faint);
  }
`;

const YAxis = styled.svg`
  display: grid;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  /* display: grid;
  grid: repeat(10, 1fr) / 1fr; */
  text {
    fill: var(--color-page-content);
    font-size: 12px;
    user-select: none;
  }
  > text {
    font-size: 14px;
  }
`;

const XAxis = styled.svg`
  display: grid;
  position: absolute;
  width: 100%;
  height: 120%;
  left: 0;
  top: 0;
  /* display: grid;
  grid: repeat(10, 1fr) / 1fr; */
  text,
  path {
    fill: #1a1817;
    font-size: 12px;
    user-select: none;
  }
  > text {
    font-size: 14px;
  }
`;

const Axes = ({ yTicks, xTicks, yLabel, xLabel, height, isMobile }) => {
  return (
    <AxesWrap>
      <YAxis>
        <text
          x={-(height / 2)}
          y={5}
          transform="rotate(-90)"
          textAnchor="middle"
          dy="1em"
        >
          {yLabel}
        </text>
        {yTicks.map(({ label, y }, i) => (
          <g key={i}>
            <line x1={30} x2="95%" y1={y} y2={y} />
            <text x={30} y={y + 14}>
              {label}
            </text>
          </g>
        ))}
      </YAxis>
      <XAxis>
        <text
          x="50%"
          y={(isMobile ? height : 510) - 52}
          textAnchor="middle"
          dy="1em"
        >
          {xLabel}
        </text>

        {/* {xTicks.map(({ label, x }, i) => (
          <g key={i}>
            <line x1={x} x2={x} y1={440} y2={450} />
            <text x={x} textAnchor="middle" y={465}>
              {label}
            </text>
          </g>
        ))} */}
      </XAxis>
    </AxesWrap>
  );
};

export default Axes;
