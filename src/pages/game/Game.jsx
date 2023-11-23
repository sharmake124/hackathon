import { useState } from "react";
import { gsap } from "gsap";
import Input from "../../components/Input";
import Prompt from "../../components/Prompt";
import data from "./background.json";
import "./Game.css";

export default function Game() {
  const [isDisable, setIsDisable] = useState(false);
  const [background, setBackground] = useState(true);
  const [background1Image, setBackground1Image] = useState(0);
  const [background2Image, setBackground2Image] = useState(1);

  function handleResponse() {
    setIsDisable(true);

    gsap.to(".container__prompt", {
      duration: 2,
      top: "-100%",
      ease: "power4.inOut",
    });

    gsap.to(".container__button", {
      duration: 2,
      delay: 0.5,
      top: "-100%",
      ease: "power4.inOut",
    });

    gsap.to(".container__input", {
      duration: 2,
      delay: 0.75,
      top: "-100%",
      ease: "power4.inOut",
    });

    if (background) {
      gsap.to(".game__bg", {
        duration: 2,
        delay: 0.85,
        top: "-100%",
        ease: "power4.inOut",
      });
      gsap.to(".game__bg2", {
        duration: 2,
        delay: 0.85,
        top: 0,
        ease: "power4.inOut",
      });
      gsap.to(".game__bg", {
        duration: 2,
        delay: 2,
        top: "100%",
        ease: "power4.inOut",
      });
      setBackground(!background);

      setTimeout(() => {
        background1Image + 2 <= data.length
          ? setBackground1Image(background1Image + 2)
          : setBackground1Image(0);
      }, "2500");
    } else if (!background) {
      gsap.to(".game__bg", {
        duration: 2,
        delay: 0.85,
        top: 0,
        ease: "power4.inOut",
      });
      gsap.to(".game__bg2", {
        duration: 2,
        delay: 0.85,
        top: "-100%",
        ease: "power4.inOut",
      });
      gsap.to(".game__bg2", {
        duration: 2,
        delay: 2,
        top: "100%",
        ease: "power4.inOut",
      });

      setBackground(!background);
      setTimeout(() => {
        background2Image + 2 <= data.length
          ? setBackground2Image(background2Image + 2)
          : setBackground2Image(1);
      }, "2500");
    }

    setTimeout(() => {
      console.log("Delayed for 2.5 second.");
      console.log(background1Image, background2Image);

      gsap.to(".container__input", {
        duration: 2,
        top: "70%",
        ease: "power4.inOut",
      });

      gsap.to(".container__button", {
        duration: 2,
        delay: 0.5,
        top: "55%",
        ease: "power4.inOut",
      });

      gsap.to(".container__prompt", {
        duration: 2,
        delay: 0.75,
        top: "30%",
        ease: "power4.inOut",
      });
      setIsDisable(false);
    }, "2500");
  }

  return (
    <>
      <section id="section-1" className="game__main">
        <img
          className="game__bg"
          src={data[background1Image].bg}
          alt=""
          style={{ zIndex: background ? "1" : "0" }}
        />
        <div className="container__prompt">
          <Prompt />
        </div>
        <div className="container__button">
          <button
            type="button"
            onClick={handleResponse}
            disabled={isDisable}
          >
            Confirm you choice
          </button>
        </div>
        <div className="container__input">
          <Input />
        </div>
        <img
          className="game__bg2"
          src={data[background2Image].bg}
          alt=""
          style={{ zIndex: background ? "0" : "1" }}
        />
      </section>
    </>
  );
}
