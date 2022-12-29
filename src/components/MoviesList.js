import { useEffect, useCallback } from "react";
import "./MoviesList.css";
import { useAppContext } from "../context/useAppContext";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

import LoadingGif from "../assets/loading-gif.gif";

export default function MoviesList() {
  const {
    list,
    isPending,
    error,
    getTrendingHomeMovies,
    mode,
    dispatch,
    currentPage,
    totalPages,
  } = useAppContext();

  const handlePrevious = useCallback(() => {
    dispatch({
      type: "UPDATE_CURRENTPAGE",
      payload: currentPage - 1,
    });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage, dispatch]);

  const handleNext = useCallback(() => {
    dispatch({
      type: "UPDATE_CURRENTPAGE",
      payload: currentPage + 1,
    });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage, dispatch]);

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

      {isPending ? (
        <p className={`info ${mode === "light" && "dark-color"}`}>
          <img src={LoadingGif} alt="" />
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
      {!error && !isPending && (
        <Pagination
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
}
