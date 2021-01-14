import React from "react";
import styled from "styled-components";

import convertHexToRGBA from "../utils/hextorgba";

const colors = [
  "#006B3E",
  "#FFE733",
  "#FF8C01",
  "#ED2938",
  convertHexToRGBA("#ED2938", 60)
];

const LegendWrap = styled("svg")`
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

const Legend = ({ tiers, width, keyDateLegend }) => {
  console.log({ tiers });

  return (
    <LegendWrap>
      <filter x="0" y="0" width="1" height="1" id="solid">
        <feFlood floodColor="grey" result="bg" />
        <feMerge>
          <feMergeNode in="bg" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <g filter="url(#solid)">
        {tiers.map((tier, idx) => (
          <>
            <text
              filter="url(#solid)"
              y={100 + idx * 20}
              x={width - 110}
              textAnchor="end"
              alignmentBaseline="middle"
            >
              Tier {tier}
            </text>
            <circle
              fill={convertHexToRGBA(colors[tier - 1], 100)}
              strokeWidth={1}
              cx={width - 100}
              cy={100 + idx * 20}
              r="4"
            />
          </>
        ))}
        {keyDateLegend && (
          <>
            <text
              filter="url(#solid)"
              y={100 + tiers.length * 20}
              x={width - 110}
              textAnchor="end"
              alignmentBaseline="middle"
            >
              Increase since {keyDateLegend} tiers changes
            </text>
            <circle
              fill={convertHexToRGBA(colors[2], 30)}
              strokeWidth={1}
              cx={width - 100}
              cy={100 + tiers.length * 20}
              r="4"
            />
            <text
              filter="url(#solid)"
              y={100 + tiers.length * 20}
              x={width - 110}
              textAnchor="end"
              alignmentBaseline="middle"
            >
              Increase since {keyDateLegend} tiers changes
            </text>
            <circle
              fill={convertHexToRGBA(colors[2], 30)}
              strokeWidth={1}
              cx={width - 100}
              cy={100 + tiers.length * 20}
              r="4"
            />
          </>
        )}
      </g>
    </LegendWrap>
  );
};

export default Legend;
