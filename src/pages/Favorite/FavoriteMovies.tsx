import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "../../components/MovieCard";
import { UseMovieContext } from "../../context/Context";
import "./FavoriteMovies.css";
import { ReactComponent as FavBookMark } from "../../assets/favorite-bookmark-svgrepo-com.svg";
import { Pagination } from "../../components/Pagination";
import { ActionNames } from "../../context/Context";

export default function FavoriteMovies() {
  const { favList, dispatch, mode } = UseMovieContext();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8);

  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;

  const currentFavList = favList.slice(firstCardIndex, lastCardIndex);

  const totalPages = Math.ceil(favList.length / cardsPerPage);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleClear = () => {
    dispatch({ type: ActionNames.CLEAR_FAVLIST, payload: [] });
  };

  useEffect(() => {
    if (currentFavList.length === 0 && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentFavList, currentPage]);
  return (
    <section className="favorite-movies-page">
      <div
        className={`favorite-page-header ${mode === "light" && "dark-color"}`}
      >
        {/* to do styling */}
        <h2>My Favorite Movies</h2>
        <div className="btns">
          {favList.length > 0 && (
            <button
              className={`${mode === "light" && "dark-color"}`}
              onClick={handleClear}
            >
              Clear
            </button>
          )}
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

          {/* to do styling */}
          <h1 className={`${mode === "light" && "dark-color"}`}>
            Currently Empty
          </h1>
        </div>
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
      {favList.length > 8 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      )}
    </section>
  );
}
