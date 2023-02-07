import React, { useEffect } from "react";
import "./Slider.css";
import { ReactComponent as LeftArr } from "../../assets/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg";
import { ReactComponent as RightArr } from "../../assets/arrow_forward_ios_FILL0_wght400_GRAD0_opsz48.svg";
import { UseMovieContext } from "../../context/Context";

interface SliderProps {
  showMore: boolean;
}

export const Slider: React.FC<SliderProps> = ({ showMore }) => {
  const [index, setIndex] = React.useState(0);

  const { mode, people } = UseMovieContext();

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(
      () => {
        setIndex(index + 1);
      },
      showMore ? 1000000 : 5000
    );
    return () => {
      clearInterval(slider);
    };
  }, [index, showMore]);

  return (
    <section className="section">
      <div
        // style={{ overflowY: showMore && "scroll" }} TODO
        className={`section-center`}
      >
        {people?.map((person, personIndex) => {
          const img =
            person.author_details.avatar_path.charAt(1) === "h"
              ? person.author_details.avatar_path.slice(1)
              : `http://image.tmdb.org/t/p/w500/${person.author_details.avatar_path}`;

          const string = person.content;
          const count = 200;
          const content =
            string.slice(0, count) + (string.length > count ? "..." : "");

          let position = "nextSlide";

          if (personIndex === index) {
            position = "activeSlide";
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = "lastSlide";
          }

          return (
            <article className={position} key={person.id}>
              <div
                className="top-tier"
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <img
                  src={img}
                  alt={person.author_details.name}
                  className="person-img"
                />

                {/* todo styling h4 */}
                <h4 id={`${mode === "light" && "loading-black"}`}>
                  {person.author} ( {person.author_details.rating} ⭐ )
                </h4>
                <p className="title">{person.author_details.username}</p>
              </div>

              <p className={`text ${mode === "light" && "dark-color"} `}>
                {showMore ? person.content : content}
              </p>
            </article>
          );
        })}
        {people.length > 1 && (
          <>
            <div className="arrow-container">
              <button className="prev" onClick={() => setIndex(index - 1)}>
                <LeftArr fill="#c00" />
              </button>
            </div>
            <div className="arrow-container">
              <button className="next" onClick={() => setIndex(index + 1)}>
                <RightArr fill="#c00" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
