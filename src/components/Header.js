import "./Header.css";
import { ReactComponent as MovieIcon } from "../assets/movie_FILL0_wght400_GRAD0_opsz48.svg";
import { ReactComponent as Light } from "../assets/light_mode_FILL0_wght400_GRAD0_opsz48 (1).svg";
import { ReactComponent as Dark } from "../assets/dark_mode_FILL0_wght400_GRAD0_opsz48 (1).svg";
import { useAppContext } from "../context/useAppContext";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export default function Header() {
  const { mode, dispatch } = useAppContext();

  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <section className="header">
      <div className="header-svg">
        {mode === "light" ? (
          <Dark
            onClick={() =>
              dispatch({
                type: "TOGGLE_MODE",
                payload: mode === "light" ? "dark" : "light",
              })
            }
            className="mode-icon"
            fill={mode === "light" ? "#121212" : "white"}
          />
        ) : (
          <Light
            onClick={() =>
              dispatch({
                type: "TOGGLE_MODE",
                payload: mode === "light" ? "dark" : "light",
              })
            }
            className="mode-icon"
            fill={mode === "light" ? "#121212" : "white"}
          />
        )}
      </div>

      <h1
        onClick={handleNavigate}
        className={`header-title ${mode === "light" && "dark-color"}`}
      >
        Y<span style={{ color: "#cc0000" }}>OU</span>SFILMS
      </h1>
      <div className="header-svg hide">
        {" "}
        <MovieIcon fill="#cc0000" />
      </div>
    </section>
  );
}
