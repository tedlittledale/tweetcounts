import { types, onSnapshot, flow } from "mobx-state-tree";

export const UserModel = types
  .model("UserModel", {
    isLoggedIn: false,
    checkedRoles: false,
    roles: types.array(types.string),
  })
  .actions(self => {
    return {
      loginUser: () => {
        self.isLoggedIn = true;
        console.log("loggedin");
      },
      setRoles: roles => {
        console.log({ roles });
        self.roles = roles ? roles : [];
        self.checkedRoles = true;
      },
      logoutUser: () => {
        self.checkedRoles = false;
        self.isLoggedIn = false;
        self.roles = [];
      },
    };
  });
