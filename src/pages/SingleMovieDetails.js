import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SIngleMovieDetails.css";
import Close from "../assets/close_FILL0_wght400_GRAD0_opsz48 (1).svg";
import FavIcon from "../assets/favorite.svg";
import RedHeart from "../assets/red-heart-icon.svg";

export default function SingleMovieDetails() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState(null);
  const [key, setKey] = useState(null);

  //temporary
  const [isFavorite, setIsFavorite] = useState(false);

  //to get the urls
  const IMAGE_URL = `http://image.tmdb.org/t/p/w500`;

  const { id } = useParams();
  const navigate = useNavigate();

  //fetch movie by id
  const fetchMovieById = async () => {
    setIsPending(true);
    setError(null); //in case kant deja
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=19dc8c994b8ef838ba65a40c5ea44444`
      );
      const data = await response.json();

      //deja chekina f context just in case bdl chi wa7d l id manually
      if (data.poster_path != null) {
        setMovie(data);
        setIsPending(false);
        setError(null);
      } else {
        setIsPending(false);
        setError("Oops, seems like the movie doesn't exist");
        //bach ila movie id makaynach wl9a dik proprety success ykon nfs l err message maytbdl en deux deux
      }

      //ila 3ndo dik success proprety rah mal9a walo meskin
      if (data.hasOwnProperty("success")) {
        setMovie(null);
        setIsPending(false);
        setError("Oops, seems like the movie doesn't exist");
      }
    } catch (err) {
      console.log(err);
      setError("Oops, seems like the movie doesn't exist");
      setIsPending(false);
    }
  };

  //get trailer key
  const getTrailerKey = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19dc8c994b8ef838ba65a40c5ea44444`
    );
    const data = await response.json();
    setKey(data.results[0].key);
  };
  useEffect(() => {
    fetchMovieById();
    getTrailerKey();
  }, []);

  return (
    <>
      {isPending && <p className="info">Loading ...</p>}
      {error && <p className="info">{error}</p>}
      {movie && key && (
        <section className="single-movie-page">
          <button className="close-me">
            <img onClick={() => navigate("/")} src={Close} alt="" />
          </button>
          <div className="left">
            <div className="image-container">
              <img
                className="poster"
                src={`${IMAGE_URL}${movie.poster_path}`}
                alt=""
              />
            </div>

            <div className="add-to-fav">
              <p>Add to favourites :</p>
              <img
                onClick={() => setIsFavorite(!isFavorite)}
                src={isFavorite ? RedHeart : FavIcon}
                alt=""
              />
            </div>
          </div>
          <div className="right">
            <div className="titles">
              <h1>{movie.title}</h1>
              <h5>{movie.tagline}</h5>
            </div>

            <div className="details">
              <p className="space-between">
                <span>Language :</span>{" "}
                <span>{movie.original_language.toUpperCase()}</span>
              </p>
              <p className="space-between">
                <span>Length :</span> <span>{movie.runtime} minutes</span>
              </p>
              <p className="space-between">
                <span>Rate :</span> <span>{movie.vote_average}/10</span>
              </p>
              <p className="space-between">
                <span>Budget :</span> <span>{movie.budget}</span>
              </p>
              <p className="space-between">
                <span>Release Date :</span> <span>{movie.release_date}</span>
              </p>
            </div>
            <div className="genres">
              <h3>Genres</h3>
              <ul>
                {movie.genres.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            </div>
            <div className="overview">
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>
            <div className="trailer">
              <h3>Trailer</h3>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${key}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
