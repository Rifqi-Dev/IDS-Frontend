import React, { createContext, useContext, useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

import { Snackbar, Alert } from "@mui/material";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, isAuthenticated: false });
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setAuth({ token, isAuthenticated: true });
        } else {
          localStorage.removeItem("token");
          setAuth({ token: null, isAuthenticated: false });
          setError("Session expired. Please log in again.");
        }
      } catch (err) {
        localStorage.removeItem("token");
        setAuth({ token: null, isAuthenticated: false });
        setError("Invalid token. Please log in again.");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth }}>
      {children}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
      >
        <Alert onClose={() => setError("")} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
