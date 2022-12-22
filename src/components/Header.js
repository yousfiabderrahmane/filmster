import "./Header.css";
import { ReactComponent as MovieIcon } from "../assets/movie_FILL0_wght400_GRAD0_opsz48.svg";

export default function Header() {
  return (
    <section className="header">
      <h1 className="header-title">
        Y<span style={{ color: "#cc0000" }}>OU</span>SFILMS
      </h1>
      <MovieIcon fill="#cc0000" />
    </section>
  );
}
