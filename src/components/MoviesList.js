import { useEffect, useCallback } from "react";
import "./MoviesList.css";
import { useAppContext } from "../context/useAppContext";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
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

  useEffect(() => {
    getTrendingHomeMovies();
  }, [currentPage]);

  //mount only
  useEffect(() => {
    dispatch({
      type: "UPDATE_CURRENTPAGE",
      payload: 1,
    });
    if (list.length < 1) {
      getTrendingHomeMovies();
    }
  }, []);

  return (
    <>
      {error && (
        <p className={`info ${mode === "light" && "dark-color"}`}>{error}</p>
      )}

      {isPending ? (
        <div className={`center-me`}>
          <h1 style={{ color: mode === "light" && "#121212" }}>
            Loading . . .
          </h1>
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
