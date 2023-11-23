import { gsap } from "gsap";
import Start from "../start/Start";
import "./HomePage.css";
import StartButton from "../start/button/StartButton";

export default function HomePage() {
  function handleOpening() {
    gsap.to(".clipper-left", {
      duration: 2,
      delay: 3,
      clipPath: "inset(0 100% 0 0)",
      ease: "power4.inOut",
      display: "none",
    });

    gsap.to(".clipper-right", {
      duration: 2,
      delay: 3,
      clipPath: "inset(0 0 0 100%)",
      ease: "power4.inOut",
      display: "none",
    });

    gsap.to(".site-content", {
      delay: 5,
      zIndex: 2,
    });

    gsap.to(".loader-text", {
      duration: 1.5,
      delay: 1,
      opacity: 1,
      ease: "power1.inOut",
    });

    gsap.from(".loader-wrapper", {
      duration: 3,
      scale: 0.9,
      ease: "power1.inOut",
    });

    gsap.to(".loader", {
      duration: 2.5,
      top: 0,
      ease: "power3.inOut",
    });

    gsap.to(
      ".loader-wrapper, .pre-loader",
      0.2,
      {
        opacity: 0,
        display: "none",
        ease: "power3.inOut",
        delay: 2.1,
      },
      "-=1"
    );

    gsap.to(".play", {
      duration: 2,
      scale: 0,
      ease: "power4.inOut",
      display: "none",
    });

    setTimeout(() => {
      gsap.to(".game__start, .game__button", {
        duration: 2,
        opacity: 1,
        ease: "power4.inOut",
      });
    }, "3000");
  }

  return (
    <div className="container">
      <div className="play">
        <button type="button" onClick={handleOpening} className="play">
          Enter the game
        </button>
      </div>
      <div className="pre-loader block">
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      </div>
      <div className="clipper-left">
        <div className="loader-text">La disparition</div>
      </div>
      <div className="clipper-right">
        <div className="loader-text">du Père Noël</div>
      </div>


      <div className="site-content">
        <div className="site-nav">
          <div className="site-logo">
            <a href="#">Santa Claus</a>
          </div>
          <div className="menu-toggle">Menu</div>
        </div>

        <div className="game__section">
          <img src="./src/assets/christmas-landscape13.png" alt="" />
          <div className="game__start">
            <Start />
          </div>
          <div className="game__button">
            <StartButton />
          </div>
        </div>
        
      </div>
      
    </div>
  );
}
