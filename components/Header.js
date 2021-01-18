import React, { useRef } from "react";
import styled from "styled-components";
import { media } from "../utils/media";

const Wrapper = styled("header")`
  height: 100vh;
  width: 100%;
  display: grid;
  grid: 1fr / 1fr;
  align-items: center;
  justify-items: center;
  border-bottom: 1px solid var(--color-faint);
  div {
    width: 70%;
  }
  h1 {
    font-size: 90px;
    ${media.phablet`font-size: 40px;`}
    ${media.phone`font-size: 40px;`}
  }
  p {
    font-size: 30px;
    ${media.phablet`font-size: 20px;`}
    ${media.phone`font-size: 20px;`}
  }
`;

const Intro = styled("div")`
  display: grid;
  grid: 1fr / 1fr;
  align-items: center;
  justify-items: center;
  border-bottom: 1px solid var(--color-faint);
  background: hsl(209, 61%, 16%);
  position: relative;
  z-index: 1000000000000;
  div {
    width: 70%;
    padding: 30px 0;
  }
  p {
    font-size: 18px;
    margin: 20px 0;
    color: white;
    ${media.phablet`font-size: 20px;`}
    ${media.phone`font-size: 20px;`}
  }
`;

const TimeLine = () => {
  return (
    <>
      <Wrapper className="wrapper">
        <div>
          <h1>Tracks of our tiers</h1>
          <p>
            Visualising the relationship between covid cases and local
            restriction tiers in the lead up to the January 2021 lockdown.
          </p>
        </div>
      </Wrapper>
      <Intro>
        <div>
          <p>
            On the 2nd December after the end of the second national lockdown
            English regions were placed into three Tiers depending on how badly
            each area was affected by Covid 19.
          </p>
          <p>
            This visualisation explores how the cases rates changed between the
            second lockdown ending and the third lockdown begining. Patterns
            emerge which appear to show how being placed in a lower tier at the
            start of this period resulted in a case rates rising faster than in
            regions under striceter conditions.
          </p>
          <p>
            It's worth noting that the government used several criteria, not
            just case rates to decide the tiers.
          </p>
        </div>
      </Intro>
    </>
  );
};

export default TimeLine;
