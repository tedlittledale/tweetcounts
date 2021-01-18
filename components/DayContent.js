import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { withProp } from "styled-tools";
import { compose } from "ramda";
import { observer } from "mobx-react-lite";
import { withPaths } from "../utils/store";

const Wrapper = styled("div")`
  padding: 0 0 0 30px;
  border-bottom: 1px solid var(--color-faint);

  border-top: 1px solid var(--color-faint);
  height: 100px;
  border-radius: 0;
  display: grid;
  align-content: center;

  p {
    box-sizing: border-box;
    margin: 0;

    display: none;
  }
  h2 {
    font-size: 30px;
  }

  color: var(--color-page-content-faded);
  transition: color 500ms ease;
  &.currentDate {
    color: var(--color-page-content);
    background: var(--color-faint);
    ${withProp(
      "update",
      (update) =>
        update &&
        `animation-name: highlightFlash;
        animation-duration: 2s;
        h3,li{
          color: var(--color-font-highlight);
        }`
    )};
  }
`;

const DayContent = ({
  children,
  date,
  timelineModel,
  currentChart,
  update
}) => {
  const contentRef = useRef();
  useEffect(() => {
    if (timelineModel.currentDate === date) {
      const content = contentRef.current.getElementsByTagName("p")[0];
      console.log({ content });
      currentChart.setAnnotation(content ? content.innerHTML : null);
    }
  }, [timelineModel.currentDate]);
  return (
    <Wrapper
      className="wrapper"
      update={update}
      className={date === timelineModel.currentDate ? `currentDate` : ``}
      ref={contentRef}
    >
      {children}
    </Wrapper>
  );
};

export default compose(
  withPaths(["timelineModel", "timelineModel.currentChart"]),
  observer
)(DayContent);
