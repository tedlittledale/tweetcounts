import needle from "needle";

export default async function handler(req, res) {
  const token = process.env.BEARER_TOKEN;
  const { query } = req.query;
  console.log({ query });
  const params = {
    usernames: query, // Edit usernames to look up
    "user.fields": "created_at,description", // Edit optional query parameters here
    expansions: "pinned_tweet_id",
  };

  // this is the HTTP header that adds bearer token authentication
  const result = await needle(
    "get",
    `https://api.twitter.com/2/users/by?usernames=$`,
    params,
    {
      headers: {
        "User-Agent": "v2UserLookupJS",
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (result.body) {
    console.log(result.body?.data);
    res.status(200).json({ data: result.body?.data });
  } else {
    res.status(500).json({ data: "Unsuccessful request" });
  }
}
