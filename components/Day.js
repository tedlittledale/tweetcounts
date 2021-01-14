import React, { useState, useContext, Children } from "react";
import styled from "styled-components";

import { format, parse } from "date-fns";
import { compose } from "ramda";
import { observer } from "mobx-react-lite";
import { withPaths } from "../utils/store";
import useIntersect from "../utils/hooks/useIntersect";
import usePrevious from "../utils/hooks/usePrevious";

import RootContext from "./RootContext";
import DayContent from "./DayContent";

const DayWrap = styled.div``;

const TrackerDiv = styled("div")`
  height: 1px;
  width: 100%;
  margin-bottom: 40px;
`;

const DayContainer = ({ date, timelineModel, children, update }) => {
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
          rootMargin: `0px 0px 0px 0px`
        })
      : useState({ isVisible: false });
  const { isVisible, intersectionRatio, isIntersecting } = entry;

  const [refEnd, entryEnd] =
    typeof window !== "undefined"
      ? useIntersect({
          root: rootElement.context,
          rootElementthreshold: [0],
          rootMargin: `0px 0px 0px 0px`
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
      <TrackerDiv ref={ref}></TrackerDiv>
      <DayContent date={date} update={update}>
        <h2>{format(parse(date, "yyyy-MM-dd", new Date()), "do MMM yyyy")}</h2>
        {children}
      </DayContent>
      <TrackerDiv ref={refEnd}></TrackerDiv>
    </DayWrap>
  );
};

export default compose(withPaths(["timelineModel"]), observer)(DayContainer);
