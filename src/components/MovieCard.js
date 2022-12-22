import React, { useEffect, useState } from "react";
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";
import AddFavIcon from "../assets/AddToFav.svg";
import { useAppContext } from "../context/useAppContext";
import RateStar from "../assets/rating.svg";
import RemoveFav from "../assets/removeFav.svg";
import Star from "../assets/star-svgrepo-com.svg";

export default function MovieCard({ movie }) {
  const { favList, dispatch } = useAppContext();
  const [isFavorite, setIsFavorite] = useState(false);

  const IMAGE_URL = `http://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleAddFav = (movie) => {
    const IDS = favList.map((i) => {
      return i.id;
    });
    console.log(IDS);
    //nchecki ila kan had lmovie kayna, la kayna manzidhach ;)

    if (favList.length < 1) {
      //flwl kikom empty so IDS braso makaynch so zid
      dispatch({ type: "UPDATE_FAVLIST", payload: [...favList, movie] });
    } else if (!IDS.includes(movie.id)) {
      // check ila IDS array mafihch l'id dl current movie
      dispatch({ type: "UPDATE_FAVLIST", payload: [...favList, movie] });
    } else if (IDS.includes(movie.id)) {
      //sinon ila kayn deleteh
      const newList = favList.filter((myMovie) => {
        return myMovie.id !== movie.id;
      });
      dispatch({ type: "UPDATE_FAVLIST", payload: newList });
      setIsFavorite(false);
    }
  };

  //check if movie is in the favlist bach nl3bo b favicon
  useEffect(() => {
    favList.forEach((mymovie) => {
      if (mymovie.id === movie.id) {
        setIsFavorite(true);
      }
    });
  }, [favList]);

  return (
    <section className={`movie-card ${isFavorite && "favorite-border"}`}>
      <div className={`sticker-container ${isFavorite && "favorite-bg"}`}>
        <img
          className="sticker"
          src={isFavorite ? Star : AddFavIcon}
          alt=""
          onClick={() => handleAddFav(movie)}
        />
      </div>

      <img
        onClick={handleNavigation}
        className="img"
        src={IMAGE_URL}
        alt={movie.original_title}
      />
      <div className="overlay-info">
        <h4>{movie.original_title}</h4>{" "}
        {/* <h5 className="rating-flex">
          <span>Released in :</span> <span>{movie.release_date}</span>{" "}
        </h5> */}
        <p className="rating-flex">
          <span> {movie.vote_average} </span>
          <img src={RateStar} alt="" />
        </p>
      </div>
    </section>
  );
}
