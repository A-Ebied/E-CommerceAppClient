import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const reFresh = localStorage.getItem("token");
    if (reFresh !== null) {
      setToken(reFresh);
      // getUserData();
      setUserData(jwtDecode(reFresh));
    }
  }, []);

  //jwt-decode
  function getUserData() {
    const userData = jwtDecode(token);
    setUserData(userData);
  }

  return (
    <AuthContext.Provider
      value={{ token, setToken, userData, setUserData, getUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
