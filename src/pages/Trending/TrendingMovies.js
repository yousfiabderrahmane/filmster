import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrendingMovies.css";
import "../../components/MovieCard.css";
import MovieCard from "../../components/MovieCard";
import { useAppContext } from "../../context/useAppContext";
import Star from "../../assets/stars_FILL0_wght400_GRAD0_opsz48.svg";
import Pagination from "../../components/Pagination";

export default function TrendingMovies() {
  const { movies, getTrendingMovies, isPending, mode, currentPage, dispatch } =
    useAppContext();
  const navigate = useNavigate();

  //mount only
  useEffect(() => {
    getTrendingMovies();
  }, [currentPage]);

  useEffect(() => {
    return () => {
      dispatch({ type: "UPDATE_CURRENTPAGE", payload: 1 });
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

      <Pagination />
      <div className="trending-movies-list">
        {isPending && (
          <p className={`info ${mode === "light" && "dark-color"}`}>
            Loading ...
          </p>
        )}

        {movies &&
          movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
      </div>
    </section>
  );
}
