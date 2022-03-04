import React, { useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { prop, withProp } from "styled-tools";
// import Tweet from "./Tweet";
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
  circle {
    cursor: pointer;
  }
`;

const Blinker = styled.div`
  position: absolute;
  top: ${prop("top")}px;
  left: ${prop("left")}px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  animation: ${pulseAnimation}
    ${withProp(["duration"], (duration) => `${duration}ms`)} linear infinite;
`;

const TweetPreviewContainer = styled.div`
  position: absolute;
  width: 400px;
  display: ${({ hide }) => (hide ? "none" : "block")};
  z-index: 100;
  background: rgba(255, 255, 255, 0.8);
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--spacing-4);
  margin: var(--spacing-3);
`;

const TweetPreview = ({
  data,
  currentThread,
  setPopperElement,
  hoveredTweet,
  user,
  ...rest
}) => {
  const {
    id: tweetId,

    quoteTweetText,
    videos,
    ...restTweetData
  } = data || {};
  return (
    <TweetPreviewContainer
      // ref={setPopperElement}
      {...rest}
      hide={!data}
    >
      {data && (
        <Tweet
          tweetId={tweetId}
          onClick={(e) => {
            e.preventDefault();
          }}
          photos={
            data.images
              ? data.images.map((base64Image) => ({
                  imageUrl: base64Image
                }))
              : []
          }
          text={data.text || ""}
          time="1631539864985"
          {...{
            quoteTweetText,
            videos,
            ...restTweetData
          }}
        />
      )}
    </TweetPreviewContainer>
  );
};

const Points = ({ data = [] }) => {
  const [fetching, setFetching] = useState(false);
  const [tweetData, setTweetData] = useState(null);
  const [startEnd, setStartEnd] = useState({});
  const [query, setQuery] = useState(null);
  const imageSize = 30;
  useMemo(() => {
    const fetchData = async ({ start, end }) => {
      if (!start || !end) return;
      setFetching(true);
      const response = await fetch(
        `/api/twitter/search/${encodeURIComponent(
          JSON.stringify({ start, end, query })
        )}`
      );
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      console.log({ data });
      const body = JSON.parse(data.response.body);
      console.log({ body });
      setTweetData(body.statuses[0]);
      setFetching(false);
    };
    const { start, end } = startEnd;
    fetchData({ start, end });
  }, [startEnd]);
  return (
    <>
      <PointsWrap>
        {data?.points.map(({ x, y, start, end, query, label, pulse }, i) => (
          <g key={i}>
            <g>
              <circle
                onMouseEnter={() => {
                  console.log({ start, end });
                  setQuery(query);
                  setStartEnd({ start, end });
                }}
                fill={data.color}
                stroke={"black"}
                strokeWidth={1}
                cx={x}
                cy={y}
                r={3}
              ></circle>
            </g>
          </g>
        ))}
      </PointsWrap>
      <div>
        <TweetPreview
          // style={styles.popper}
          // {...attributes.popper}
          // setPopperElement={setPopperElement}
          data={tweetData}
          hoveredTweet={tweetData}
        />
      </div>
    </>
  );
};

export default Points;
