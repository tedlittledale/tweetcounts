import React, { useState, useContext, Children } from "react";
import styled from "styled-components";
import { withProp } from "styled-tools";
import { format, parse } from "date-fns";
import { compose, path } from "ramda";
import { observer } from "mobx-react-lite";
import { withPaths } from "../utils/store";
import useIntersect from "../utils/hooks/useIntersect";
import usePrevious from "../utils/hooks/usePrevious";
import { media } from "../utils/media";

import RootContext from "./RootContext";
import DayContent from "./DayContent";

const DayWrap = styled.div`
  > div {
  }
`;

const TrackerDiv = styled("div")`
  margin-top: -100px;
  height: 1px;
  width: 100%;
  margin-bottom: 130px;

  ${media.phablet`${withProp(
    "height",
    (height) => `margin-bottom: ${height}px;margin-top: -${height}px;`
  )}`}
  ${media.phone`margin-bottom:85vh;margin-top: -80vh;`} /* background: red;
  &.green {
    background: green;
  } */
`;

const DayContainer = ({
  date,
  timelineModel,
  currentChart: { height },
  children,
  update
}) => {
  const rootElement = useContext(RootContext);

  const prevPosition = usePrevious(
    typeof window !== "undefined" ? window.pageYOffset : 0
  );

  const scrollDirection =
    typeof window !== "undefined" && window.pageYOffset < prevPosition
      ? "up"
      : "down";

  //console.log({ rootElement });
  const [ref, entry] =
    typeof window !== "undefined"
      ? useIntersect({
          root: rootElement.context,
          rootElementthreshold: [0],
          rootMargin: `0px`
        })
      : useState({ isVisible: false });
  const { isVisible, intersectionRatio, isIntersecting } = entry;

  const [refEnd, entryEnd] =
    typeof window !== "undefined"
      ? useIntersect({
          root: rootElement.context,
          rootElementthreshold: [0],
          rootMargin: `0px`
        })
      : useState({ isVisible: false });
  const {
    isVisible: isVisibleEnd,
    intersectionRatio: intersectionRatioEnd,
    isIntersecting: isIntersectingEnd
  } = entryEnd;

  const isAbove =
    entry.boundingClientRect && entry.boundingClientRect.y < entry.rootBounds.y;

  if (
    (isIntersectingEnd &&
      intersectionRatioEnd === 0 &&
      isAbove &&
      scrollDirection === "up") ||
    (!isIntersecting && intersectionRatio === 0 && isAbove)
  ) {
    timelineModel.updateDate(date);
  }
  return (
    <DayWrap className={`date_${date}`}>
      <div>
        <TrackerDiv height={height} ref={ref}></TrackerDiv>
        <DayContent date={date} update={update}>
          <h2>
            {format(parse(date, "yyyy-MM-dd", new Date()), "do MMM yyyy")}
          </h2>
          {children}
        </DayContent>
        <TrackerDiv height={height} ref={refEnd} className="green"></TrackerDiv>
      </div>
    </DayWrap>
  );
};

export default compose(
  withPaths(["timelineModel", "timelineModel.currentChart"]),
  observer
)(DayContainer);
