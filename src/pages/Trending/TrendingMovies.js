import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./TrendingMovies.css";
import "../../components/MovieCard.css";
import MovieCard from "../../components/MovieCard";
import { useAppContext } from "../../context/useAppContext";
import Pagination from "../../components/Pagination";
import LoadingGif from "../../assets/loading-gif.gif";

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

  useEffect(() => {
    getTrendingMovies();
  }, [currentPage]);

  useEffect(() => {
    dispatch({ type: "UPDATE_CURRENTPAGE", payload: 1 });
    return () => {
      // dispatch({ type: "UPDATE_CURRENTPAGE", payload: 1 });
      dispatch({ type: "UPDATE_TOTALPAGES", payload: 0 });
    };
  }, []);

  return (
    <section className="trending-movies-page">
      <div className="page-header">
        <h2 className={`page-title ${mode === "light" && "dark-color"}`}>
          Most Popular Movies Right Now
        </h2>
        <button
          className={`${mode === "light" && "dark-color"}`}
          onClick={() => navigate("/")}
        >
          Back Home
        </button>
      </div>

      {isPending ? (
        <p className={`info ${mode === "light" && "dark-color"}`}>
          <img src={LoadingGif} alt="" />
        </p>
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
