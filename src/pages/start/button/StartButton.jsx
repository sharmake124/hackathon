import React from "react";
import "./StartButton.css";

export default function StartButton() {
  return (
    <button className="buttonStart" type="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" />
      </svg>
    </button>
  );
}
