import React, { ReactNode, useContext, useEffect, useReducer } from "react";
import { createContext, useCallback } from "react";
import API_KEY from "./apikey";

const favoriteLs = JSON.parse(localStorage.getItem("favList")!);

//interface of the movie object that the API'S returns
export interface MovieType {
  name: string;
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface genre {
  id: number;
  name: string;
}

export interface SingleMovieType {
  poster_path: string;
  title: string;
  tagline: string;
  original_language: string;
  runtime: number;
  vote_average: number;
  budget: number;
  release_date: string;
  genres: genre[];
  overview: string;
}

interface CastType {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

interface ReviewsType {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  id: number;
  updated_at: string;
  url: string;
}

//initial state
export const initialSingleMovie = {
  poster_path: "",
  title: "",
  tagline: "",
  original_language: "",
  runtime: 0,
  vote_average: 0,
  budget: 0,
  release_date: "",
  genres: [],
  overview: "",
};

let initialState = {
  searchTerm: "",
  list: [], //by name
  isPending: false,
  error: "",
  movies: [], //trend movies
  favList: favoriteLs ? favoriteLs : [],
  people: [], //reviews
  similar: [],
  cast: [],
  currentPage: 1,
  totalPages: 0,
  singleMovie: initialSingleMovie,
  mode: "dark",
};

//initial state interface
interface InitialState {
  searchTerm: string;
  list: MovieType[]; //by name
  isPending: boolean;
  error: string;
  movies: MovieType[]; //trend movies
  favList: MovieType[];
  people: ReviewsType[]; //reviews
  similar: MovieType[];
  cast: CastType[];
  currentPage: number;
  totalPages: number;
  singleMovie: SingleMovieType;
  mode: string;
}

//enum for the actions names
export enum ActionNames {
  IS_PENDING = "IS_PENDING",
  UPDATE_SEARCHTERM = "UPDATE_SEARCHTERM",
  UPDATE_LIST = "UPDATE_LIST",
  UPDATE_TRENDLIST = "UPDATE_TRENDLIST",
  UPDATE_SIMILAR = "UPDATE_SIMILAR",
  ERROR = "ERROR",
  UPDATE_FAVLIST = "UPDATE_FAVLIST",
  UPDATE_SINGLEMOVIE = "UPDATE_SINGLEMOVIE",
  UPDATE_REVIEWS = "UPDATE_REVIEWS",
  UPDATE_CAST = "UPDATE_CAST",
  CLEAR_FAVLIST = "CLEAR_FAVLIST",
  TOGGLE_MODE = "TOGGLE_MODE",
  UPDATE_CURRENTPAGE = "UPDATE_CURRENTPAGE",
  UPDATE_TOTALPAGES = "UPDATE_TOTALPAGES",
}

//action type
type ActionType =
  | { type: ActionNames.IS_PENDING }
  | { type: ActionNames.UPDATE_SEARCHTERM; payload: string }
  | { type: ActionNames.UPDATE_LIST; payload: MovieType[] }
  | { type: ActionNames.UPDATE_TRENDLIST; payload: MovieType[] }
  | { type: ActionNames.UPDATE_SIMILAR; payload: MovieType[] }
  | { type: ActionNames.ERROR; payload: string }
  | { type: ActionNames.UPDATE_FAVLIST; payload: MovieType[] }
  | { type: ActionNames.UPDATE_SINGLEMOVIE; payload: SingleMovieType }
  | { type: ActionNames.UPDATE_REVIEWS; payload: ReviewsType[] }
  | { type: ActionNames.UPDATE_CAST; payload: CastType[] }
  | { type: ActionNames.CLEAR_FAVLIST; payload: MovieType[] }
  | { type: ActionNames.TOGGLE_MODE; payload: string }
  | { type: ActionNames.UPDATE_CURRENTPAGE; payload: number }
  | { type: ActionNames.UPDATE_TOTALPAGES; payload: number };

const contextReducer = (
  state: InitialState,
  action: ActionType
): InitialState => {
  const { type } = action;
  switch (type) {
    case ActionNames.IS_PENDING:
      return { ...state, isPending: true };

    case ActionNames.UPDATE_SEARCHTERM:
      return { ...state, searchTerm: action.payload };
    case ActionNames.UPDATE_LIST:
      return {
        ...state,
        error: "",
        isPending: false,
        list: action.payload,
      };
    case ActionNames.UPDATE_TRENDLIST:
      return {
        ...state,
        error: "",
        isPending: false,
        movies: action.payload,
      };
    case ActionNames.UPDATE_SIMILAR:
      return { ...state, similar: action.payload };
    case ActionNames.ERROR:
      return { ...state, error: action.payload, isPending: false, list: [] };
    case ActionNames.UPDATE_FAVLIST:
      return { ...state, favList: action.payload };
    case ActionNames.UPDATE_SINGLEMOVIE:
      return { ...state, singleMovie: action.payload, isPending: false };
    case ActionNames.UPDATE_REVIEWS:
      return { ...state, people: action.payload, isPending: false };
    case ActionNames.UPDATE_CAST:
      return { ...state, cast: action.payload, isPending: false };
    case ActionNames.CLEAR_FAVLIST:
      return { ...state, favList: [] };
    case ActionNames.TOGGLE_MODE:
      return { ...state, mode: action.payload };
    case ActionNames.UPDATE_CURRENTPAGE:
      return { ...state, currentPage: action.payload };
    case ActionNames.UPDATE_TOTALPAGES:
      return { ...state, totalPages: action.payload };
    default:
      return state;
  }
};

export const Context = () => {
  const [state, dispatch] = useReducer(contextReducer, initialState);

  //fetch trending movies
  const getTrendingMovies: () => void = useCallback(async () => {
    dispatch({ type: ActionNames.IS_PENDING });
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${state.currentPage}`
      );
      if (response.ok) {
        const data = await response.json();
        const { results, total_pages } = data;

        const filtredList = results.filter((movie: MovieType) => {
          return movie.poster_path != null;
        });

        dispatch({
          type: ActionNames.UPDATE_TOTALPAGES,
          payload: total_pages < 1000 ? total_pages : 999,
        });
        dispatch({ type: ActionNames.UPDATE_TRENDLIST, payload: filtredList });
      } else {
        throw Error("Could not fetch data");
      }
    } catch (err) {
      dispatch({
        type: ActionNames.ERROR,
        payload: "Could not fetch the data",
      });
    }
  }, [state.currentPage]);

  //get trending movies for the home page
  const getTrendingHomeMovies: () => any = useCallback(async () => {
    console.log("i ran");
    dispatch({ type: ActionNames.IS_PENDING });
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${state.currentPage}`
      );
      if (response.ok) {
        const data = await response.json();
        const { results, total_pages } = data;
        dispatch({
          type: ActionNames.UPDATE_TOTALPAGES,
          payload: total_pages < 500 ? total_pages : 499,
        });
        dispatch({ type: ActionNames.UPDATE_LIST, payload: results });
      } else {
        throw Error("Could not fetch data");
      }
    } catch (err) {
      dispatch({
        type: ActionNames.ERROR,
        payload: "Could not fetch the data",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentPage]);

  //fetch movie by name
  const getMovieByName: () => void = useCallback(async () => {
    dispatch({ type: ActionNames.IS_PENDING });
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${state.searchTerm}&page=${state.currentPage}`
      );
      if (response.ok) {
        const data = await response.json();
        const { results, total_pages } = data;
        dispatch({
          type: ActionNames.UPDATE_TOTALPAGES,
          payload: total_pages < 500 ? total_pages : 499,
        });

        //check wach results machi empty array
        if (results.length > 0) {
          //check ila 3ndhom poster image
          const filtredList = results.filter((movie: MovieType) => {
            return movie.poster_path != null;
          });
          if (filtredList.length > 0) {
            dispatch({ type: ActionNames.UPDATE_LIST, payload: filtredList });
          } else {
            dispatch({
              type: ActionNames.ERROR,
              payload: `There is no such results for ${state.searchTerm}`,
            });
          }
        } else {
          dispatch({
            type: ActionNames.ERROR,
            payload: `There is no such results for '${state.searchTerm}'`,
          });
        }
      } else {
        throw Error("Could not fetch data");
      }
    } catch (err: any) {
      throw Error(err);
    }
  }, [state.currentPage, state.searchTerm]);

  //fetch cast
  const fetchCast: (id: number) => void = useCallback(async (id: number) => {
    dispatch({ type: ActionNames.IS_PENDING });

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
      );
      if (response.ok) {
        const data = await response.json();
        const { cast } = data;

        if (cast.length > 5) {
          const newCast = cast.slice(0, 5);
          dispatch({ type: ActionNames.UPDATE_CAST, payload: newCast });
        } else {
          dispatch({ type: ActionNames.UPDATE_CAST, payload: cast });
        }
      }
    } catch (err) {}
  }, []);

  //fetch movie by id (single movie)
  const fetchMovieById: (id: number) => void = useCallback(
    async (id: number) => {
      dispatch({ type: ActionNames.IS_PENDING });
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        if (response.ok) {
          const data = await response.json();

          //deja chekina just in case bdl chi wa7d l id manually
          if (data.poster_path != null) {
            dispatch({ type: ActionNames.UPDATE_SINGLEMOVIE, payload: data });
          } else {
            dispatch({
              type: ActionNames.ERROR,
              payload: "Ooops seems like the movie details doesn't exist yet",
            });
            //bach ila movie id makaynach wl9a dik proprety success ykon nfs l err message maytbdlch en deux deux
          }

          //ila 3ndo dik success proprety rah mal9a walo meskin
          if (data.hasOwnProperty("success")) {
            dispatch({
              type: ActionNames.ERROR,
              payload: "Ooops seems like the movie details doesn't exist yet",
            });
          }
        }
      } catch (err) {
        dispatch({
          type: ActionNames.ERROR,
          payload: "Ooops seems like the movie details doesn't exist yet",
        });
      }
    },
    []
  );

  //fetch similar movies
  const getSimilarMovies: (id: number) => void = useCallback(
    async (id: number) => {
      dispatch({ type: ActionNames.IS_PENDING });
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`
        );

        if (response.ok) {
          const data = await response.json();
          dispatch({ type: ActionNames.UPDATE_SIMILAR, payload: data.results });
        } else {
          throw Error("Could not fetch Similar");
        }
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  //fetch the reviews
  const getReviews: (id: number) => void = useCallback(async (id: number) => {
    dispatch({ type: ActionNames.IS_PENDING });

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`
      );
      if (response.ok) {
        const data = await response.json();
        const { results } = data;

        const newResults = results.filter((result: ReviewsType) => {
          return result.author_details.avatar_path != null;
        });

        dispatch({ type: ActionNames.UPDATE_REVIEWS, payload: newResults });
      } else {
        dispatch({
          type: ActionNames.ERROR,
          payload: "Ooops seems like the movie details doesn't exist yet",
        });
      }
    } catch (error) {
      console.log(error);
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

  return {
    ...state,
    dispatch,
    getTrendingMovies,
    getTrendingHomeMovies,
    fetchCast,
    fetchMovieById,
    getReviews,
    getSimilarMovies,
  };
};

//context

// capture th return type of my context
type movieContextType = ReturnType<typeof Context>;

// 2-create the context
const movieContext = createContext<movieContextType>({
  searchTerm: "",
  list: [], //by name
  isPending: false,
  error: "",
  movies: [], //trend movies
  favList: favoriteLs ? favoriteLs : [],
  people: [], //reviews
  similar: [],
  cast: [],
  currentPage: 1,
  totalPages: 0,
  singleMovie: initialSingleMovie,
  mode: "dark",
  dispatch: () => {},
  getTrendingMovies: () => {},
  getTrendingHomeMovies: () => {
    Promise<void>;
  },
  fetchCast: (id: number) => {},
  fetchMovieById: (id: number) => {},
  getReviews: (id: number) => {},
  getSimilarMovies: (id: number) => {},
  //in this foucking bloody case we had to declare the return value to be foucking void in every single foucking func AAAAAAAAA !!!
});

// 3-create a custom hook to constum the context later on, also provide the return type in declatarion
export const UseMovieContext = (): movieContextType => {
  const ctx = useContext(movieContext);
  console.log(ctx);
  return ctx;
};

// 4- Provider (Props + the provider itself)
interface ProviderProps {
  children: ReactNode;
}

export const MovieContextProvider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <movieContext.Provider value={Context()}>{children}</movieContext.Provider>
  );
};
