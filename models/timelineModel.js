import { types, onSnapshot, flow, getSnapshot } from "mobx-state-tree";
import { find, findLast, propEq, filter } from "ramda";
import { differenceInDays, parse } from "date-fns";

import { CovidChart } from "./covidChart";
import auth from "../utils/auth";

const DataLine = types.model("DataLine", {
  areaName: types.string,
  day: types.string,
  tier: types.number,
  cases: types.number,
  cases_today: types.number,
  cases_07da: types.number
});
export const TimelineModel = types
  .model("TimelineModel", {
    currentDate: types.maybeNull(types.string),
    allData: types.array(DataLine),
    keyDates: types.array(types.string),
    keyDatesArray: types.map(types.array(DataLine)),
    currentChart: CovidChart
  })
  .actions((self) => ({
    afterCreate() {
      self.currentDate = "2020-12-02";
      self.setCurrentChart();
      self.keyDates.map((date) => {
        const chartData = filter(
          ({ day }) => day === date,
          self.allData.toJSON()
        );
        self.keyDatesArray.set(date, chartData);
      });
    },
    setCases: (cases) => {
      self.allData = cases;
      self.keyDates.map((date) => {
        const chartData = filter(
          ({ day }) => day === date,
          self.allData.toJSON()
        );
        self.keyDatesArray.set(date, chartData);
      });
    },
    getKeyChart() {
      console.log(self.keyDates.toJSON(), self.currentDate);
      const past = filter(
        (keyDate) =>
          differenceInDays(
            parse(self.currentDate, "yyyy-MM-dd", new Date()),
            parse(keyDate, "yyyy-MM-dd", new Date())
          ) >= 0,
        self.keyDates
      );
      console.log({ past });
      return past ? past.map((date) => self.keyDatesArray.get(date)) : [];
    },
    getKeyChartLegend() {
      const last = find(
        (keyDate) =>
          differenceInDays(
            parse(self.currentDate, "yyyy-MM-dd", new Date()),
            parse(keyDate, "yyyy-MM-dd", new Date())
          ) >= 0,
        self.keyDates
      );
      return last ? last : null;
    },
    updateDate(date) {
      if (typeof self.timeoutId === "number") {
        clearTimeout(self.timeoutId);
      }
      self.timeoutId = setTimeout(() => {
        self.setDate(date);
      }, 100);
    },
    setDate(date) {
      self.currentDate = date;
      self.setCurrentChart();
    },
    setCurrentChart: () => {
      const currentDate = self.currentDate;
      const currentChartData = filter(
        ({ day }) => day === currentDate,
        self.allData
      );
      console.log({ currentChartData });
      self.currentChart.setData(currentChartData.map((data) => data.toJSON()));
    }
  }))
  .views((self) => {
    return {
      getNodeById: (id) => {
        return find(propEq("id", id), self.allNodes);
      }
    };
  });
