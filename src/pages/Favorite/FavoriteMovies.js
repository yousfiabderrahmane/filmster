import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../../components/MovieCard";
import { useAppContext } from "../../context/useAppContext";
import "./FavoriteMovies.css";
import { ReactComponent as FavBookMark } from "../../assets/favorite-bookmark-svgrepo-com.svg";
import FavPagination from "./FavPagination";

export default function FavoriteMovies() {
  const { favList, dispatch, mode } = useAppContext();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(8);

  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;

  const currentFavList = favList.slice(firstCardIndex, lastCardIndex);

  const totalPages = Math.ceil(favList.length / cardsPerPage);

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
      {favList.length > 8 && (
        <FavPagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          currentFavList={currentFavList}
        />
      )}
      <div className="favorite-page-list">
        {favList.length > 8
          ? currentFavList.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })
          : favList.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })}
      </div>
    </section>
  );
}
