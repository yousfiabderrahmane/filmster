import React from "react";
import "./MovieCard.css";
import Star from "../assets/stars_FILL0_wght400_GRAD0_opsz48.svg";
import { useNavigate } from "react-router-dom";
import AddFavIcon from "../assets/AddToFav.svg";
import { useAppContext } from "../context/useAppContext";

export default function MovieCard({ movie }) {
  const { favList, setFavList } = useAppContext();
  const IMAGE_URL = `http://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const navigate = useNavigate();

  const handleAddFav = (movie) => {
    setFavList([...favList, movie]);
  };

  //mavigate to single movie details page
  const handleNavigation = () => {
    navigate(`/movie/${movie.id}`);
  };
  return (
    <section className="movie-card">
      <img
        className="sticker"
        src={AddFavIcon}
        alt=""
        onClick={() => handleAddFav(movie)}
      />

      <img
        onClick={handleNavigation}
        className="img"
        src={IMAGE_URL}
        alt={movie.original_title}
      />
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
