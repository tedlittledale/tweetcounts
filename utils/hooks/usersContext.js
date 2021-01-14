import React from "react"

const UsersContext = React.createContext()

export const UsersProvider = ({ children, users }) => {
  return <UsersContext.Provider value={users}>{children}</UsersContext.Provider>
}

export function useUsersState() {
  const context = React.useContext(UsersContext)
  if (context === undefined) {
    throw new Error("usersState must be used within a UsersProviders")
  }
  return context
}
