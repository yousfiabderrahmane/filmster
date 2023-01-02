import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./TrendingMovies.css";
import "../../components/MovieCard.css";
import MovieCard from "../../components/MovieCard";
import { useAppContext } from "../../context/useAppContext";
import Pagination from "../../components/Pagination";

export default function TrendingMovies() {
  const {
    movies,
    totalPages,
    getTrendingMovies,
    isPending,
    mode,
    currentPage,
    dispatch,
  } = useAppContext();
  const navigate = useNavigate();

  const handlePrevious = useCallback(() => {
    dispatch({
      type: "UPDATE_CURRENTPAGE",
      payload: currentPage - 1,
    });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage, dispatch]);

  const handleNext = useCallback(() => {
    dispatch({
      type: "UPDATE_CURRENTPAGE",
      payload: currentPage + 1,
    });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage, dispatch]);

  const handleHome = () => {
    dispatch({ type: "UPDATE_CURRENTPAGE", payload: 1 });
    navigate("/");
  };

  useEffect(() => {
    getTrendingMovies();
  }, [currentPage]);

  return (
    <section className="trending-movies-page">
      <div className="page-header">
        <h2 className={`page-title ${mode === "light" && "dark-color"}`}>
          Most Popular Movies Right Now
        </h2>
        <button
          className={`${mode === "light" && "dark-color"}`}
          onClick={handleHome}
        >
          Back Home
        </button>
      </div>

      {isPending ? (
        <div className={`center-me ${mode === "light" && "dark-color"}`}>
          <h1 style={{ color: mode === "light" && "#121212" }}>
            Loading . . .
          </h1>
        </div>
      ) : (
        <div className="trending-movies-list">
          {movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>
      )}

      {!isPending && (
        <Pagination
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </section>
  );
}
