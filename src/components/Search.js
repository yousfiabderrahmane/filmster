import "./Search.css";
import { useAppContext } from "../context/useAppContext";
import { useRef } from "react";

import { useCallback } from "react";
// import TrendIcon from "../assets/trending.svg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as TrendIcon } from "../assets/trending.svg";
import { ReactComponent as FavIcon } from "../assets/favorite.svg";
import { ReactComponent as SearchIcon } from "../assets/search.svg";
import { ReactComponent as TV } from "../assets/tv.svg";

export default function Search() {
  const { dispatch, mode } = useAppContext();

  const searchValue = useRef();

  const navigate = useNavigate();

  //navigation
  const favRedirect = useCallback(() => {
    navigate("/favorite");
    console.log("+AAAAAAA");
  }, []);
  const TrendRedirect = useCallback(() => {
    navigate("/trending");
    console.log("+AAAAAAA");
  }, []);

  //handle searchterm state
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchValue.current.value) {
      searchValue.current.focus();
    }
    dispatch({
      type: "UPDATE_SEARCHTERM",
      payload: searchValue.current.value,
    });
    dispatch({ type: "UPDATE_CURRENTPAGE", payload: 1 });
  };
  return (
    <section className="search-section">
      <div className="left">
        <button
          id="left-btns"
          className={`left-btns ${mode === "light" && "dark-color"}`}
          onClick={TrendRedirect}
        >
          Trending
          <div className="trend-container">
            <TrendIcon fill={mode === "light" ? "#121212" : "white"} />
          </div>
        </button>
        <button
          id="left-btns"
          className={`left-btns ${mode === "light" && "dark-color"}`}
          onClick={favRedirect}
        >
          Favorites
          <div className="trend-container">
            <FavIcon fill={mode === "light" ? "#121212" : "white"} />
          </div>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="right">
          <input
            className={`${mode === "light" && "dark-color"}`}
            ref={searchValue}
            type="text"
            placeholder="Search For A Movie..."
          />
          <button>
            <div className="trend-container">
              <SearchIcon fill={mode === "light" ? "#121212" : "white"} />
            </div>
          </button>
        </div>
      </form>

      <div className="left">
        <a href="https://youshows.netlify.app/" target="_blank">
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
