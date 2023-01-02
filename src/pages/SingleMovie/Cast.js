import { useAppContext } from "../../context/useAppContext";
import Alternative from "../../assets/download.png";
import "./Cast.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ImagePlaceHolder from "../../assets/placeholder.jpg";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function Cast() {
  const { cast, mode } = useAppContext();

  return (
    <section className="cast-container">
      {cast.map((member) => (
        <div
          style={{ borderColor: mode === "light" && "#121212" }}
          className="cast-card"
        >
          <div className="img-container">
            <LazyLoadImage
              src={
                member.profile_path == null
                  ? Alternative
                  : `http://image.tmdb.org/t/p/w500${member.profile_path}`
              }
              effect="blur"
              placeholderSrc={ImagePlaceHolder}
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
