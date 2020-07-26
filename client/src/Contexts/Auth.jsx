import React, { createContext, useState } from "react";
export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
