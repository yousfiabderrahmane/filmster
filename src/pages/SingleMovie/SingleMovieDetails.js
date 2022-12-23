import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SIngleMovieDetails.css";

import { ReactComponent as Close } from "../../assets/close_FILL0_wght400_GRAD0_opsz48 (1).svg";

import { useAppContext } from "../../context/useAppContext";

export default function SingleMovieDetails() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState(null);
  const [key, setKey] = useState(null);

  const { mode } = useAppContext();

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
      if (response.ok) {
        const data = await response.json();

        //deja chekina f context just in case bdl chi wa7d l id manually
        if (data.poster_path != null) {
          setMovie(data);
          setIsPending(false);
          setError(null);
        } else {
          setIsPending(false);
          setError("Oops, seems like the movie details doesn't exist yet");
          //bach ila movie id makaynach wl9a dik proprety success ykon nfs l err message maytbdl en deux deux
        }

        //ila 3ndo dik success proprety rah mal9a walo meskin
        if (data.hasOwnProperty("success")) {
          setMovie(null);
          setIsPending(false);
          setError("Oops, seems like the movie details doesn't exist yet");
        }
      } else {
        throw Error("Could not fetch data");
      }
    } catch (err) {
      console.log(err);
      setError("Oops, seems like the movie details doesn't exist yet");
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
      {isPending && (
        <p className={`info ${mode === "light" && "dark-color"}`}>
          Loading ...
        </p>
      )}
      {error && (
        <div className="error-redirect">
          <p className={`info ${mode === "light" && "dark-color"}`}>{error}</p>
          <button
            className={`${mode === "light" && "dark-color"}`}
            style={{ color: mode === "light" && "#121212" }}
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      )}
      {movie && (
        <section className="single-movie-page">
          <div className="left">
            <div style={{ height: !key && "100%" }} className="image-container">
              <img
                className="poster"
                src={`${IMAGE_URL}${movie.poster_path}`}
                alt=""
              />
            </div>
          </div>
          <div className="right">
            <button className="close-me">
              <Close
                fill={mode === "light" ? "#121212" : "white"}
                onClick={() => navigate(-1)}
              />
            </button>
            <div className="titles">
              <h1 className={`${mode === "light" && "dark-color"}`}>
                {movie.title}
              </h1>
              <h5 className={`${mode === "light" && "dark-color"}`}>
                {movie.tagline}
              </h5>
            </div>

            <div className="details">
              <p className="space-between">
                <span className={`${mode === "light" && "dark-color"}`}>
                  Language :
                </span>{" "}
                <span className={`${mode === "light" && "dark-color"}`}>
                  {movie.original_language.toUpperCase()}
                </span>
              </p>
              <p className="space-between">
                <span className={`${mode === "light" && "dark-color"}`}>
                  Length :
                </span>{" "}
                <span className={`${mode === "light" && "dark-color"}`}>
                  {movie.runtime} minutes
                </span>
              </p>
              <p className="space-between">
                <span className={`${mode === "light" && "dark-color"}`}>
                  Rate :
                </span>{" "}
                <span className={`${mode === "light" && "dark-color"}`}>
                  {movie.vote_average}/10
                </span>
              </p>
              <p className="space-between">
                <span className={`${mode === "light" && "dark-color"}`}>
                  Budget :
                </span>{" "}
                <span className={`${mode === "light" && "dark-color"}`}>
                  {movie.budget}
                </span>
              </p>
              <p className="space-between">
                <span className={`${mode === "light" && "dark-color"}`}>
                  Release Date :
                </span>{" "}
                <span className={`${mode === "light" && "dark-color"}`}>
                  {movie.release_date}
                </span>
              </p>
            </div>
            <div className="genres">
              <h3 className={`${mode === "light" && "dark-color"}`}>Genres</h3>
              <ul>
                {movie.genres.map((item) => (
                  <li
                    className={`${mode === "light" && "dark-color"}`}
                    key={item.id}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="overview">
              <h3 className={`${mode === "light" && "dark-color"}`}>
                Overview
              </h3>
              <p className={`${mode === "light" && "dark-color"}`}>
                {movie.overview}
              </p>
            </div>
            {key && (
              <div className="trailer">
                <h3 className={`${mode === "light" && "dark-color"}`}>
                  Trailer
                </h3>
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
