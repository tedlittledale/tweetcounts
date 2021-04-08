import React from "react";
import styled from "styled-components";
import { compose } from "ramda";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { withPaths } from "../utils/store";

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

const Header = ({ exampleModel }) => {
  return (
    <>
      <Wrapper>
        <div>
          <h1>{exampleModel.projectName}</h1>
        </div>
      </Wrapper>
    </>
  );
};

export default compose(withPaths(["exampleModel"]), observer)(Header);
