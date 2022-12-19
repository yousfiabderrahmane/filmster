import React, { useEffect } from "react";
import { createContext, Provider, useState } from "react";
export const AppContext = createContext();

export default function ContextProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [list, setList] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const getMovieByName = async () => {
    setIsPending(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=19dc8c994b8ef838ba65a40c5ea44444&query=${searchTerm}`
      );
      const data = await response.json();
      const { results } = data;
      if (results.length > 0) {
        setList(results);
        setIsPending(false);
      }
    } catch (error) {
      console.log(error);
      setIsPending(false);
    }
  };
  console.log(list);

  useEffect(() => {
    //empty string falsy :)
    if (searchTerm) {
      getMovieByName();
    }
  }, [searchTerm]);
  return (
    <AppContext.Provider value={{ setSearchTerm, list }}>
      {children}
    </AppContext.Provider>
  );
}
