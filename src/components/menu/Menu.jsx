import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "../styles/Menu.css";
import { useState } from "react";

const navs = [
  <div>
    <h2>Text 1</h2>
    <nav>
      <a style={{ animationDelay: "0.8s" }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, tenetur?
      </a>
      <a style={{ animationDelay: "0.9s" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, quam?
      </a>
      <a style={{ animationDelay: "1s" }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam,
        similique.
      </a>
    </nav>
  </div>,

  <div>
    <h2>Text 2</h2>
    <nav>
      <a style={{ animationDelay: "0.8s" }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, tenetur?
      </a>
      <a style={{ animationDelay: "0.9s" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, quam?
      </a>
      <a style={{ animationDelay: "1s" }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam,
        similique.
      </a>
    </nav>
  </div>,
];

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const openClass = isOpen ? "open" : "";

  return (
    <>
      <div className={`background ${openClass}`}></div>
      <button className={`burger ${openClass}`} onClick={toggleMenu}></button>
      <div className={`menu ${openClass}`}>
        <Swiper speed={750} modules={[Navigation]} navigation>
          {navs.map((nav) => (
            <SwiperSlide>{nav}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
