import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SIngleMovieDetails.css";

import { ReactComponent as Close } from "../../assets/close_FILL0_wght400_GRAD0_opsz48 (1).svg";
import { ReactComponent as noReviews } from "../../assets/norev.svg";

import { useAppContext } from "../../context/useAppContext";
import Similar from "../../components/Similar";
import Slider from "./Slider";
import Cast from "./Cast";

export default function SingleMovieDetails() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState(null);
  const [key, setKey] = useState(null);

  const { mode, dispatch, people, fetchCast } = useAppContext();
  const [showSimilar, setShowSimilar] = useState(true);

  const [showMore, setShowMore] = useState(false);
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
          setShowSimilar(false);
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

  const getSimilarMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=19dc8c994b8ef838ba65a40c5ea44444`
    );
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: "UPDATE_SIMILAR", payload: data.results });
    }
  };

  const getComments = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=19dc8c994b8ef838ba65a40c5ea44444`
      );
      if (response.ok) {
        const data = await response.json();
        const { results } = data;
        if (response.ok) {
          const newResults = results.filter((result) => {
            return result.author_details.avatar_path != null;
          });

          dispatch({ type: "UPDATE_REVIEWS", payload: newResults });

          //LOL IM A GENIUS AHAHSDHASHDHAHAHAHAHHAHA
        } else {
          dispatch({ type: "ERROR", payload: "Could not fetch the data" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovieById();
    getTrailerKey();
    if (showSimilar) {
      getSimilarMovies();
    }
    getComments(id);
    fetchCast(id);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return () => {
      dispatch({ type: "UPDATE_SIMILAR", payload: [] });
    };
  }, [id]);

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
                onClick={() => navigate("/")}
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
              <div className="details-left">
                <div className="div">
                  <h2>Details</h2>
                  <p className="space-between">
                    <span className={`${mode === "light" && "dark-color"}`}>
                      Language :
                    </span>{" "}
                    <span className={`red `}>
                      {movie.original_language.toUpperCase()}
                    </span>
                  </p>
                  <p className="space-between">
                    <span className={`${mode === "light" && "dark-color"}`}>
                      Length :
                    </span>{" "}
                    <span className={`red `}>{movie.runtime} minutes</span>
                  </p>
                  <p className="space-between">
                    <span className={`${mode === "light" && "dark-color"}`}>
                      Rate :
                    </span>{" "}
                    <span className={`red `}>{movie.vote_average}/10</span>
                  </p>
                  <p className="space-between">
                    <span className={`${mode === "light" && "dark-color"}`}>
                      Budget :
                    </span>{" "}
                    <span className={`red `}>{movie.budget}</span>
                  </p>
                  <p className="space-between">
                    <span className={`${mode === "light" && "dark-color"}`}>
                      Release Date :
                    </span>{" "}
                    <span className={`red `}>{movie.release_date}</span>
                  </p>
                </div>

                <div className="genres">
                  <h3 className={`${mode === "light" && "dark-color"}`}>
                    Genres
                  </h3>
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
              </div>
              <div className="details-right">
                <h2>Reviews</h2>
                {people.length >= 2 ? (
                  <>
                    {" "}
                    <Slider showMore={showMore} />
                    <button
                      className={`showmore-btn ${
                        mode === "light" && "dark-color"
                      } `}
                      onClick={() => setShowMore(!showMore)}
                    >
                      {showMore ? "Shorten" : "Expand"}
                    </button>
                  </>
                ) : (
                  <div>
                    <h2 style={{ color: mode === "dark" ? "#fff" : "#121212" }}>
                      There is no reviews yet
                    </h2>
                  </div>
                )}
              </div>
            </div>

            <div className="cast">
              <h1>Top Cast :</h1>
              <Cast />
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
      {showSimilar && !isPending && <Similar />}
    </>
  );
}
