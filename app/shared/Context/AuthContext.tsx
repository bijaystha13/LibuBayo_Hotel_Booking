"use client";

import { createContext } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  token: string | null;
  login: (uid: string, token: string, name: string) => void;
  logout: () => void;
  name: string | null;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  login: () => {},
  logout: () => {},
  name: null,
});
