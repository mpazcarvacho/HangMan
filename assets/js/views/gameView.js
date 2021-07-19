import { STRING_SEPARATION } from "../config.js";

class GameView {
  #parentElement = document.querySelector(".game");
  #btnNew = document.querySelector(".btn-new-game");
  #gamePlay = document.getElementById("game-play");

  #data;

  render(word) {
    const letterCount = word.word.length;
    console.log(letterCount);
    let letterElements = [];
    let wordsElements = [];
    let stringSep = 0;
    for (let i = 0; i < letterCount; i++) {
      stringSep += STRING_SEPARATION;
      letterElements.push(document.createElement("div"));

      // letterElements[i].innerText = word[i];
      letterElements[i].classList.add("letter-base");
      letterElements[i].style.left = `${10 + stringSep / letterCount}%`;
      letterElements[i].style.maxWidth = `${
        (STRING_SEPARATION / letterCount) * 0.9
      }%`;
      //letterElements[i].appendChild(document.createTextNode(word[i]));
      //this.#parentElement.appendChild(letterElements[i]);
      this.#gamePlay.appendChild(letterElements[i]);

      //Create div in which letters will be shown
      wordsElements.push(document.createElement("div"));
      wordsElements[i].classList.toggle("hidden");
      wordsElements[i].classList.add("letter");
      wordsElements[i].innerText = word.letters[i];

      // wordsElements[i].style.fontSize = `${}`
      letterElements[i].appendChild(wordsElements[i]);
    }
  }

  addHandlerRender(handler) {
    this.#btnNew.addEventListener("click", handler);
  }
}

export default new GameView();
