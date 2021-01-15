import { useMemo } from "react";
import { types, applySnapshot } from "mobx-state-tree";
import { TimelineModel } from "./models/timelineModel";
import cases from "./models/cases";

let store;

const Store = types
  .model({
    timelineModel: TimelineModel,
    light: false
  })
  .actions((self) => {
    let timer;
    function start() {}

    function update() {}

    function stop() {}

    return { start, stop, update };
  });

export function initializeStore(snapshot = null) {
  const _store =
    store ??
    Store.create({
      timelineModel: {
        allData: cases,
        keyDates: [
          "2021-01-05",
          "2020-12-31",
          "2020-12-26",
          "2020-12-20",
          "2020-12-19",
          "2020-12-16",
          "2020-12-02"
        ],
        currentChart: { data: [], allData: cases }
      }
    });

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (snapshot) {
    applySnapshot(_store, snapshot);
  }
  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return store;
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
