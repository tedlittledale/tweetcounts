import React from "react";
import styled from "styled-components";

const ScrollDownIconWrapper = styled("div")`
  position: relative;
  width: 100px;
  height: 100px;
  cursor: pointer;
  .chevron {
    position: absolute;
    width: 100px;
    height: 20px;
    opacity: 0;
    animation: move 3s ease-out infinite;
  }

  .chevron:first-child {
    animation: move 3s ease-out 1s infinite;
  }

  .chevron:nth-child(2) {
    animation: move 3s ease-out 2s infinite;
  }

  .chevron:before,
  .chevron:after {
    content: " ";
    position: absolute;
    top: 0;
    height: 100%;
    width: 51%;
    background: var(--color-text-default);
  }

  .chevron:before {
    left: 0;
    transform: skew(0deg, 30deg);
  }

  .chevron:after {
    right: 0;
    width: 50%;
    transform: skew(0deg, -30deg);
  }
  @keyframes move {
    25% {
      opacity: 1;
    }
    33% {
      opacity: 1;
      transform: translateY(30px);
    }
    67% {
      opacity: 1;
      transform: translateY(60px);
    }
    100% {
      opacity: 0;
      transform: translateY(90px);
    }
  }
`;

const ScrollDownIcon = ({ onClickHandler }) => {
  return (
    <>
      <ScrollDownIconWrapper onClick={onClickHandler}>
        <div className="chevron"></div>
        <div className="chevron"></div>
        <div className="chevron"></div>
      </ScrollDownIconWrapper>
    </>
  );
};

export default ScrollDownIcon;
