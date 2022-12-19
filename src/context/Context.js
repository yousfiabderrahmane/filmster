import React, { useEffect } from "react";
import { createContext, Provider, useState } from "react";
export const AppContext = createContext();

export default function ContextProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [list, setList] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const getMovieByName = async () => {
    setIsPending(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=19dc8c994b8ef838ba65a40c5ea44444&query=${searchTerm}`
      );
      const data = await response.json();
      const { results } = data;
      if (results.length > 0) {
        //check ila 3ndhom poster image
        setList(
          results.filter((i) => {
            return i.poster_path != null;
          })
        );
        setIsPending(false);
      } else {
        setError("The is no movies to display for that specific search term");
        setIsPending(false);
        setList(null);
      }
    } catch (err) {
      console.log(error);
      setIsPending(false);
      setList(null);
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
    <AppContext.Provider value={{ setSearchTerm, list, isPending, error }}>
      {children}
    </AppContext.Provider>
  );
}
