import React, { useEffect, useState } from "react";
import "./MovieCard.css";
import Star from "../assets/stars_FILL0_wght400_GRAD0_opsz48.svg";
import { useNavigate } from "react-router-dom";
import AddFavIcon from "../assets/AddToFav.svg";
import { useAppContext } from "../context/useAppContext";

export default function MovieCard({ movie }) {
  const { favList, dispatch } = useAppContext();
  const [isFavorite, setIsFavorite] = useState(false);

  const IMAGE_URL = `http://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleAddFav = (movie) => {
    const names = favList.map((i) => {
      return i.original_title;
    });

    //nchecki ila kan had lmovie kayna, la kayna manzidhach ;)
    //flwl kikom empty so names braso makaynch
    if (favList.length < 1) {
      // setFavList([...favList, movie]);
      dispatch({ type: "UPDATE_FAVLIST", payload: [...favList, movie] });
    } else if (!names.includes(movie.original_title)) {
      // setFavList([...favList, movie]);
      dispatch({ type: "UPDATE_FAVLIST", payload: [...favList, movie] });
    } else if (names.includes(movie.original_title)) {
      const newList = favList.filter((myMovie) => {
        return myMovie.id !== movie.id;
      });
      dispatch({ type: "UPDATE_FAVLIST", payload: newList });
      setIsFavorite(false);
    }
  };
  //check if movie is in the favlist
  useEffect(() => {
    favList.forEach((mymovie) => {
      if (mymovie.id === movie.id) {
        setIsFavorite(true);
      }
    });
  }, [favList]);

  return (
    <section className="movie-card">
      <img
        className="sticker"
        src={isFavorite ? Star : AddFavIcon}
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
