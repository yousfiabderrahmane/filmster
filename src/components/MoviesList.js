import React from "react";
import "./MoviesList.css";
import { useAppContext } from "../context/useAppContext";
import MovieCard from "./MovieCard";
export default function MoviesList() {
  const { list, isPending, error } = useAppContext();

  return (
    <>
      {isPending && <p className="info">Loading ...</p>}
      {error && <p className="info">{error}</p>}
      <section className="movies-list">
        {list &&
          list.map((item, index) => {
            return <MovieCard key={item.id} index={index} />;
          })}
      </section>
    </>
  );
}
