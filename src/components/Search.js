import "./Search.css";
import { useAppContext } from "../context/useAppContext";
import { useRef, useState } from "react";
import SearchIcon from "../assets/search.svg";
import FavIcon from "../assets/favorite.svg";
import TrendIcon from "../assets/trending.svg";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchValue.current.value) {
      searchValue.current.focus();
    }
    dispatch({ type: "UPDATE_SEARCHTERM", payload: searchValue.current.value });
  };
  return (
    <section className="search-section">
      <button onClick={TrendRedirect}>
        <img src={TrendIcon} alt="" />
      </button>
      <button onClick={favRedirect}>
        <img src={FavIcon} alt="" />
      </button>
      <form onSubmit={handleSubmit}>
        <input
          ref={searchValue}
          type="text"
          placeholder="Search For A Movie..."
        />
        <button>
          <img src={SearchIcon} alt="" />
        </button>
      </form>
    </section>
  );
}
