import "./Search.css";
import { useAppContext } from "../context/useAppContext";
import { useRef } from "react";
import SearchIcon from "../assets/search.svg";
import FavIcon from "../assets/favorite.svg";
import TrendIcon from "../assets/trending.svg";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const { setSearchTerm } = useAppContext();

  const searchValue = useRef();

  const navigate = useNavigate();

  //navigation
  const favRedirect = () => {
    navigate("/favorite");
  };
  const TrendRedirect = () => {
    navigate("/trending");
  };

  const handleClick = () => {
    setSearchTerm(searchValue.current.value);
  };
  return (
    <section className="search-section">
      <button onClick={TrendRedirect}>
        <img src={TrendIcon} alt="" />
      </button>
      <button onClick={favRedirect}>
        <img src={FavIcon} alt="" />
      </button>
      <input
        ref={searchValue}
        type="text"
        placeholder="Search For A Movie..."
      />
      <button onClick={handleClick}>
        <img src={SearchIcon} alt="" />
      </button>
    </section>
  );
}
