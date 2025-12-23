"use client";

import { createContext } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  token: string | null;
  login: (uid: string, token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  login: () => {},
  logout: () => {},
});
