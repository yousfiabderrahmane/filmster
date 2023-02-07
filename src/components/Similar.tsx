import "./Similar.css";
import { UseMovieContext } from "../context/Context";
import { MovieCard } from "./MovieCard";

export default function Similar() {
  const { mode, similar } = UseMovieContext();

  return (
    <div className="similar">
      {similar.length > 1 && (
        <h1 className={`similar-title ${mode === "light" && "dark-color"}`}>
          You Might Also Like
        </h1>
      )}
      <div className="similar-container">
        {similar.map((tvshow, index) => {
          return <MovieCard key={index} movie={tvshow} />;
        })}
      </div>
    </div>
  );
}
