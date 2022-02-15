import { Instance, onSnapshot, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { NumbersModel } from "./NumbersModel";

const RootModel = types.model({
  numbersModel: NumbersModel
});

let initialState = RootModel.create({
  numbersModel: { numbers: [] }
});
console.log({ initialState });
if (process.browser) {
  const data = localStorage.getItem("rootState");
  if (data) {
    const json = JSON.parse(data);
    if (RootModel.is(json)) {
      //todo - a smarter merge method
      //initialState = RootModel.create(json);
    }
  }
}

export const rootStore = initialState;

onSnapshot(rootStore, (snapshot) => {
  console.log("Snapshot: ", snapshot);
  localStorage.setItem("rootState", JSON.stringify(snapshot));
});

const RootStoreContext = createContext(null);

export const Provider = RootStoreContext.Provider;

export function useMst() {
  const store = useContext(RootStoreContext);
  console.log({ store, RootStoreContext });
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
