import React, { useRef } from "react";
import styled from "styled-components";
import { withProp } from "styled-tools";
import { compose } from "ramda";
import { observer } from "mobx-react-lite";
import { withPaths } from "../utils/store";

const Wrapper = styled("header")`
  padding: 0 20px;
  min-height: 200px;
  border-radius: 5px;
  p {
    box-sizing: border-box;
    margin: 0;

    height: 200px;
  }
  h2 {
    font-size: 30px;
  }

  color: var(--color-page-content-faded);
  transition: color 500ms ease;
  &.currentDate {
    color: var(--color-page-content);
    ${withProp(
      "update",
      (update) =>
        update &&
        `animation-name: highlightFlash;
        animation-duration: 2s;
        h3,li{
          color: var(--color-font-highlight);
        }`
    )}
  }
`;

const DayContent = ({ children, date, timelineModel, update }) => {
  return (
    <Wrapper
      className="wrapper"
      update={update}
      className={date === timelineModel.currentDate ? `currentDate` : ``}
    >
      {children}
    </Wrapper>
  );
};

export default compose(withPaths(["timelineModel"]), observer)(DayContent);
