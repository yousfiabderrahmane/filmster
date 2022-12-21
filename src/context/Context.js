import React, { useEffect, useReducer } from "react";
import { createContext, useState } from "react";
export const AppContext = createContext();

let initialState = {
  searchTerm: "",
  list: null,
  isPending: false,
  error: null,
  movies: null, //trend movies
  favList: [],
};

const contextReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { ...state, isPending: true };
    case "UPDATE_SEARCHTERM":
      return { ...state, searchTerm: action.payload };
    case "UPDATE_LIST":
      return { ...state, error: null, isPending: false, list: action.payload };
    case "UPDATE_TRENDLIST":
      return {
        ...state,
        error: null,
        isPending: false,
        movies: action.payload,
      };
    case "ERROR":
      return { ...state, error: action.payload, isPending: false, list: null };
    case "UPDATE_FAVLIST":
      return { ...state, favList: action.payload };
    case "CLEAR_FAVLIST":
      return { ...state, favList: [] };
    default:
      return state;
  }
};

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(contextReducer, initialState);

  console.log(state.favList);
  //fetch trending movies
  const getTrendingMovies = async () => {
    dispatch({ type: "IS_PENDING" });
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/all/day?api_key=19dc8c994b8ef838ba65a40c5ea44444"
      );
      if (response.ok) {
        const data = await response.json();
        const { results } = data;

        dispatch({ type: "UPDATE_TRENDLIST", payload: results });
      } else {
        throw Error("Could not fetch data");
      }
    } catch (err) {
      dispatch({ type: "ERROR", payload: "Could not fetch the data" });
      console.log(err);
    }
  };
  //fetch movie by name
  const getMovieByName = async () => {
    dispatch({ type: "IS_PENDING" });
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=19dc8c994b8ef838ba65a40c5ea44444&query=${state.searchTerm}`
      );
      if (response.ok) {
        const data = await response.json();
        const { results } = data;
        //check wach results machi empty array
        if (results.length > 0) {
          //check ila 3ndhom poster image
          const filtredList = results.filter((movie) => {
            return movie.poster_path != null;
          });
          dispatch({ type: "UPDATE_LIST", payload: filtredList });
        } else {
          dispatch({ type: "ERROR", payload: "Could not fetch the data" });
        }
      } else {
        throw Error("Could not fetch data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //empty string falsy :)
    if (state.searchTerm) {
      getMovieByName();
    }
  }, [state.searchTerm]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        getTrendingMovies,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
