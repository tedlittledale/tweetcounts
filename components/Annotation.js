import React from "react";
import styled from "styled-components";
import { withProp } from "styled-tools";
import { media } from "../utils/media";

import convertHexToRGBA from "../utils/hextorgba";
import FadeIn from "../utils/FadeIn";

const colors = [
  "#006B3E",
  "#E9B949",
  "#FF8C01",
  "#ED2938",
  convertHexToRGBA("#000000", 60)
];

const AnnotationWrap = styled("div")`
  display: inline-grid;
  grid: 1fr / 1fr;
  justify-items: center;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 10000000000;
  div {
    background: var(--color-faint-transparent);
    height: 100%;
    width: ${withProp("width", (width) => Math.max(width / 2, 240))}px;
    padding: 20px;
    ${media.phablet`padding: 14px;`}
    ${media.phone`padding: 14px;`}
  }

  p {
    color: var(--color-page-content);
    font-size: 16px;
    ${media.phablet`font-size: 14px;`}
    ${media.phone`font-size: 14px;`}
  }
`;

const Annotation = ({ content, width }) => {
  return (
    <AnnotationWrap width={width}>
      <FadeIn>
        <p>{content}</p>
      </FadeIn>
    </AnnotationWrap>
  );
};

export default Annotation;
