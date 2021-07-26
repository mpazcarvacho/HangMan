import "core-js/stable";
import "regenerator-runtime/runtime";

import * as model from "./model.js";
import gameView from "./views/gameView.js";
import htpView from "./views/htpView.js";
import guessView from "./views/guessView.js";
import { ATTEMPTS, STRING_SEPARATION } from "./config.js";
import party from "party-js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//////////////////////////////////////////////////////

const controlWord = async function () {
  try {
    await model.getWordDefinition();
    // console.log(`${model.state.word.word}. ${model.state.word.defStr}`);
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

const controlLetters = function (letterBaseEl, lEl) {
  model.setLettersDOM(letterBaseEl, lEl);
};

const controlGame = function () {
  //0 Create DOM elements dynamically and set them into state. to avoid creating same node els wit Array.fill
  for (let i = 0; i < model.state.word.letters.letter.length; i++) {
    controlLetters(
      document.createElement("div"),
      document.createElement("div")
    );
  }

  //1 Render Gameview #DONE
  gameView.render(model.state.word.letters, STRING_SEPARATION);
  //2 Render GuessView #TODO
  guessView.render();

  //3 Render animation of HangMan #TODO
};

const controlGuessInput = function () {
  //Validates string on input field to be only a letter
  guessView.inputValidation();
};

const controlSubmit = function () {
  // 1. Check if the value in input field is valid #DONE
  const [valid, guess] = guessView.validInput();
  if (!valid) return;

  //2. If guess is included in state.word, set guess to true in state. If not, add them to guesses in model. #DONE
  if (model.state.word.letters.letter.includes(guess)) {
    model.addGuess(guess);

    //3. Render letters match on gameplay #DONE
    gameView.renderSuccess(model.state.word.letters);

    //Check if game is won, if so, render definition and etc. #TODO #HERE
    if (model.state.word.letters.guess.every((g) => g)) {
      htpView.render("win", model.state.word.defStr);

      console.log(`you rock! Here's your prize 🏆: ${model.state.word}
      `);
    }

    //Also set win score and word and definition in localStorage.#TODO
  } else {
    //4. Add failed guess to state #DONE
    model.addFailedGuess(guess);

    //check if game lost. If game lost, render try again message #TODO.

    //5. Render fails on guessView #DONE
    guessView.renderFails(model.state.failedGuesses, ATTEMPTS);
  }

  //3. Render
};

const init = function () {
  //Adding Event listeners to how to play view (open and close modal).
  htpView.addHandlerRender(controlHowToPlay);
  htpView.addHandlerClose(controlCloseModal);
  gameView.addHandlerRender(controlGame);
  guessView.addHandlerInput(controlGuessInput);
  guessView.addHandlerSubmit(controlSubmit);

  //Setting state with word asyncronously so it will be ready when the user clicks play
  controlWord();
};

init();
