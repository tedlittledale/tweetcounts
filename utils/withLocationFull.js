import React from "react"
import { Location } from "@reach/router"
import queryString from "query-string"

const withLocation = ComponentToWrap => props => (
  <Location>
    {({ location, navigate }) => (
      <ComponentToWrap
        {...props}
        location={location}
        navigate={navigate}
        search={location.search ? location.search : ""}
      />
    )}
  </Location>
)

export default withLocation
