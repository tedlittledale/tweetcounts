import React, { useState, useEffect } from "react";

const init = netlifyIdentity => {
  const user = netlifyIdentity.currentUser();

  if (!user) {
    netlifyIdentity.open();
  }
};

const loginUser = async ({ auth, email, password }) => {
  try {
    const response = await auth.login(email, password, true);

    return { response };
  } catch (error) {
    return { error };
  }
};

const registerUser = async ({ auth, email, password, name }) => {
  try {
    await auth.signup(email, password, {
      full_name: name || email,
    });
    const response = await auth.login(email, password, true);

    return { response };
  } catch (error) {
    return { error };
  }
};

const generateHeaders = netlifyIdentity => {
  const headers = { "Content-Type": "application/json" };
  const user = netlifyIdentity.currentUser();

  if (!!user) {
    return user.jwt().then(token => {
      return { ...headers, Authorization: `Bearer ${token}` };
    });
  }
  return Promise.resolve(headers);
};

const getApps = async identity => {
  const headers = await generateHeaders(identity);

  const response = await fetch("/.netlify/functions/fauna-getapps", {
    method: "GET",
    headers,
  }).then(response => {
    if (!response.ok) {
      return response.text().then(err => {
        throw err;
      });
    }
    return response.json();
  });

  return response;
};

function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }
  return context;
}
function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }
  return context;
}
function authReducer(state, action) {
  switch (action.type) {
    case "increment": {
      return { count: state.count + 1 };
    }
    case "decrement": {
      return { count: state.count - 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

const AuthProvider = ({ children, auth }) => {
  const [state, dispatch] = React.useReducer(authReducer, { count: 0 });
  return (
    <AuthStateContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export default {
  generateHeaders,
  init,
  getApps,
  useAuthState,
  useAuthDispatch,
  AuthProvider,
  loginUser,
  registerUser,
};
