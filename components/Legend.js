import React from "react";
import styled from "styled-components";

import convertHexToRGBA from "../utils/hextorgba";

const colors = [
  "#006B3E",
  "#E9B949",
  "#FF8C01",
  "#ED2938",
  convertHexToRGBA("#000000", 60)
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

  text {
    color: var(--color-page-content);
    font-size: 12px;
    border: 1px solid grey;
  }
`;

const Legend = ({ tiers, width, keyDateLegend, isMobile }) => {
  const margin = isMobile ? width - 220 : width - 250;
  const marginY = 10;
  console.log({ isMobile });
  return (
    <LegendWrap>
      <filter x="0" y="0" width="1" height="1" id="solid">
        <feFlood floodColor="hsl(210, 36%, 96%)" result="bg" />
        <feMerge>
          <feMergeNode in="bg" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <g filter="url(#solid)">
        {Array(tiers[tiers.length - 1])
          .fill()
          .map((tier, idx) => (
            <>
              <text
                filter="url(#solid)"
                y={marginY}
                // x={width - margin - 10}
                x={100 + idx * 61}
                textAnchor="end"
                alignmentBaseline="middle"
              >
                {idx < 4 ? `Tier ${idx + 1}` : "Lockdown"}
              </text>
              <circle
                fill={convertHexToRGBA(colors[idx], 100)}
                strokeWidth={1}
                cx={107 + idx * 61}
                cy={marginY}
                r="4"
              />
            </>
          ))}
        {keyDateLegend && (
          <>
            <text
              filter="url(#solid)"
              y={marginY}
              x={140 + tiers.length * 61}
              textAnchor="end"
              alignmentBaseline="middle"
            >
              Previous tiers
            </text>
            <line
              x1={147 + tiers.length * 61}
              y1={marginY - 10}
              x2={147 + tiers.length * 61}
              y2={marginY + 10}
              strokeWidth={4}
              stroke={convertHexToRGBA(colors[0], 90)}
            />
            <line
              x1={147 + tiers.length * 61}
              y1={marginY + 10}
              x2={147 + tiers.length * 61}
              y2={marginY + 30}
              strokeWidth={4}
              stroke={convertHexToRGBA(colors[1], 90)}
            />
          </>
        )}
      </g>
    </LegendWrap>
  );
};

export default Legend;
