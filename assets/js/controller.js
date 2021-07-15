import "core-js/stable";
import "regenerator-runtime/runtime";

import * as model from "./model.js";
import gameView from "./views/gameView.js";
import htpView from "./views/htpView.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//Selectors - View logic, these will be removed from controller
const welcome = document.querySelector(".welcome");
// const gamePlay = document.getElementById("game-play");
// const tag = document.createElement("div");
// const text = document.createTextNode("String");
// tag.appendChild(text);
// gamePlay.appendChild(tag);
// tag.classList.add("letter-base");

//////////////////////////////////////////////////////

const controlWord = async function () {
  try {
    await model.getWordDefinition();
    console.log(`${model.state.word.word}. ${model.state.word.defStr}`);
  } catch (err) {
    //outstanding: throw error and render in view. #TODO
    console.error(`${err}. Error in controlWord - controller.js 💥`);
  }
};

const controlHowToPlay = function () {
  htpView.render();
};

const controlCloseModal = function () {
  htpView.close();
};

const controlGame = function () {
  //1. Separate strings from randomWord and storing them in state #TODO

  //2 Render Gameview #TODO
  gameView.render(model.state.word.word);
  //3 Render GuessView #TODO
};

const init = function () {
  //Adding Event listeners to how to play view (open and close modal).
  htpView.addHandlerRender(controlHowToPlay);
  htpView.addHandlerClose(controlCloseModal);
  gameView.addHandlerRender(controlGame);

  //Setting state with word asyncronously so it will be ready when the user clicks play
  controlWord();
};

init();

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
