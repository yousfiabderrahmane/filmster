import { useContext } from "react";
import { AppContext } from "./Context";

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw Error("Context out of scoope");
  }
  return context;
};
