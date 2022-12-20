import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrendingMovies.css";
import "../../components/MovieCard.css";
import MovieCard from "../../components/MovieCard";
import { useAppContext } from "../../context/useAppContext";
import Star from "../../assets/stars_FILL0_wght400_GRAD0_opsz48.svg";

export default function TrendingMovies() {
  const { movies, getTrendingMovies, error, isPending } = useAppContext();
  const navigate = useNavigate();
  const IMAGE_URL = `http://image.tmdb.org/t/p/w500`;

  console.log(movies);
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
          movies.map((movie) => (
            <div
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="movie-card"
            >
              <img
                className="img"
                src={`${IMAGE_URL}${movie.poster_path}`}
                alt={movie.original_title}
              />
              <div className="overlay-info">
                <h4>
                  {movie.original_title ? movie.original_title : movie.name}
                </h4>{" "}
                <h5>
                  {movie.release_date ? "Released in :" : "Release date :"}

                  {movie.release_date
                    ? movie.release_date
                    : movie.first_air_date}
                </h5>
                <p className="rating-flex">
                  <span> {movie.vote_average} </span>
                  <img src={Star} alt="" />
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
