import React from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../../components/MovieCard";
import { useAppContext } from "../../context/useAppContext";
import "./FavoriteMovies.css";
import { ReactComponent as FavBookMark } from "../../assets/favorite-bookmark-svgrepo-com.svg";

export default function FavoriteMovies() {
  const { favList, dispatch, mode } = useAppContext();
  const navigate = useNavigate();

  const handleClear = () => {
    dispatch({ type: "CLEAR_FAVLIST" });
  };

  return (
    <section className="favorite-movies-page">
      <div
        className={`favorite-page-header ${mode === "light" && "dark-color"}`}
      >
        <h2>My Favorite Movies</h2>
        <div className="btns">
          {" "}
          <button
            className={`${mode === "light" && "dark-color"}`}
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            className={`${mode === "light" && "dark-color"}`}
            onClick={() => navigate("/")}
          >
            Back Home
          </button>
        </div>
      </div>
      {favList.length < 1 && (
        <div className="list-icon-container">
          <div className="icon">
            <FavBookMark fill={mode === "light" ? "#121212" : "white"} />
          </div>

          <h1
            style={{ color: mode == "dark" && "white" }}
            className={`${mode === "light" && "dark-color"}`}
          >
            Currently Empty
          </h1>
        </div>
      )}

      <div className="favorite-page-list">
        {favList &&
          favList.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
      </div>
    </section>
  );
}
