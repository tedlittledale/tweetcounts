import React from "react";
import styled from "styled-components";
import { withProp } from "styled-tools";

const Wrapper = styled("header")`
  height: 100vh;

  width: 100%;
  display: grid;
  grid: 1fr/ 1fr;
  align-items: center;
  justify-items: center;
  > div {
    width: 95%;
  }
`;

const Header = ({}) => {
  return (
    <>
      <Wrapper>
        <div>
          <h1>Prototype boilterplate</h1>
        </div>
      </Wrapper>
    </>
  );
};

export default Header;
