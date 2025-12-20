"use client";

import { createContext } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// type AuthContextProviderProps = {
//   children: ReactNode;
// };

// export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const login = () => {
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//   };

//   const contextValue = {
//     isLoggedIn,
//     login,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
//   );
// };

// // Optional: Create a custom hook for easier consumption
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthContextProvider");
//   }
//   return context;
// };
