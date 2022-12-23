import "./Header.css";
import { ReactComponent as MovieIcon } from "../assets/movie_FILL0_wght400_GRAD0_opsz48.svg";
import { ReactComponent as ModeIcon } from "../assets/mode-icon.svg";
import { useAppContext } from "../context/useAppContext";

export default function Header() {
  const { mode, dispatch } = useAppContext();
  return (
    <section className="header">
      <div className="header-svg">
        <ModeIcon
          onClick={() =>
            dispatch({
              type: "TOGGLE_MODE",
              payload: mode === "light" ? "dark" : "light",
            })
          }
          className="mode-icon"
          fill={mode === "light" ? "#121212" : "white"}
        />
      </div>

      <h1 className={`header-title ${mode === "light" && "dark-color"}`}>
        Y<span style={{ color: "#cc0000" }}>OU</span>SFILMS
      </h1>
      <div className="header-svg">
        {" "}
        <MovieIcon fill="#cc0000" />
      </div>
    </section>
  );
}
