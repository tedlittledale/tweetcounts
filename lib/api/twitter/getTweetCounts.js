// Search for Tweets within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search

const needle = require("needle");
import { lift, merge, uniqBy, concat } from "ramda";

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;

const endpointUrl = "https://api.twitter.com/2/tweets/counts/recent";

// const queries = {
//   kharhov: "(Kharkiv OR Харків OR Kharkov) -is:retweet",
//   kyiv: "(Kyiv OR Київ OR Kiev) -is:retweet",
//   //odessa: "(Odessa OR Одеса OR Odessa) -is:retweet",
//   //dnipro: "(Dnipro OR Дніпро OR Dnipro) -is:retweet",
//   zaporizhia: "(Zaporizhia OR Запоріжжя OR Zaporizhia) -is:retweet",
//   kherzon: "(Kherzon OR Кіржодзь OR Kherzon) -is:retweet",
//   //lviv: "(Lviv OR Львів OR Lviv) -is:retweet",
//   //donetsk: "(Donetsk OR Донецьк OR Donetsk) -is:retweet",
//   //kryvyi_rih: "(Kryvyi Rih OR Кривий Ріг OR Krivoy Rog) -is:retweet",
//   mykolaiv: "(Mykolaiv OR Миколаїв OR Mykolayiv) -is:retweet"
// };

const queries = {
  denazification: `((denazification) OR url:"sputniknews.com" url:"rt.com")`
};

const getCount = ({ key }) => {
  return new Promise(async (resolve, reject) => {
    const params = {
      query: queries[key]
    };
    console.log({
      headers: {
        "User-Agent": "v2RecentTweetCountsJS",
        authorization: `Bearer ${process.env.BEARER_TOKEN}`
      },
      params
    });
    const res = await needle("get", endpointUrl, params, {
      headers: {
        "User-Agent": "v2RecentTweetCountsJS",
        authorization: `Bearer ${process.env.BEARER_TOKEN}`
      }
    });

    if (res.body) {
      return resolve(res.body);
    } else {
      reject(new Error("Unsuccessful request"));
    }
  });
};

export default async function handler() {
  console.log();
  const results = {};
  await Object.keys(queries).reduce(async (memo, key) => {
    await memo;
    console.log({ key });
    const result = await getCount({ key });
    console.log({ result });
    // console.log(hardCodedResults[key]);
    // result.data = hardCodedResults[key]
    //   ? uniqBy(
    //       ({ end }) => end,
    //       concat(hardCodedResults[key].data, result.data)
    //     )
    //   : result.data;
    results[key] = result;
  }, undefined);
  return results;
}
