import { useState, useEffect, useContext } from "react";
import { gsap } from "gsap";
//import { useLoaderData } from "react-router-dom";
import OpenAI from "openai";
import Input from "../../components/Input";
import Prompt from "../../components/Prompt";
import data from "./background.json";
import "./Game.css";
import LoaderOne from "../../components/LoaderOne";
import { PromptContext } from "../../PromptContext";

export default function Game({ promptArray }) {
  const [isDisable, setIsDisable] = useState(false);
  const [background, setBackground] = useState(true);
  const [background1Image, setBackground1Image] = useState(0);
  const [background2Image, setBackground2Image] = useState(1);
  const [pOne, setPOne] = useState("waiting");
  const [inputOne, setInputOne] = useState(false);
  const [inputOneValue, setInputOneValue] = useState("");
  const [pTwo, setPTwo] = useState("");
  const [inputTwo, setInputTwo] = useState(false);
  const [inputTwoValue, setInputTwoValue] = useState("");
  const [pThree, setPThree] = useState("");
  const [inputThree, setInputThree] = useState(false);
  const [inputThreeValue, setInputThreeValue] = useState("");
  const [pFour, setPFour] = useState("");
  const [inputFour, setInputFour] = useState(false);
  const [inputFourValue, setInputFourValue] = useState("");

  let arrayHistory = [];

  let AIdata = useContext(PromptContext);

  console.log(AIdata);

  AIdata.forEach((element) => {
    if (element.length > 10) {
      arrayHistory.push(element);
    }
  });

  useEffect(() => {
    if (pOne === "waiting") {
      promptArray.push({
        role: "system",
        content: `racconte entre 80 et 100 mots l'histoire correspondante : ${arrayHistory[0]}. Demande à l'utilisateur ce qu'il ferait.`,
      });
      stepOne(promptArray);
    }
  }, []);

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

  const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });

  async function stepOne(promptArray) {
    console.log(promptArray);
    const completion = await openai.chat.completions.create({
      messages: promptArray,
      model: "gpt-3.5-turbo",
    });
    promptArray.push({
      role: "assistant",
      content: completion.choices[0].message.content,
    });
    setPOne(completion.choices[0].message.content);
    setInputOne(true);
  }

  function handleInputOne(text) {
    promptArray.push(
      {
        role: "system",
        content: `En te basant sur la prochaine réponse de l'utilisateur, continue l'histoire par la partie suivante : ${arrayHistory[1]}.`,
      },
      {
        role: "user",
        content: text,
      }
    );
    setInputOne(false);
    setPTwo("waiting");
    handleResponse();
    stepTwo(promptArray);
  }

  async function stepTwo(promptArray) {
    console.log(promptArray);
    const completion = await openai.chat.completions.create({
      messages: promptArray,
      model: "gpt-3.5-turbo",
    });
    promptArray.push({
      role: "assistant",
      content: completion.choices[0].message.content,
    });
    setPTwo(completion.choices[0].message.content);
    setInputTwo(true);
  }

  function handleInputTwo(text) {
    promptArray.push(
      {
        role: "system",
        content: `En te basant sur la prochaine réponse de l'utilisateur, continue l'histoire par la partie suivante : ${arrayHistory[2]}.`,
      },
      {
        role: "user",
        content: text,
      }
    );
    setInputTwo(false);
    setPThree("waiting");
    handleResponse();
    stepThree(promptArray);
  }

  async function stepThree(promptArray) {
    console.log(promptArray);
    const completion = await openai.chat.completions.create({
      messages: promptArray,
      model: "gpt-3.5-turbo",
    });
    promptArray.push({
      role: "assistant",
      content: completion.choices[0].message.content,
    });
    setPThree(completion.choices[0].message.content);
    setInputThree(true);
  }

  function handleInputThree(text) {
    promptArray.push(
      {
        role: "system",
        content: `En te basant sur la prochaine réponse de l'utilisateur, continue l'histoire par la partie suivante : ${arrayHistory[3]}.`,
      },
      {
        role: "user",
        content: text,
      }
    );
    setInputThree(false);
    setPFour("waiting");
    handleResponse();
    stepFour(promptArray);
  }

  async function stepFour(promptArray) {
    console.log(promptArray);
    const completion = await openai.chat.completions.create({
      messages: promptArray,
      model: "gpt-3.5-turbo",
    });
    promptArray.push({
      role: "assistant",
      content: completion.choices[0].message.content,
    });
    setPFour(completion.choices[0].message.content);
    setInputFour(true);
  }

  return (
    <>
      <section id="section-1" className="game__section">
        <img
          className="game__bg"
          src={data[background1Image].bg}
          alt=""
          style={{ zIndex: background ? "1" : "0" }}
        />
        <div className="container__prompt">
          {pOne !== "waiting" &&
          pTwo === "" &&
          pThree === "" &&
          pFour === "" ? (
            <Prompt text={pOne} />
          ) : null}
          {pOne === "waiting" ||
          pTwo === "waiting" ||
          pThree === "waiting" ||
          pFour === "waiting" ? (
            <div id="loader">
              <LoaderOne />
            </div>
          ) : null}
        </div>
        {/*<div className="container__button">
          <button
            type="button"
            className="inputbutton"
            onClick={handleResponse}
            disabled={isDisable}
          >
            Confirm you choice
  </button>
        </div>*/}
        <div className="container__input">
          {inputOne === true ? (
            <Input
              handle={handleInputOne}
              input={inputOneValue}
              setInput={setInputOneValue}
            />
          ) : null}
        </div>

        <div className="container__prompt">
          {pTwo !== "waiting" && pThree === "" && pFour === "" ? (
            <Prompt text={pTwo} />
          ) : null}
        </div>
        <div className="container__input">
          {inputTwo === true ? (
            <Input
              handle={handleInputTwo}
              input={inputTwoValue}
              setInput={setInputTwoValue}
            />
          ) : null}
        </div>

        <div className="container__prompt">
          {pThree !== "waiting" && pFour === "" ? (
            <Prompt text={pThree} />
          ) : null}
        </div>
        <div className="container__input">
          {inputThree === true ? (
            <Input
              handle={handleInputThree}
              input={inputThreeValue}
              setInput={setInputThreeValue}
            />
          ) : null}
        </div>

        <div className="container__prompt">
          {pFour !== "waiting" ? <Prompt text={pFour} /> : null}
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
