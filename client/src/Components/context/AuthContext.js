import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [authState, setAuthState] = useState({
    loggedIn: null,
    user: null,
  });
  const API_URL = process.env.REACT_APP_API_URL;

  async function getLoggedIn() {
    try {
      console.log("Fetching authentication status...");
      const response = await axios.get(`${API_URL}/auth/loggedIn`, { withCredentials: true });

      setAuthState({
        loggedIn: response.data.auth,
        user: response.data.user,
      });
    } catch (error) {
      console.error("Failed to fetch authentication status:", error);
      setAuthState({ loggedIn: false, user: null });
    }
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
