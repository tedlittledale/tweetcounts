import React, { useRef } from "react";
import styled from "styled-components";
import { media } from "../utils/media";

const Wrapper = styled("header")`
  display: grid;
  grid: 1fr / 1fr;
  align-items: center;
  justify-items: center;
  border-top: 1px solid var(--color-faint);
  margin-top: 120px;
  padding: 50px 0 100px;
  background: hsl(209, 61%, 16%);
  > * {
    color: white;
  }
  a {
    color: hsl(212, 33%, 89%);
    text-decoration: underline;
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
        <h2>About</h2>
        <p>
          The case rate and tier data was pulled directly from the{" "}
          <a
            href="https://coronavirus.data.gov.uk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            UK Government coronavirus dashboard
          </a>
          .
        </p>
        <p>
          The chart design was inspired by the{" "}
          <a
            href="https://twitter.com/carlbaker/status/1319635045787774976"
            target="_blank"
            rel="noopener noreferrer"
          >
            Carl Baker's original design
          </a>{" "}
          and{" "}
          <a
            href="https://twitter.com/jburnmurdoch/status/1331951138225188865"
            target="_blank"
            rel="noopener noreferrer"
          >
            John Burn-Murdoch's later iterations
          </a>
          .
        </p>
        <p>
          Thanks to{" "}
          <a
            href="https://www.linkedin.com/in/elaine-cowen-51b07725/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Elaine Cowen
          </a>{" "}
          for lending her analytical mind and extracting some key insights from
          the data.
        </p>
      </div>
    </Wrapper>
  );
};

export default Sources;
