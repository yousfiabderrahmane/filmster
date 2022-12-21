import React from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../../components/MovieCard";
import { useAppContext } from "../../context/useAppContext";
import "./FavoriteMovies.css";

export default function FavoriteMovies() {
  const { favList, dispatch } = useAppContext();
  const navigate = useNavigate();

  const handleClear = () => {
    dispatch({ type: "CLEAR_FAVLIST" });
  };
  return (
    <section className="favorite-movies-page">
      <div className="favorite-page-header">
        <h2>My Favorite Movies</h2>
        <button onClick={handleClear}>Clear</button>
        <button onClick={() => navigate("/")}>Back Home</button>
      </div>
      <div className="favorite-page-list">
        {favList &&
          favList.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
      </div>
    </section>
  );
}
