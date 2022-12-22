import "./Search.css";
import { useAppContext } from "../context/useAppContext";
import { useRef } from "react";

// import TrendIcon from "../assets/trending.svg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as TrendIcon } from "../assets/trending.svg";
import { ReactComponent as FavIcon } from "../assets/favorite.svg";
import { ReactComponent as SearchIcon } from "../assets/search.svg";

export default function Search() {
  const { dispatch } = useAppContext();

  const searchValue = useRef();

  const navigate = useNavigate();

  //navigation
  const favRedirect = () => {
    navigate("/favorite");
  };
  const TrendRedirect = () => {
    navigate("/trending");
  };

  //handle searchterm state
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchValue.current.value) {
      searchValue.current.focus();
    }
    dispatch({
      type: "UPDATE_SEARCHTERM",
      payload: searchValue.current.value,
    });
  };
  return (
    <section className="search-section">
      <div className="left">
        <button onClick={TrendRedirect}>
          Trending
          <div className="trend-container">
            <TrendIcon fill="white" />
          </div>
        </button>
        <button onClick={favRedirect}>
          Favorites
          <div className="trend-container">
            <FavIcon fill="white" />
          </div>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="right">
          <input
            ref={searchValue}
            type="text"
            placeholder="Search For A Movie..."
          />
          <button>
            <div className="trend-container">
              <SearchIcon fill="white" />
            </div>
          </button>
        </div>
      </form>
    </section>
  );
}
