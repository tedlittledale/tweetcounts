import { types, onSnapshot, flow } from "mobx-state-tree"

import { AppModel } from "./appModel"
import auth from "../utils/auth"
import {
  find,
  propEq,
  clone,
  lensPath,
  set,
  hasPath,
  path,
  findIndex,
} from "ramda"

export const AppsModel = types
  .model("AppsModel", {
    state: "init",
    updated: `new Date().getTime()`,
    currentApp: types.maybeNull(AppModel),
    apps: types.array(AppModel),
  })
  .actions(self => ({
    fetchApps: flow(function* fetchApps(identity) {
      // <- note the star, this a generator function!
      self.state = "pending"
      try {
        // ... yield can be used in async/await style
        const headers = yield auth.generateHeaders(identity)
        const apps = yield fetch("/.netlify/functions/fauna-getapps", {
          method: "GET",
          headers,
        }).then(response => {
          if (!response.ok) {
            return response.text().then(err => {
              throw err
            })
          }
          return response.json()
        })
        self.apps = apps
        self.currentApp = apps[0]
        self.state = "done"
      } catch (error) {
        // ... including try/catch error handling
        console.error("Failed to fetch projects", error)
        self.state = "error"
      }
    }),
    updateCurrent: consumerKey => {
      const newApp = find(
        propEq("consumerKey", consumerKey),
        self.apps.toJSON()
      )
      if (newApp) {
        self.currentApp = newApp.toJSON()
        self.updated = `${new Date().getTime()}`
      }
    },
    resetCurrent: () => {
      self.currentApp = null
    },
  }))
  .views(self => ({
    getCurrentApp: async () => {
      if (!self.currentApp) {
        await self.fetchApps()
      }
      return self.currentApp
    },
  }))
