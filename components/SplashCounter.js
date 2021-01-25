import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withProp } from "styled-tools";
import { compose, path } from "ramda";
import { observer } from "mobx-react-lite";
import { withPaths } from "../utils/store";
import { media } from "../utils/media";

const SplashWrapper = styled("div")`
  height: 100%;
  display: grid;
  grid: 3fr 1fr 1fr / 1fr;
  align-items: center;
  justify-items: center;
  > * {
    width: 80%;
  }
  h1 {
    font-size: 50px;
    font-style: italic;
    font-weight: 800;
    display: grid;
    grid: auto 1fr / 1fr;
    display: grid;
    justify-content: center;
    text-align: center;
  }
  span {
    font-size: 120px;
    display: grid;
    justify-content: center;
  }
  p {
    font-size: 25px;
    font-family: var(--font-heading-stack);
  }
  ${media.phablet`
  h1 {
    font-size: 40px;
  }
  p {
    font-size: 20px;
  }
  `}
`;

const SplashCounter = ({ daysToHerd }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // exit early when we reach 0
    if (timeLeft === daysToHerd) return;

    // save intervalId to clear the interval when the
    // component re-renders

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft + 1);
    }, 10);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [timeLeft]);
  return (
    <>
      <SplashWrapper>
        <h1>
          Days* till new new normal**: <span>{timeLeft}</span>{" "}
        </h1>
        <p>
          *Based on 7 day average of daily vaccinations and many assumputions
        </p>
        <p>**Whatever this means</p>
      </SplashWrapper>
    </>
  );
};

export default SplashCounter;
