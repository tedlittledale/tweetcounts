import { types } from "mobx-state-tree";
import { scaleLinear, scaleLog, scaleSqrt } from "d3-scale";
import { set, add, format } from "date-fns";

import { line } from "d3-shape";
import * as d3 from "d3";

const colors = [
  "#003f5c",
  "#2f4b7c",
  "#665191",
  "#a05195",
  "#d45087",
  "#f95d6a",
  "#ff7c43",
  "#ffa600"
];

const colors_3 = ["#003f5c", "#bc5090", "#ffa600"];

export const ChartModel = types
  .model("ChartModel", {
    data: types.maybeNull(types.frozen()),
    paddingAndMargins: types.frozen({
      paddingX: 30,
      paddingRight: 100,
      marginX: 30,
      marginY: 30,
      marginTop: 30,
      chartHeight: 500
    }),
    startDate: types.maybeNull(types.string),
    endDate: types.maybeNull(types.string),
    ready: false, // means a types.boolean that defaults to false
    selectedAxes: 0 // means a types.number that defaults to 0
  })
  .actions((self) => ({
    setSelectedAxes(val) {
      self.selectedAxes = val;
    },
    processData({ data }) {
      self.data = data;
    },
    setUpScales({ width }) {
      console.log(self.data);
      if (!self.data) return;
      self.ready = false;
      let maxY, minY;
      let minX, maxX;
      const {
        paddingX,
        paddingRight,
        marginX,
        marginY,
        marginTop,
        chartHeight
      } = self.paddingAndMargins;
      console.log(self.data);
      self.data.forEach(({ queryName, result }) => {
        result.data.forEach(({ tweet_count, end }) => {
          const time = new Date(end).getTime();
          if (tweet_count > maxY || !maxY) maxY = tweet_count;
          if (tweet_count < minY || !minY) minY = tweet_count;
          if (time > maxX || !maxX) {
            self.endDate = end;
            maxX = time;
          }
          if (time < minX || !minX) {
            self.startDate = end;
            minX = time;
          }
        });
      });

      console.log({ maxY, minY, minX, maxX });
      self.scaleY = scaleSqrt()
        //.base(2)
        .domain([maxY, minY])
        .range([marginTop, chartHeight - marginY - marginTop]);
      self.scaleX = scaleLinear()
        .domain([minX, maxX])
        .range([paddingX + marginY, width - marginX - paddingX - paddingRight]);

      self.axisBottom = d3.axisBottom(self.scaleX);
      //self.axisBottom();
      self.ready = true;
    }
  }))
  .views((self) => ({
    getXAxis() {
      const ticks = [];
      let time = add(set(new Date(self.startDate), { hours: 0 }), { days: 1 });
      while (time.getTime() < new Date(self.endDate).getTime()) {
        ticks.push({
          label: format(time, "do MMM"),
          x: self.scaleX(time.getTime())
        });
        time = add(time, { days: 1 });
      }
      return ticks;
    },
    getYAxis() {
      return self.scaleY.ticks(10).map((val) => ({
        label: val,
        y: self.scaleY(val)
      }));
    },
    getCities() {
      const cities = [];
      let idx = 2;
      self.data.forEach(({ queryName }, idx) => {
        cities[idx] = {
          name: queryName,
          color: colors[idx % colors.length]
        };
        idx++;
      });

      return cities;
    },
    getPoints({ data, idx }) {
      console.log({ data, name });
      return {
        points: data
          .filter(({ end }) => {
            return new Date(end).getHours() === 0;
          })
          .map(({ tweet_count, end, start }) => ({
            y: self.scaleY(tweet_count),
            x: self.scaleX(new Date(end).getTime()),
            start,
            end,
            query: self.data[idx].query,
            label: name
          })),
        color: colors[(idx + 2) % colors.length]
      };
    },
    getLine({ data, idx }) {
      return {
        path: data
          .map(
            ({ tweet_count, end }) =>
              `${self.scaleX(new Date(end).getTime())},${self.scaleY(
                tweet_count
              )}`
          )
          .join(" "),
        color: colors[(idx + 2) % colors.length]
      };
    }
  }));
