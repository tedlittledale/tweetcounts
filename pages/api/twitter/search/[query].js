// Search for Tweets within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search

var Twitter = require("twitter");
import { format, add, set } from "date-fns";
import { lift, merge, uniqBy, concat } from "ramda";

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;

const endpointUrl = "https://api.twitter.com/1.1/search/tweets.json";

const getCount = ({ client, start, end, q }) => {
  // Edit query parameters below
  // specify a search query, and any additional fields that are required
  // by default, only the Tweet ID and text fields are returned
  console.log({ q });
  const since = set(new Date(start), { hours: 0 });
  const until = add(since, { days: 1 });
  console.log(format(since, "yyyy/MM/dd"), format(until, "yyyy/MM/dd"));
  return new Promise(async (resolve, reject) => {
    client.get(
      `search/tweets.json`,
      {
        q,
        result_type: "popular",
        count: 1,
        since: format(since, "yyyy-MM-dd"),
        until: format(until, "yyyy-MM-dd")
      },
      function (error, tweet, response) {
        if (error) reject(error);

        resolve(response);
      }
    );
  });
};

export default async function handler(req, res) {
  console.log();
  const { query } = req.query;
  const parsedQuery = JSON.parse(decodeURIComponent(query));
  const results = [];
  console.log({ parsedQuery });
  const { query: q } = parsedQuery;
  console.log({ q }, q[0].query);
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
  try {
    // Make request
    const response = await getCount({
      client,
      q: q[0].query,
      ...parsedQuery
    });

    res.status(200).json({ response });
  } catch (e) {
    console.log({ e });
    res.status(200).json({ response: null });
  }
}
