import { useAppContext } from "../context/useAppContext";
import "./Pagination.css";
export default function Pagination() {
  const { currentPage, dispatch, totalPages } = useAppContext();

  return (
    <div className="pagination-container">
      <button
        className="pagination-btn"
        onClick={() => dispatch({ type: "UPDATE_CURRENTPAGE", payload: 1 })}
      >
        First
      </button>
      <button
        className="pagination-btn"
        onClick={() =>
          dispatch({
            type: "UPDATE_CURRENTPAGE",
            payload: currentPage > 1 ? currentPage - 1 : 1,
          })
        }
      >
        ◀
      </button>
      <button> {currentPage}</button>
      <button
        className="pagination-btn"
        onClick={() =>
          dispatch({
            type: "UPDATE_CURRENTPAGE",
            payload: currentPage < totalPages ? currentPage + 1 : totalPages,
          })
        }
      >
        {" "}
        ▶
      </button>
      <button
        className="pagination-btn"
        onClick={() =>
          dispatch({ type: "UPDATE_CURRENTPAGE", payload: totalPages })
        }
      >
        {" "}
        Last
      </button>
    </div>
  );
}
