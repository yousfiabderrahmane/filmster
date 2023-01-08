import React, { useEffect, useReducer } from "react";
import { createContext, useCallback } from "react";
import API_KEY from "./apikey";
export const AppContext = createContext();

const favoriteLs = JSON.parse(localStorage.getItem("favList"));

let initialState = {
  searchTerm: "",
  list: [], //by name
  isPending: false,
  error: null,
  movies: [], //trend movies
  favList: favoriteLs ? favoriteLs : [],
  people: [], //reviews
  similar: [],
  cast: [],
  currentPage: 1,
  totalPages: "",
  singleMovie: null,
  mode: "dark",
};

const contextReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { ...state, isPending: true };

    case "UPDATE_SEARCHTERM":
      return { ...state, searchTerm: action.payload };
    case "UPDATE_LIST":
      return {
        ...state,
        error: null,
        isPending: false,
        list: action.payload,
      };
    case "UPDATE_TRENDLIST":
      return {
        ...state,
        error: null,
        isPending: false,
        movies: action.payload,
      };
    case "UPDATE_SIMILAR":
      return { ...state, similar: action.payload };
    case "ERROR":
      return { ...state, error: action.payload, isPending: false, list: [] };
    case "UPDATE_FAVLIST":
      return { ...state, favList: action.payload };
    case "UPDATE_SINGLEMOVIE":
      return { ...state, singleMovie: action.payload, isPending: false };
    case "UPDATE_REVIEWS":
      return { ...state, people: action.payload, isPending: false };
    case "UPDATE_CAST":
      return { ...state, cast: action.payload, isPending: false };
    case "CLEAR_FAVLIST":
      return { ...state, favList: [] };
    case "TOGGLE_MODE":
      return { ...state, mode: action.payload };
    case "UPDATE_CURRENTPAGE":
      return { ...state, currentPage: action.payload };
    case "UPDATE_TOTALPAGES":
      return { ...state, totalPages: action.payload };
    default:
      return state;
  }
};

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(contextReducer, initialState);
  console.log(state.list);
  //fetch trending movies
  const getTrendingMovies = useCallback(async () => {
    dispatch({ type: "IS_PENDING" });
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${state.currentPage}`
      );
      if (response.ok) {
        const data = await response.json();
        const { results, total_pages } = data;

        const filtredList = results.filter((movie) => {
          return movie.poster_path != null;
        });

        dispatch({
          type: "UPDATE_TOTALPAGES",
          payload: total_pages < 1000 ? total_pages : 999,
        });
        dispatch({ type: "UPDATE_TRENDLIST", payload: filtredList });
      } else {
        throw Error("Could not fetch data");
      }
    } catch (err) {
      dispatch({ type: "ERROR", payload: "Could not fetch the data" });
    }
  }, [state.currentPage]);

  //get trending movies home page
  const getTrendingHomeMovies = useCallback(async () => {
    dispatch({ type: "IS_PENDING" });
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${state.currentPage}`
      );
      if (response.ok) {
        const data = await response.json();
        const { results, total_pages } = data;
        dispatch({
          type: "UPDATE_TOTALPAGES",
          payload: total_pages < 500 ? total_pages : 499,
        });
        dispatch({ type: "UPDATE_LIST", payload: results });
      } else {
        throw Error("Could not fetch data");
      }
    } catch (err) {
      dispatch({ type: "ERROR", payload: "Could not fetch the data" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentPage]);

  //fetch movie by name

  const getMovieByName = useCallback(async () => {
    dispatch({ type: "IS_PENDING" });
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${state.searchTerm}&page=${state.currentPage}`
      );
      if (response.ok) {
        const data = await response.json();
        const { results, total_pages } = data;
        dispatch({
          type: "UPDATE_TOTALPAGES",
          payload: total_pages < 500 ? total_pages : 499,
        });

        //check wach results machi empty array
        if (results.length > 0) {
          //check ila 3ndhom poster image
          const filtredList = results.filter((movie) => {
            return movie.poster_path != null;
          });
          if (filtredList.length > 0) {
            dispatch({ type: "UPDATE_LIST", payload: filtredList });
          } else {
            dispatch({
              type: "ERROR",
              payload: `There is no such results for ${state.searchTerm}`,
            });
          }
        } else {
          dispatch({
            type: "ERROR",
            payload: `There is no such results for '${state.searchTerm}'`,
          });
        }
      } else {
        throw Error("Could not fetch data");
      }
    } catch (err) {
      throw Error(err);
    }
  }, [state.currentPage, state.searchTerm]);

  //fetch cast
  const fetchCast = useCallback(async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
      );
      if (response.ok) {
        const data = await response.json();
        const { cast } = data;
        if (cast.length > 5) {
          const newCast = cast.slice(0, 5);
          dispatch({ type: "UPDATE_CAST", payload: newCast });
        } else {
          dispatch({ type: "UPDATE_CAST", payload: cast });
        }
      }
    } catch (err) {}
  }, []);

  //fetch movie by id (single movie)
  const fetchMovieById = useCallback(async (id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      if (response.ok) {
        const data = await response.json();

        //deja chekina f context just in case bdl chi wa7d l id manually
        if (data.poster_path != null) {
          dispatch({ type: "UPDATE_SINGLEMOVIE", payload: data });
        } else {
          dispatch({
            type: "ERROR",
            payload: "Ooops seems like the movie details doesn't exist yet",
          });
          //bach ila movie id makaynach wl9a dik proprety success ykon nfs l err message maytbdl en deux deux
        }

        //ila 3ndo dik success proprety rah mal9a walo meskin
        if (data.hasOwnProperty("success")) {
          dispatch({
            type: "ERROR",
            payload: "Ooops seems like the movie details doesn't exist yet",
          });
        }
      } else {
        throw Error("Could not fetch data");
      }
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: "Ooops seems like the movie details doesn't exist yet",
      });
    }
  }, []);

  //fetch similar movies
  const getSimilarMovies = useCallback(async (id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`
      );

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "UPDATE_SIMILAR", payload: data.results });
      } else {
        throw Error("Could not fetch Similar");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  //fetch the reviews
  const getReviews = useCallback(async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`
      );
      if (response.ok) {
        const data = await response.json();
        const { results } = data;
        if (response.ok) {
          const newResults = results.filter((result) => {
            return result.author_details.avatar_path != null;
          });

          dispatch({ type: "UPDATE_REVIEWS", payload: newResults });
        } else {
          dispatch({ type: "ERROR", payload: "Could not fetch the data" });
        }
      }
    } catch (error) {
      throw Error(error);
    }
  }, []);

  useEffect(() => {
    //empty string falsy :)
    if (state.searchTerm) {
      getMovieByName();
    }
  }, [state.searchTerm, state.currentPage, getMovieByName]);

  useEffect(() => {
    localStorage.setItem("favList", JSON.stringify(state.favList));
  }, [state.favList]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        getTrendingMovies,
        getTrendingHomeMovies,
        fetchCast,
        fetchMovieById,
        getReviews,
        getSimilarMovies,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
