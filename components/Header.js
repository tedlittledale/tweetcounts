import React, { useRef } from "react";
import styled from "styled-components";

const Wrapper = styled("header")`
  height: 100vh;
  width: 100%;
  display: grid;
  grid: 1fr / 1fr;
  align-items: center;
  justify-items: center;
  div {
    width: 70%;
  }
  h1 {
    font-size: 90px;
  }
  p {
    font-size: 30px;
  }
`;

const TimeLine = () => {
  return (
    <Wrapper className="wrapper">
      <div>
        <h1>Tracks of our tiers</h1>
        <p>
          Visualising the relationship between covid cases and local restriction
          tiers in the lead up to the January 2021 lockdown.
        </p>
      </div>
    </Wrapper>
  );
};

export default TimeLine;
