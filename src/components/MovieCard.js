import React from "react";
import { useAppContext } from "../context/useAppContext";
import "./MovieCard.css";
import Star from "../assets/stars_FILL0_wght400_GRAD0_opsz48.svg";
export default function MovieCard({ index }) {
  const { list } = useAppContext();
  const movie = list[index];
  const IMAGE_URL = `http://image.tmdb.org/t/p/w500${movie.poster_path}`;
  return (
    <section className="movie-card">
      <img className="img" src={IMAGE_URL} alt={movie.original_title} />
      <div className="overlay-info">
        <h4>{movie.original_title}</h4>{" "}
        <h5>Released in : {movie.release_date}</h5>
        <p className="rating-flex">
          <span> {movie.vote_average} </span>
          <img src={Star} alt="" />
        </p>
      </div>
    </section>
  );
}