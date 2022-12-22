import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrendingMovies.css";
import "../../components/MovieCard.css";
import MovieCard from "../../components/MovieCard";
import { useAppContext } from "../../context/useAppContext";
import Star from "../../assets/stars_FILL0_wght400_GRAD0_opsz48.svg";

export default function TrendingMovies() {
  const { movies, getTrendingMovies, isPending } = useAppContext();
  const navigate = useNavigate();

  //mount only
  useEffect(() => {
    getTrendingMovies();
  }, []);

  return (
    <section className="trending-movies-page">
      <div className="page-header">
        <h2 className="page-title">Most Popular Movies Right Now</h2>
        <button onClick={() => navigate("/")}>Back Home</button>
      </div>

      <div className="trending-movies-list">
        {isPending && <p className="info">Loading ...</p>}
        {movies &&
          movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
      </div>
    </section>
  );
}
