import { useEffect, useCallback } from "react";
import "./MoviesList.css";
import { UseMovieContext } from "../../context/Context";
import { MovieCard } from "./../MovieCard/MovieCard";
import { Pagination } from "../Pagination/Pagination";

import { ActionNames } from "../../context/Context";

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
  } = UseMovieContext();

  console.log(totalPages, currentPage);

  const handlePrevious = useCallback(() => {
    dispatch({
      type: ActionNames.UPDATE_CURRENTPAGE,
      payload: currentPage - 1,
    });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage, dispatch]);

  const handleNext = useCallback(() => {
    dispatch({
      type: ActionNames.UPDATE_CURRENTPAGE,
      payload: currentPage + 1,
    });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage, dispatch]);

  useEffect(() => {
    getTrendingHomeMovies();
  }, [currentPage, getTrendingHomeMovies]);

  //mount only
  useEffect(() => {
    if (list.length < 1) {
      getTrendingHomeMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, getTrendingHomeMovies]);

  return (
    <>
      {isPending ? (
        <div className={`center-me`}>
          {/* Handle style !!! TODO */}
          <h1>Loading . . .</h1>
        </div>
      ) : (
        <>
          {error ? (
            <p className={`info ${mode === "light" && "dark-color"}`}>
              {error}
            </p>
          ) : (
            <section className="movies-list">
              {list &&
                list.map((item, index) => {
                  return <MovieCard index={index} movie={item} key={item.id} />;
                })}
            </section>
          )}
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
