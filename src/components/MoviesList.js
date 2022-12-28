import { useEffect, useState } from "react";
import "./MoviesList.css";
import { useAppContext } from "../context/useAppContext";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

export default function MoviesList() {
  const { list, isPending, error, getTrendingHomeMovies, mode, currentPage } =
    useAppContext();

  //mount only
  useEffect(() => {
    // !! bach n7wloha boolean , !!! la negation ta3 dak lboolean
    if (list.length < 1) {
      getTrendingHomeMovies();
    }
  }, []);

  useEffect(() => {
    getTrendingHomeMovies();
  }, [currentPage]);
  return (
    <>
      {error && (
        <p className={`info ${mode === "light" && "dark-color"}`}>{error}</p>
      )}

      {!error && <Pagination />}

      {isPending ? (
        <p className={`info ${mode === "light" && "dark-color"}`}>
          Loading ...
        </p>
      ) : (
        <>
          <section className="movies-list">
            {list &&
              list.map((item) => {
                return <MovieCard movie={item} key={item.id} />;
              })}
          </section>
        </>
      )}
    </>
  );
}
