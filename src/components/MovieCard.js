import React, { useEffect, useRef, useState } from "react";
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/useAppContext";
import { ReactComponent as RatingStar } from "../assets/rating.svg";
import { ReactComponent as Favorite } from "../assets/removeFav.svg";
import { ReactComponent as AddFavIcon } from "../assets/AddToFav.svg";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import ImagePlaceHolder from "../assets/placeholder.jpg";
// import "react-lazy-load-image-component/src/effects/blur.css";

export default function MovieCard({ movie, index }) {
  const { favList, dispatch, mode } = useAppContext();
  const [isFavorite, setIsFavorite] = useState(false);

  const IMAGE_URL = `http://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/movie/${movie.id}`);
  };

  const cardRef = useRef();

  const handleAddFav = (movie) => {
    const IDS = favList.map((i) => {
      return i.id;
    });

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
    <section
      ref={cardRef}
      className={`movie-card ${isFavorite && "favorite-border"}`}
    >
      <div className={`sticker-container ${isFavorite && "favorite-bg"}`}>
        {isFavorite ? (
          <Favorite onClick={() => handleAddFav(movie)} fill="white" />
        ) : (
          <AddFavIcon onClick={() => handleAddFav(movie)} fill="white" />
        )}
      </div>

      <div className="lazy-image-container">
        <img
          onClick={handleNavigation}
          className="img"
          src={IMAGE_URL}
          alt={movie.original_title}
          height="100%"
          width="100%"
          fetchpriority={index === 0 && "high"}
          // effect="blur"
          // placeholderSrc={ImagePlaceHolder}
        />
      </div>

      <div
        onClick={handleNavigation}
        className={`overlay-info ${mode === "light" && "dark-color"}
`}
      >
        <h4>{movie.original_title ? movie.original_title : movie.name}</h4>{" "}
        <p className="rating-flex">
          <span> {movie.vote_average} </span>
          <div className="rating-star-container">
            {" "}
            <RatingStar
              className="rating-star"
              fill={mode === "light" ? "#121212" : "white"}
            />
          </div>
        </p>
      </div>
    </section>
  );
}
