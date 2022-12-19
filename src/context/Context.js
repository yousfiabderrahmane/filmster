import React from "react";
import { createContext, Provider, useState } from "react";
export const AppContext = createContext();

export default function ContextProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);
  return (
    <AppContext.Provider value={{ setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
}
