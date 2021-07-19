import { STRING_SEPARATION } from "../config.js";

class GameView {
  #parentElement = document.querySelector(".game");
  #btnNew = document.querySelector(".btn-new-game");
  #gamePlay = document.getElementById("game-play");

  #data;

  render(letters) {
    const letterCount = letters.letter.length;
    let stringSep = 0;
    for (let i = 0; i < letterCount; i++) {
      stringSep += STRING_SEPARATION;

      letters.letterBaseEl[i].classList.add("letter-base");
      letters.letterBaseEl[i].style.left = `${10 + stringSep / letterCount}%`;
      letters.letterBaseEl[i].style.maxWidth = `${
        (STRING_SEPARATION / letterCount) * 0.9
      }%`;

      this.#gamePlay.appendChild(letters.letterBaseEl[i]);

      letters.letterEl[i].classList.toggle("hidden");
      letters.letterEl[i].classList.add("letter");

      //Inner text will not be added until guessed
      // letters.letterEl[i].innerText = letters.letter[i];

      letters.letterBaseEl[i].appendChild(letters.letterEl[i]);
    }
  }

  addHandlerRender(handler) {
    this.#btnNew.addEventListener("click", handler);
  }
}

export default new GameView();
