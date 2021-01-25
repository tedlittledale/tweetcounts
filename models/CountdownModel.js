import { types, onSnapshot, flow, getSnapshot } from "mobx-state-tree";
import numeral from "numeral";
import { compose, concat } from "ramda";
import { parse, addDays, format, getDayOfYear } from "date-fns/fp";

const DataLine = types.model("DataLine", {
  date: types.string,
  newPeopleVaccinatedFirstDoseByPublishDate: types.maybeNull(types.number),
  newPeopleVaccinatedSecondDoseByPublishDate: types.maybeNull(types.number),
  cumPeopleVaccinatedFirstDoseByPublishDate: types.number,
  cumPeopleVaccinatedSecondDoseByPublishDate: types.number
});
const Marker = types.model("DataLine", {
  date: types.string,
  label: types.string,
  percentOfYear: types.number
});
export const CountdownModel = types
  .model("TimelineModel", {
    allData: types.array(DataLine),
    sevenDayAverage: types.maybeNull(types.number),
    markers: types.array(Marker),
    daysToHerd: types.maybeNull(types.number),
    currentPage: 0
  })
  .actions((self) => ({
    processData(data) {
      if (data.length === 0) {
        return;
      }
      console.log({ data });
      let latestTotal,
        latestTotal2ndDose,
        lastUpdated,
        sevenDayValues = 0,
        sevenDayValues2ndDose = 0;

      const UKPop = 67886011;
      const ninetyPercentPop = Math.round(UKPop * 0.9);
      const eightyPercentPop = Math.round(UKPop * 0.8);

      const cleanData = data.map(
        (
          {
            date,
            newPeopleVaccinatedFirstDoseByPublishDate,
            newPeopleVaccinatedSecondDoseByPublishDate,
            cumPeopleVaccinatedFirstDoseByPublishDate,
            cumPeopleVaccinatedSecondDoseByPublishDate
          },
          idx
        ) => {
          if (idx === 0) {
            latestTotal = cumPeopleVaccinatedFirstDoseByPublishDate;
            latestTotal2ndDose = cumPeopleVaccinatedSecondDoseByPublishDate;
            lastUpdated = parse(new Date(), "yyyy-MM-dd", date);
          }
          if (idx <= 6) {
            sevenDayValues += newPeopleVaccinatedFirstDoseByPublishDate;
            sevenDayValues2ndDose += newPeopleVaccinatedSecondDoseByPublishDate;
          }
          return {
            date,
            newPeopleVaccinatedFirstDoseByPublishDate,
            newPeopleVaccinatedSecondDoseByPublishDate,
            cumPeopleVaccinatedFirstDoseByPublishDate,
            cumPeopleVaccinatedSecondDoseByPublishDate
          };
        }
      );

      const sevenDayAverage = Math.round(sevenDayValues / 7);
      const sevenDayAverage2ndDose = Math.round(sevenDayValues2ndDose / 7);
      console.log({ sevenDayAverage, sevenDayAverage2ndDose });
      const getTargetDate = ({ targetPop, latestTotal, average }) => {
        const remaining = targetPop - latestTotal;
        const daysToTarget = Math.ceil(remaining / average);
        console.log({ targetPop, latestTotal, remaining, daysToTarget });
        const addDay = compose(addDays(daysToTarget));
        return {
          date: addDay(lastUpdated),
          days: daysToTarget
        };
      };

      const { date: herdDate, days: daysToHerd } = getTargetDate({
        targetPop: ninetyPercentPop,
        latestTotal,
        average: sevenDayAverage
      });
      const { date: nightyPercent2ndDoseDate } = getTargetDate({
        targetPop: ninetyPercentPop,
        latestTotal: latestTotal2ndDose,
        average: sevenDayAverage2ndDose
      });
      const { date: eightyPercentDate } = getTargetDate({
        targetPop: eightyPercentPop,
        latestTotal,
        average: sevenDayAverage
      });
      console.log({ nightyPercent2ndDoseDate });

      self.allData = data;
      self.daysToHerd = daysToHerd;
      self.sevenDayAverage = sevenDayAverage;
      console.log({ lastUpdated });
      self.markers = [
        {
          date: format("dd.MM.yyyy", lastUpdated),
          label: `Latest update - ${numeral(latestTotal).format(
            "0.0a"
          )} people have 1st dose`,
          percentOfYear:
            Math.round(1000 * (getDayOfYear(lastUpdated) / 365)) / 1000
        },
        {
          date: format("dd.MM.yyyy", herdDate),
          label: `90% of population will have first dose`,
          percentOfYear:
            Math.round(1000 * (getDayOfYear(herdDate) / 365)) / 1000
        },
        {
          date: format("dd.MM.yyyy", eightyPercentDate),
          label: `80% of population will have first dose`,
          percentOfYear:
            Math.round(1000 * (getDayOfYear(eightyPercentDate) / 365)) / 1000
        }
      ];
    },
    setPage(newPage) {
      console.log({ newPage: Math.min(1, Math.max(0, newPage)) });
      self.currentPage = Math.min(1, Math.max(0, newPage));
    },
    updatePage(inc) {
      if (typeof self.timeoutId !== "number") {
        console.log({ inc });
        self.setPage(self.currentPage + inc);
        self.timeoutId = setTimeout(() => {
          self.timeoutId = clearTimeout(self.timeoutId);
        }, 500);
      }
    },
    afterCreate() {
      console.log("asdf");
      console.log(self, getSnapshot(self));
    }
  }))
  .views((self) => {
    return {
      getNodeById: (id) => {
        return id;
      }
    };
  });
