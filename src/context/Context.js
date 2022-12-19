import React from "react";
import { createContext, Provider, useState } from "react";
export const AppContext = createContext();

export default function ContextProvider({ children }) {
  const [name, setName] = useState("testing");
  return <AppContext.Provider value={{ name }}>{children}</AppContext.Provider>;
}
