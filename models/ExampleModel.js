import { types } from "mobx-state-tree";

const DataLine = types.model("DataLine", {
  date: types.string
});

export const ExampleModel = types
  .model("TimelineModel", {
    allData: types.array(DataLine)
  })
  .actions((self) => ({
    processData(data) {},

    afterCreate() {}
  }))
  .views((self) => {
    return {
      getNodeById: (id) => {
        return id;
      }
    };
  });
