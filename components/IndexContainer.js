import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useMst } from "../models/Root";
import QueryForm from "./QueryForm";
import Chart from "./Chart";

const Wrapper = styled.div`
  display: grid;
  align-content: center;
  justify-items: center;
  > div {
    width: 80%;
  }
`;

const IndexContainer = () => {
  const { chartModel } = useMst();
  return (
    <Wrapper>
      <div>
        <QueryForm />
        <Chart />
      </div>
    </Wrapper>
  );
};

export default observer(IndexContainer);
