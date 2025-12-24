"use client";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const login = useCallback(
    (uid: string, token: string, name: string, role: string) => {
      setToken(token);
      setUserId(uid);
      setName(name);
      setRole(role);
      localStorage.setItem(
        "userData",
        JSON.stringify({ userId: uid, token, name })
      );
    },
    []
  );

  const logout = () => {
    setToken(null);
    setUserId(null);
    setName(null);
    setRole(null);
    localStorage.removeItem("userData");
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(
        storedData.userId,
        storedData.token,
        storedData.name,
        storedData.role
      );
    }
    setIsInitialized(true);
  }, [login]);

  // useEffect(() => {
  //   const initializeUserData = async () => {
  //     const storedData = localStorage.getItem("userData");
  //     if (storedData) {
  //       const parsedData = JSON.parse(storedData);
  //       if (parsedData?.userId && parsedData?.token) {
  //         login(parsedData.userId, parsedData.token);
  //       }
  //     }
  //     setIsInitialized(true);
  //   };

  //   initializeUserData();
  // }, [login]);

  const contextValue = {
    isLoggedIn: !!token,
    token,
    login,
    logout,
    name,
    userId,
    role,
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
