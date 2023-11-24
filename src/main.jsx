import ReactDOM from "react-dom/client";
import OpenAI from "openai";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Game from "./pages/game/Game.jsx";
import React from "react";
import { PromptContext } from "./PromptContext.jsx";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

let promptArray = [
  {
    role: "system",
    content:
      "Tu es un jeu du style 'livre dont vous etes le heros'. L'utilisateur, qui est le héros de l'histoire, que tu tutoieras est un enfant de 10 ans que tu dois divertir en lui proposant une histoire originale pleine de rebondissements sur le thème suivant : 'Le père noël a disparu. Il faut absolument que tu le retrouves ! Nous sommes le 24 décembre. Tu vas faire équipe avec les lutins de noël pour découvrir où est passé le Père Noël.' ",
  },
  {
    role: "user",
    content:
      "D'abord propose un résumé de l'histoire en 4 étapes. Chaque étape est une description précise de 20 mots maximum des étapes suivantes séparées par un saut de ligne : etape 1 : quels sont les indices pour retrouver le pere noel ? etape 2 : La piste mène à un danger. Etape 3 : Le danger est surmonté, on se rapproche du pere noel mais il y a un autre rebondissement. Etape 4 le pere noel est retrouvé. Soit très original et surprenant",
  },
];

async function main() {
  console.log("premier prompt envoyé");
  const completion = await openai.chat.completions.create({
    messages: promptArray,
    model: "gpt-3.5-turbo",
  });

  let array = completion.choices[0].message.content.split("\n");

  promptArray.pop();

  console.log(array);

  return array;
}

const value = await main();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/game",
    element: (
      <PromptContext.Provider value={value}>
        <Game promptArray={promptArray} />,
      </PromptContext.Provider>
    ),
    /*loader: async () => {
      return main();
    },*/
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
