import "./Similar.css";
import { useAppContext } from "../context/useAppContext";
import MovieCard from "./MovieCard";
import { useEffect } from "react";

export default function Similar() {
  const { mode, similar, dispatch } = useAppContext();

  return (
    <div className="similar">
      {similar.length > 1 && (
        <h1 className={`similar-title ${mode === "light" && "dark-color"}`}>
          You Might Also Like
        </h1>
      )}
      <div className="similar-container">
        {similar.map((tvshow) => {
          return <MovieCard movie={tvshow} />;
        })}
      </div>
    </div>
  );
}