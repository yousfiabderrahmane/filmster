import "./Search.css";
import { UseMovieContext } from "../../context/Context";
import { useRef } from "react";

import { useCallback } from "react";
// import TrendIcon from "../assets/trending.svg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as TrendIcon } from "../../assets/trending.svg";
import { ReactComponent as FavIcon } from "../../assets/favorite.svg";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ReactComponent as TV } from "../../assets/tv.svg";
import { ActionNames } from "../../context/Context";

export default function Search() {
  const { dispatch, mode } = UseMovieContext();

  const searchValue = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  //navigation
  const favRedirect = useCallback(() => {
    navigate("/favorite");
    dispatch({ type: ActionNames.UPDATE_CURRENTPAGE, payload: 1 });
  }, [dispatch, navigate]);
  const TrendRedirect = useCallback(() => {
    navigate("/trending");
    dispatch({ type: ActionNames.UPDATE_CURRENTPAGE, payload: 1 });
  }, [dispatch, navigate]);

  //handle searchterm state
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.current) {
      if (!searchValue.current.value) {
        searchValue.current.focus();
      } else {
        dispatch({
          type: ActionNames.UPDATE_SEARCHTERM,
          payload: searchValue.current.value,
        });
        dispatch({ type: ActionNames.UPDATE_CURRENTPAGE, payload: 1 });
        searchValue.current.value = "";
        searchValue.current.blur();
      }
    }
  };
  return (
    <section className="search-section">
      <div className="left">
        <button
          id="left-btns1"
          className={`left-btns ${mode === "light" && "dark-color"}`}
          onClick={TrendRedirect}
        >
          Trending
          <div className="trend-container">
            <TrendIcon fill={mode === "light" ? "#121212" : "white"} />
          </div>
        </button>
        <button
          id="left-btns2"
          className={`left-btns ${mode === "light" && "dark-color"}`}
          onClick={favRedirect}
        >
          Favorites
          <div className="trend-container">
            <FavIcon fill={mode === "light" ? "#121212" : "white"} />
          </div>
        </button>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="right">
          <input
            className={`${mode === "light" && "dark-color"}`}
            ref={searchValue}
            type="text"
            placeholder="Search For A Movie..."
          />

          <div className="trend-container">
            <SearchIcon
              onClick={handleSubmit}
              fill={mode === "light" ? "#121212" : "white"}
            />
          </div>
        </div>
      </form>

      <div className="left">
        <a
          href="https://youshows.netlify.app/"
          target="_blank"
          rel="noreferrer"
        >
          <button id="unique" className={`${mode === "light" && "dark-color"}`}>
            Tv-Shows
            <div className="trend-container">
              <TV fill={mode === "light" ? "#121212" : "white"} />
            </div>
          </button>
        </a>
      </div>
    </section>
  );
}
