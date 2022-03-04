import React from "react";
import styled from "styled-components";
import { withProp } from "styled-tools";

const LegendWrap = styled("div")`
  display: grid;
  grid: 1fr ${withProp("items", (items) => `repeat(${items}, auto)`)} 1fr / 1fr;
  justify-items: end;
  align-items: space-around;
  position: absolute;
  right: 16px;
  top: 0;
  height: 100%;
  width: 100px;

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

const Legend = ({ cities, width, keyDateLegend, isMobile }) => {
  const margin = isMobile ? width - 220 : width - 250;
  const marginY = 10;
  console.log({ isMobile });

  return (
    <LegendWrap items={cities.length}>
      <div></div>
      <>
        {cities.map(({ name, color }, idx) => (
          <div key={idx}>
            <p>{name}</p>
            <span style={{ background: color }} />
          </div>
        ))}
      </>
      <div></div>
    </LegendWrap>
  );
};

export default Legend;
