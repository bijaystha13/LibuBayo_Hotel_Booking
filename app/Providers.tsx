"use client";

import { ReactNode } from "react";
import { AuthContextProvider } from "./shared/Context/AuthProvider";

export function Providers({ children }: { children: ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
