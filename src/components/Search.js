import "./Search.css";
import { useAppContext } from "../context/useAppContext";
import { useRef } from "react";
import SearchIcon from "../assets/search.svg";
import FavIcon from "../assets/favorite.svg";
import TrendIcon from "../assets/trending.svg";
export default function Search() {
  const { setSearchTerm } = useAppContext();

  const searchValue = useRef();

  const handleClick = () => {
    setSearchTerm(searchValue.current.value);
  };
  return (
    <section className="search-section">
      <button>
        <img src={TrendIcon} alt="" />
      </button>
      <button>
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
