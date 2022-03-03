import { getSession } from "@auth0/nextjs-auth0"; //
require("dotenv").config();

var Twitter = require("twitter");

let fetchTweet = ({ tweetId, client }) => {
  return new Promise((resolve, reject) => {
    client.get(
      `statuses/show.json`,
      { id: tweetId, include_card_uri: true },
      function (error, tweet, response) {
        if (error) reject(error);

        resolve(response);
      }
    );
  });
};

export default async function handler(req, res) {
  const session = await getSession(req, res);
  const { tweetId } = req.query;
  console.log({ tweetId });
  if (!session.user) {
    res.status(401).end("Unauthorized");
  }

  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  const result = await fetchTweet({ tweetId, client });
  console.log({ result });
  if (result?.body) {
    res.status(200).json({ results: result?.body });
  } else {
    res.status(500).json({ results: "Unsuccessful request" });
  }
}
