import { UseMovieContext } from "../context/Context";
import "./Pagination.css";

export default function Pagination({
  handleNext,
  handlePrevious,
  totalPages,
  currentPage,
}) {
  const { mode } = UseMovieContext();
  return (
    <div className="pagination-container">
      {currentPage > 1 && (
        <button
          className={`pagination-btn ${mode === "light" && "dark-color"}`}
          onClick={handlePrevious}
        >
          Previous
        </button>
      )}
      <button className={`middle ${mode === "light" && "dark-color"}`}>
        {currentPage}
      </button>
      {currentPage < totalPages && (
        <button
          className={`pagination-btn ${mode === "light" && "dark-color"}`}
          onClick={handleNext}
        >
          Next
        </button>
      )}
    </div>
  );
}
