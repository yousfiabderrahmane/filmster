import { useEffect, useCallback } from "react";
import "./MoviesList.css";
import { useAppContext } from "../context/useAppContext";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

import LoadingGif from "../assets/loading-gif.gif";
import Search from "./Search";

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
    setTimeout(() => {
      if (list.length < 1) {
        getTrendingHomeMovies();
      }
    }, 200);
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
        <div className={`center-me ${mode === "light" && "dark-color"}`}>
          <h1>Loading . . .</h1>
        </div>
      ) : (
        <>
          <Search />
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
