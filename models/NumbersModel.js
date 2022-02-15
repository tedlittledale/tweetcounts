import { types } from "mobx-state-tree";

const Number = types.model("Number", {
  name: types.string,
  category: types.string,
  value: types.number,
  unit: types.string
});

export const NumbersModel = types
  .model("NumbersModel", {
    numbers: types.array(Number),
    projectName: "Prototype boilerplate"
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
