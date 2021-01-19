import { types, onSnapshot, flow } from "mobx-state-tree";
import { scaleLinear, scaleLog } from "d3-scale";
import { format } from "d3-format";
import { AppModel } from "./appModel";
import auth from "../utils/auth";
import { sizes } from "../utils/media";
import { propEq, sort, uniq, findIndex } from "ramda";

const DataLine = types.model("DataLine", {
  areaName: types.string,
  day: types.string,
  tier: types.number,
  cases: types.number,
  cases_07da: types.number,
  cases_today: types.number,
  rank: 0
});

export const CovidChart = types
  .model("CovidChart", {
    data: types.array(DataLine),
    minY: 0,
    maxY: types.maybeNull(types.number),
    minX: 0,
    maxX: types.maybeNull(types.number),
    width: types.maybeNull(types.number),
    height: types.maybeNull(types.number),
    isMobile: types.maybeNull(types.boolean),
    tiers: types.maybeNull(types.array(types.number)),
    englandTotal: types.maybeNull(types.number),
    annotation: types.maybeNull(types.string),
    state: "init"
  })
  .actions((self) => ({
    setAnnotation: (annotation) => {
      self.annotation = annotation;
    },
    setData: (data) => {
      if (!data || data.length === 0) {
        return;
      }
      const allTiers = [];
      let total = 0;
      const sortedData = sort(
        ({ cases_07da: a, tier: c }, { cases_07da: b, tier: d }) => {
          return a < b ? -1 : 1;
        },
        data
      ).sort(({ cases_07da: a, tier: c }, { cases_07da: b, tier: d }) => {
        return c < d ? -1 : 1;
      }, data);
      const alphabeticData = sort(({ areaName: a }, { areaName: b }) => {
        return a < b ? -1 : 1;
      }, data);
      const rankedData = alphabeticData.map(
        ({ areaName, tier, cases_today, ...rest }) => {
          tier && allTiers.push(tier);
          total += cases_today;
          const rank = findIndex(propEq("areaName", areaName), sortedData);
          return {
            rank,
            cases_today,
            areaName,
            tier,
            ...rest
          };
        }
      );
      self.englandTotal = total;
      self.tiers = uniq(allTiers).sort((a, b) => (a > b ? 1 : -1));
      self.data = rankedData;
      self.setUpScales({ width: self.width });
    },
    setUpScales({ width, height }) {
      if (!width) {
        return;
      }
      const isMobile = width < sizes.phablet;
      console.log({ isMobile });
      self.isMobile = isMobile;
      self.width = width;
      let maxY = 1463, //hard code for performance as data is static
        minY = 0,
        maxX = 0,
        minX = 0;
      const paddingX = isMobile ? 20 : 30;
      const paddingXLeft = isMobile ? 30 : 60;
      const paddingRight = 50;
      const marginX = isMobile ? 10 : 20; //right margin
      const marginY = isMobile ? 30 : 30;
      const marginTop = isMobile ? 0 : 0;
      const chartHeight = height
        ? Math.round(isMobile ? (height * 2) / 3 : height - 100)
        : self.height;
      self.height = chartHeight;
      // self.allData.forEach(({ cases_07da }) => {
      //   maxY = Math.max(maxY, parseInt(cases_07da, 10));
      // });

      maxX = self.data.length;
      self.yScale = scaleLinear()
        .domain([maxY, minY])
        //.nice(5)
        .range([marginTop, chartHeight - marginY - marginTop]);
      self.xScale = scaleLinear()
        .domain([minX, maxX])
        .range([paddingXLeft + marginY, width - marginX - paddingX]);
      //   self.xScale = scaleLog()
      //     .base(2)
      //     .domain([minWeight, maxWeight])
      //     .range([paddingX + marginY, width - marginX - paddingX - paddingRight]);
      self.maxY = maxY;
      self.maxX = maxX;
      self.state = "ready";
    }
  }))
  .views((self) => ({
    yAxis() {
      return self.yScale.ticks(5).map((val) => ({
        label: val,
        y: self.yScale(val)
      }));
    },
    xAxis() {
      const f = format(",.2r");
      const f2 = format(",.2s");
      return [10, 20, 30, 40, 50, 50, 70, 80, 90, 100, 110, 120].map((val) => ({
        label: val,
        x: self.xScale(val)
      }));
    },
    getLines(chartData) {
      const sortedData = sort(({ cases_07da: a }, { cases_07da: b }) => {
        return a < b ? -1 : 1;
      }, chartData);
      return sortedData
        .map(
          ({ cases_07da }, idx) =>
            `${self.xScale(idx)}, ${self.yScale(cases_07da)}`
        )
        .join(" ");
    },
    getGhostPoints(chartData) {
      const alphabeticData = sort(({ areaName: a }, { areaName: b }) => {
        return a < b ? -1 : 1;
      }, chartData);
      return alphabeticData.map(
        ({ cases_07da, areaName, tier, rank }, idx) => ({
          y: self.yScale(cases_07da),
          x: self.xScale(self.data[idx].rank),
          tier: tier,
          label: areaName,
          rank: idx
        })
      );
    },
    points() {
      const median = (arr) => {
        const mid = Math.floor(arr.length / 2),
          nums = [...arr].sort((a, b) => a - b);
        return arr.length % 2 !== 0
          ? nums[mid]
          : (nums[mid - 1] + nums[mid]) / 2;
      };
      const tier3 = [];
      self.data.map(({ cases_07da, areaName, tier, rank }, idx) => {
        if (tier === 3) {
          tier3.push(cases_07da);
        }
      });
      console.log(median(tier3));
      return self.data.map(({ cases_07da, areaName, tier, rank }, idx) => ({
        y: self.yScale(cases_07da),
        x: self.xScale(rank),
        tier: tier,
        label: areaName,
        rank
      }));
    }
  }));
