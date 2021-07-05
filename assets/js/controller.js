import "core-js/stable";
import "regenerator-runtime/runtime";
import * as randomWord from "word-pictionary-list";

import * as model from "./model.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//Selectors
const welcome = document.querySelector(".welcome");
const gamePlay = document.getElementById("game-play");
const tag = document.createElement("div");
const text = document.createTextNode("String");
tag.appendChild(text);
gamePlay.appendChild(tag);
tag.classList.add("letter-base");

//////////////////////////////////////////////////////

const controlWord = async function () {
  try {
    const definition = await model.getWordDefinition();
    console.log(definition);
  } catch (err) {
    alert(err);
  }
};

controlWord();

// const randomWord = function (words) {
//   const totalWords = words.length;
//   console.log(totalWords);
//   const random = Math.floor(Math.random() * totalWords);
//   return words[random];
// };

// const word = randomWord(words);

// const countLetters = function (randomWord) {
//   const letterCount = randomWord.length;
//   let x = 3;
//   for (let i = 0; i < letterCount; i++) {
//     x += 3;
//     const tag = document.createElement("div");
//     console.log(randomWord[i]);
//     const text = document.createTextNode(randomWord[i]);
//     tag.appendChild(text);
//     gamePlay.appendChild(tag);
//     tag.classList.add("letter-base");
//     tag.style.left = `${x * 3}em`;
//   }
// };

// countLetters(word);
