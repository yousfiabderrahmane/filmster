import "./Search.css";
import { useAppContext } from "../context/useAppContext";
import { useRef } from "react";
export default function Search() {
  const { setSearchTerm } = useAppContext();

  const searchValue = useRef();

  const handleClick = () => {
    setSearchTerm(searchValue.current.value);
  };
  return (
    <section className="search-section">
      <input
        ref={searchValue}
        type="text"
        placeholder="Search For A Movie..."
      />
      <button onClick={handleClick}>Search</button>
    </section>
  );
}
