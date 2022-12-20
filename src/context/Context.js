import React, { useEffect, useReducer } from "react";
import { createContext, Provider, useState } from "react";
export const AppContext = createContext();

export default function ContextProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [list, setList] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState(null);

  const [favList, setFavList] = useState([]);

  const getTrendingMovies = async () => {
    setError(null);
    setIsPending(true);
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/all/day?api_key=19dc8c994b8ef838ba65a40c5ea44444"
      );
      const data = await response.json();
      const { results } = data;
      setMovies(results);
      setError(null);
      setIsPending(false);
    } catch (err) {
      setError("We could not fetch the data x)");
      console.log(err);
    }
  };
  const getMovieByName = async () => {
    setIsPending(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=19dc8c994b8ef838ba65a40c5ea44444&query=${searchTerm}`
      );
      const data = await response.json();
      const { results } = data;
      //check wach results machi empty array
      if (results.length > 0) {
        //check ila 3ndhom poster image
        const filtredList = results.filter((i) => {
          return i.poster_path != null;
        });

        setList(filtredList);

        // old way : setList(
        //   results.filter((i) => {
        //     return i.poster_path != null;
        //   })
        // );
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
  useEffect(() => {
    //empty string falsy :)
    if (searchTerm) {
      getMovieByName();
    }
  }, [searchTerm]);
  return (
    <AppContext.Provider
      value={{
        movies,
        getTrendingMovies,
        setSearchTerm,
        list,
        isPending,
        error,
        favList,
        setFavList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
