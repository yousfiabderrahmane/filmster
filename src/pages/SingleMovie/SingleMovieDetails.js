import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import "./SIngleMovieDetails.css";
import { ReactComponent as Close } from "../../assets/close_FILL0_wght400_GRAD0_opsz48 (1).svg";
import { useAppContext } from "../../context/useAppContext";
import Similar from "../../components/Similar";
import Slider from "./Slider";
import Cast from "./Cast";
import API_KEY from "../../context/test";

export default function SingleMovieDetails() {
  const [key, setKey] = useState(null);

  const {
    mode,
    dispatch,
    people,
    fetchCast,
    singleMovie,
    fetchMovieById,
    isPending,
    error,
    getReviews,
    getSimilarMovies,
    similar,
    cast,
  } = useAppContext();
  const [showMore, setShowMore] = useState(false);

  //to get the urls
  const IMAGE_URL = `http://image.tmdb.org/t/p/w500`;

  const { id } = useParams();
  const navigate = useNavigate();

  //get trailer key
  const getTrailerKey = useCallback(async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
    );
    if (response.ok) {
      const data = await response.json();
      setKey(data.results[0].key);
    } else {
      throw Error("you dumb fuck");
    }
  }, [id]);

  useEffect(() => {
    fetchMovieById(id);
    getReviews(id);
    fetchCast(id);
    getTrailerKey();
    getSimilarMovies(id);

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    return () => {
      dispatch({ type: "UPDATE_SIMILAR", payload: [] });
      dispatch({ type: "UPDATE_SINGLEMOVIE", payload: null });
      dispatch({ type: "UPDATE_CAST", payload: [] });
    };
  }, [
    dispatch,
    fetchCast,
    fetchMovieById,
    getReviews,
    getSimilarMovies,
    getTrailerKey,
    id,
  ]);

  return (
    <>
      {isPending && (
        <div className={`center-me ${mode === "light" && "dark-color"}`}>
          <h1 style={{ color: mode === "light" && "#121212" }}>
            Loading . . .
          </h1>
        </div>
      )}
      {error && (
        <div className={`error-redirect ${mode === "light" && "dark-color"}`}>
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
      {singleMovie && (
        <section className="single-movie-page">
          <div className="left">
            <div style={{ height: !key && "60%" }} className="image-container">
              <img
                className="poster"
                src={`${IMAGE_URL}${singleMovie.poster_path}`}
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
              <div className="big-t">
                <h1
                  style={{ backgroundColor: mode === "light" && "#121212" }}
                  className={`${mode === "light" && "dark-color"}`}
                >
                  {singleMovie.title}
                </h1>
              </div>
              <h5 className={`${mode === "light" && "dark-color"}`}>
                {singleMovie.tagline}
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
                      {singleMovie.original_language.toUpperCase()}
                    </span>
                  </p>
                  <p className="space-between">
                    <span className={`${mode === "light" && "dark-color"}`}>
                      Length :
                    </span>{" "}
                    <span className={`red `}>
                      {singleMovie.runtime} minutes
                    </span>
                  </p>
                  <p className="space-between">
                    <span className={`${mode === "light" && "dark-color"}`}>
                      Rate :
                    </span>{" "}
                    <span className={`red `}>
                      {singleMovie.vote_average}/10
                    </span>
                  </p>
                  <p className="space-between">
                    <span className={`${mode === "light" && "dark-color"}`}>
                      Budget :
                    </span>{" "}
                    <span className={`red `}>{singleMovie.budget}</span>
                  </p>
                  <p className="space-between">
                    <span className={`${mode === "light" && "dark-color"}`}>
                      Release Date :
                    </span>{" "}
                    <span className={`red `}>{singleMovie.release_date}</span>
                  </p>
                </div>

                <div className="genres">
                  <h3 className={`${mode === "light" && "dark-color"}`}>
                    Genres
                  </h3>
                  <ul>
                    {singleMovie.genres.map((item) => (
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
                      style={{ position: showMore && "unset" }}
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
            {cast.length > 1 && (
              <div className="cast">
                <h1>Top Cast </h1>
                <Cast />
              </div>
            )}

            <div className="overview">
              <h3 className={`${mode === "light" && "dark-color"}`}>
                Overview
              </h3>
              <p className={`${mode === "light" && "dark-color"}`}>
                {singleMovie.overview}
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
      {!isPending && singleMovie && similar.length > 0 && <Similar />}
    </>
  );
}
