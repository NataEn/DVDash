import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const toggleLoggedIn = () => {
    setLoggedIn(!loggedIn);
  };
  // const history = useHistory();
  // useEffect(() => {
  //   if (loggedIn & history) {
  //     console.log(history);
  //     history.push("/dashboard");
  //   }
  // }, [loggedIn]);
  return (
    <AuthContext.Provider value={{ loggedIn, toggleLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
