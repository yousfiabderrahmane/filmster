import { useAppContext } from "../../context/useAppContext";
import Alternative from "../../assets/download.png";
import "./Cast.css";
export default function Cast() {
  const { cast, mode } = useAppContext();
  console.log(cast);
  return (
    <section className="cast-container">
      {cast.map((member) => (
        <div
          style={{ borderColor: mode === "light" && "#121212" }}
          className="cast-card"
        >
          <img
            src={
              member.profile_path == null
                ? Alternative
                : `http://image.tmdb.org/t/p/w500${member.profile_path}`
            }
          />
          <h4 className={`${mode === "light" && "dark-color"}`}>
            {member.name}
          </h4>
          <p className={`${mode === "light" && "dark-color"}`}>
            <span>Role :</span> {member.character}
          </p>
        </div>
      ))}
    </section>
  );
}
