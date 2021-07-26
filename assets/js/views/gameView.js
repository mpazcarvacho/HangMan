class GameView {
  #parentElement = document.getElementById("game-play");
  #btnNew = document.querySelector(".btn-new-game");
  #data;

  render(letters, STRING_SEPARATION) {
    const letterCount = letters.letter.length;
    let stringSep = 0;
    for (let i = 0; i < letterCount; i++) {
      stringSep += STRING_SEPARATION;

      letters.letterBaseEl[i].classList.add("letter-base");
      letters.letterBaseEl[i].style.left = `${10 + stringSep / letterCount}%`;
      letters.letterBaseEl[i].style.maxWidth = `${
        (STRING_SEPARATION / letterCount) * 0.9
      }%`;

      this.#parentElement.appendChild(letters.letterBaseEl[i]);

      letters.letterEl[i].classList.remove("hidden");
      letters.letterEl[i].classList.add("letter");

      //Inner text will not be added until guessed
      // letters.letterEl[i].innerText = letters.letter[i];

      letters.letterBaseEl[i].appendChild(letters.letterEl[i]);
    }

    //Add fade in animation
    this.#parentElement.classList.add("fade-in");

    //Render restart button or something like that #TODO
  }

  renderSuccess(letters) {
    //Go through letters object and render matches where guess is true. #DONE
    for (let i = 0; i < letters.letter.length; i++) {
      if (letters.guess[i]) {
        letters.letterEl[i].innerText = letters.letter[i];
        letters.letterEl[i].classList.remove("hidden");
      }
    }
  }

  addHandlerRender(handler) {
    this.#btnNew.addEventListener("click", handler);
  }
}

export default new GameView();
