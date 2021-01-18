import React, { useRef } from "react";
import styled from "styled-components";
import { media } from "../utils/media";

const Wrapper = styled("header")`
  display: grid;
  grid: 1fr / 1fr;
  align-items: center;
  justify-items: center;
  border-top: 1px solid var(--color-faint);
  margin-top: 80px;
  padding: 50px 0 100px;
  background: hsl(209, 61%, 16%);
  > * {
    color: white;
  }
  div {
    width: 70%;
  }
  h2 {
    font-size: 40px;
    ${media.phablet`font-size: 40px;`}
    ${media.phone`font-size: 40px;`}
  }
  p {
    font-size: 20px;
    ${media.phablet`font-size: 20px;`}
    ${media.phone`font-size: 20px;`}
  }
`;

const Sources = () => {
  return (
    <Wrapper className="wrapper">
      <div>
        <h2>Sources</h2>
        <p>
          Visualising the relationship between covid cases and local restriction
          tiers in the lead up to the January 2021 lockdown.
        </p>
      </div>
    </Wrapper>
  );
};

export default Sources;
