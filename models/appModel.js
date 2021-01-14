import { types, onSnapshot, flow } from "mobx-state-tree"

export const AppModel = types.model("AppModel", {
  consumerKey: "",
  icon: "",
  id: "",
  isWritable: false,
  name: "",
  secretKey: "",
  state: "",
  description: "",
  url: "",
  supportsLogin: false,
  callbackUrls: types.array(types.string),
  organizationName: "",
  accessLevel: "",
  requestEmailAddress: false,
})
