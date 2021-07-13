import { STRING_SEPARATION } from "../config.js";

class GameView {
  #parentElement = document.querySelector(".game");
  #btnNew = document.querySelector(".btn-new-game");
  #gamePlay = document.getElementById("game-play");

  #data;

  render(word) {
    console.log(word);
    const letterCount = word.length;
    let letterElements = [];
    let stringSep = 0;
    for (let i = 0; i < letterCount; i++) {
      stringSep += STRING_SEPARATION;
      console.log(stringSep);
      letterElements.push(document.createElement("div"));
      console.log(word[i]);
      letterElements[i].innerText = word[i];
      letterElements[i].classList.add("letter-base");
      letterElements[i].style.left = `${stringSep / letterCount}%`;
      //letterElements[i].appendChild(document.createTextNode(word[i]));
      //this.#parentElement.appendChild(letterElements[i]);
      this.#gamePlay.appendChild(letterElements[i]);
    }
  }

  addHandlerRender(handler) {
    this.#btnNew.addEventListener("click", handler);
  }
}

export default new GameView();
