import { UseMovieContext } from "../../context/Context";
// import Alternative from "../../assets/download.png";
import "./Cast.css";

const logo = require("../../assets/download.png");

export default function Cast() {
  const { cast, mode } = UseMovieContext();

  return (
    <section className="cast-container">
      {cast.map((member, index) => (
        <div
          key={index}
          // style={{ borderColor: mode === "light" && "#121212" }}
          className="cast-card"
        >
          <div className="img-container">
            <img
              src={
                member.profile_path == null
                  ? logo
                  : `http://image.tmdb.org/t/p/w500${member.profile_path}`
              }
              alt={`Dah number : ${member.id}`}
              height="100%"
              width="100%"
            />
          </div>

          <div className="cast-details">
            {" "}
            <h4 className={`${mode === "light" && "dark-color"}`}>
              {member.name}
            </h4>
            <p className={`${mode === "light" && "dark-color"}`}>
              <span>Role :</span> {member.character}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
