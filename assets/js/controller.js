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
  gameView.render(model.state.word.letters);
  //2 Render GuessView #TODO

  //3 Render animation of HangMan #TODO
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
