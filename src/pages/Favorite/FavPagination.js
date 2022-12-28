import React from "react";
import "./favPagination.css";
export default function FavPagination({
  currentPage,
  setCurrentPage,
  totalPages,
  currentFavList,
}) {
  if (currentFavList.length == 0) {
    setCurrentPage(currentPage - 1);
  }
  return (
    <div className="favPagination-container">
      <button
        className="pagination"
        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
      >
        ◀
      </button>
      <button>{currentPage}</button>
      <button
        className="pagination"
        onClick={() =>
          currentPage < totalPages && setCurrentPage(currentPage + 1)
        }
      >
        ▶
      </button>
    </div>
  );
}
