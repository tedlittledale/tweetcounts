import React from "react";
import styled, { keyframes } from "styled-components";
import { prop, withProp } from "styled-tools";
/*
 * animalMap is hash of animalNames mapped to images of said animal
 * e.g. Human: 'https://heartrates.tedspace.me/static/8f0a74d0b575cd3ce699b9d4815151d1/e35b7/icons8-human2-50.png',
 */

const pulseAnimation = keyframes`
 0% {
    box-shadow: 0 0 0 0 hsla(9, 100%, 64%, 0.9);
  }
  70% {
      box-shadow: 0 0 0 20px hsla(9, 100%, 64%, 0.7);
  }
  100% {
      box-shadow: 0 0 0 0 hsla(9, 100%, 64%, 0.9);
  }
`;

const PointsWrap = styled("svg")`
  display: grid;
  grid: 1fr / 1fr;
  justify-items: center;
  position: absolute;
  height: 600px;
  width: 100%;
  top: 0;
  left: 0;
  line {
    stroke: #d8d8d8;
  }
`;

const Line = ({ data }) => {
  const { path, color } = data;

  const imageSize = 30;
  return (
    <>
      <PointsWrap>
        <polyline fill="none" stroke={color} stroke-width="2" points={path} />
      </PointsWrap>
    </>
  );
};

export default Line;
