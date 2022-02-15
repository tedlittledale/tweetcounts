import React from "react";
import styled from "styled-components";
import { compose } from "ramda";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { useMst } from "../models/Root";

enableStaticRendering(true);

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

const Header = observer(() => {
  const { numbersModel } = useMst();
  return (
    <>
      <Wrapper>
        <div>
          <h1>{numbersModel.projectName}</h1>
        </div>
      </Wrapper>
    </>
  );
});

export default Header;
