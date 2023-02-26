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

const favoriteLs = JSON.parse(localStorage.getItem("favList")!);

export let initialState = {
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
export interface genre {
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

export interface CastType {
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

export interface ReviewsType {
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

// initial state interface
export interface InitialState {
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
enum ActionNames {
  IS_PENDING = "IS_PENDING",
  UPDATE_SEARCHTERM = "UPDATE_SEARCHTERM",
  UPDATE_LIST = "UPDATE_LIST",
  UPDATE_TRENDLIST = "UPDATE_TRENDLIST",
  UPDATE_SIMILAR = "UPDATE_SIMILAR",
  ERROR = "ERROR",
  UPDATE_FAVLIST = "UPDATE_FAVLIST",
  UPDATE_SINGLEMOVIE = "UPDATE_SINGLEMOVIE",
  CLEAR_SINGLEMOVIE = "CLEAR_SINGLEMOVIE",
  UPDATE_REVIEWS = "UPDATE_REVIEWS",
  UPDATE_CAST = "UPDATE_CAST",
  CLEAR_FAVLIST = "CLEAR_FAVLIST",
  TOGGLE_MODE = "TOGGLE_MODE",
  UPDATE_CURRENTPAGE = "UPDATE_CURRENTPAGE",
  UPDATE_TOTALPAGES = "UPDATE_TOTALPAGES",
}

//action type
export type ActionType =
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
