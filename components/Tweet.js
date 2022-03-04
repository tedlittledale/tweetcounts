import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import Tweet from "@twitter/feather-component-tweet-react";
import { VideoCard } from "@twitter/feather-component-card-react";
import { WebsiteCard } from "@twitter/feather-component-card-react";
import TweetVideo from "./TweetVideo";

const TweetContainer = styled.div`
  .Tweet--iphone .Tweet-photoContainer {
    height: auto;
    padding: 0;
  }
  .Tweet.Tweet .Tweet-quoteTweet .Tweet-photoContainer {
    padding-bottom: 0;
  }
  .Tweet-text a {
    color: var(--tw-color-blue-deep);
  }
  &:last-child .Tweet {
    &.Tweet--timeline {
      &:before {
        display: none;
      }
    }
  }
`;

const TweetWrapper = ({
  text,
  time,
  displayType = "timeline",
  platform = "iphone",
  likeCount = "0",
  replyCount = "0",
  card,
  photo,
  photos,
  videos,
  retweetCount = "0",
  user,
  quoteTweetText,
  quoteTweet,
  isReply,
  tweetId,
  cardWebsiteUrl,
  cardTitle,
  cardImageUrl,
  cardRequestUrl,
  existingQuoteTweetObj,
  existingQuoteTweetUrl,
  showReadOnlyActions = true,
  onClick = () => {}
}) => {
  const tweetRef = useRef(null);
  const videoRef = useRef(null);
  const tweetContainerRef = useRef(null);
  useEffect(() => {
    if (videos?.[0]) {
      ReactDOM.render(
        <TweetVideo videoUrl={videos?.[0].videoUrl} />,
        tweetContainerRef.current.querySelector(".Tweet-photoGallery")
      );
    }
  }, [videos]);
  const quoteTweetObj = quoteTweet
    ? {
        user,
        formattedDetailTimestamp: format(
          new Date(parseInt(time)),
          "h:mm aa · d/LL/yyy"
        ),
        permalink: "https://twitter.com/",
        formattedTimestamp: format(new Date(parseInt(time)), "d/LL/yyyy"),
        text: quoteTweet.text,
        photos: quoteTweet.images
          ? quoteTweet.images.map((base64Image) => ({
              imageUrl: base64Image
            }))
          : []
      }
    : existingQuoteTweetObj
    ? JSON.parse(existingQuoteTweetObj)
    : null;
  return (
    <TweetContainer ref={tweetContainerRef}>
      <Tweet
        ref={tweetRef}
        onClick={onClick}
        photo={photo}
        card={
          cardWebsiteUrl && cardTitle ? (
            <WebsiteCard
              displayType="timeline"
              displayUrl={new URL(cardWebsiteUrl).hostname}
              imageUrl={cardImageUrl}
              platform={platform}
              title={cardTitle}
              websiteUrl={cardWebsiteUrl}
            />
          ) : null
        }
        photos={photos}
        videos={videos}
        permalink="https://twitter.com/"
        quoteTweet={quoteTweetObj}
        replyContext={
          isReply && {
            inReplyToScreenName: user.screenName
          }
        }
        showReadOnlyActions={showReadOnlyActions}
        text={
          cardWebsiteUrl
            ? text.replace(cardRequestUrl, "")
            : existingQuoteTweetUrl
            ? text.replace(existingQuoteTweetUrl, "")
            : text
        }
        displayType={displayType}
        formattedDetailTimestamp={format(
          new Date(parseInt(time)),
          "h:mm aa · d/LL/yyy"
        )}
        formattedTimestamp={""}
        likeCount={likeCount}
        permalink="https://twitter.com"
        platform={platform}
        replyCount={replyCount}
        retweetCount={retweetCount}
        user={user}
      />
    </TweetContainer>
  );
};

export default TweetWrapper;
