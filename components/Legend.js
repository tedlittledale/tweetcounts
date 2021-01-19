import React from "react";
import styled from "styled-components";
import { withProp } from "styled-tools";

import convertHexToRGBA from "../utils/hextorgba";

const colors = ["#006B3E", "#E9B949", "#FF8C01", "#ED2938", "#990000"];

const LegendWrap = styled("div")`
  display: grid;
  grid: 1fr / 1fr ${withProp("items", (items) => `repeat(${items}, auto)`)} 1fr;
  justify-items: center;
  position: relative;
  height: 30px;
  width: 100%;
  top: 0;
  left: 0;
  background: var(--color-selection-background);
  > div {
    display: grid;
    grid: 1fr / 1fr 8px;
    align-items: center;
    padding: 0 15px 0 0;
  }
  p {
    color: var(--color-page-content);
    font-size: 12px;
  }
  span {
    display: block;
    border-radius: 4px;
    width: 8px;
    height: 8px;
    margin: 0 5px;
  }
`;

const Legend = ({ tiers, width, keyDateLegend, isMobile }) => {
  const margin = isMobile ? width - 220 : width - 250;
  const marginY = 10;
  console.log({ isMobile });
  const tierArray = Array(tiers[tiers.length - 1]).fill();
  return (
    <LegendWrap items={tierArray.length}>
      <div></div>
      <>
        {tierArray.map((tier, idx) => (
          <div key={idx}>
            <p>{idx < 4 ? `Tier ${idx + 1}` : "Lockdown"}</p>
            <span style={{ background: convertHexToRGBA(colors[idx], 100) }} />
          </div>
        ))}
      </>
      <div></div>
    </LegendWrap>
  );
};

export default Legend;
