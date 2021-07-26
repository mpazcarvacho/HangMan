import party from "party-js";

class HowToPlayView {
  #parentElement = document.querySelector(".my-modal");
  #button = document.querySelector(".btn-how-to");
  #closeButton = document.querySelector(".close-modal");
  #overlay = document.querySelector(".overlay");

  render(type, word) {
    this.#parentElement.innerHTML = this._generateMarkup(type, word);
    this.#overlay.classList.remove("hidden");
    this.#parentElement.classList.remove("hidden");
    party.confetti(this.#parentElement);
  }

  _generateMarkup(type = "htp", word) {
    this.#parentElement.innerHTML = "";
    if (type === "htp")
      return `
    <h1 id="modal-title">💣 How to Play 💣</h1>
    <ol>
      <li><span>Click the Play button 👆</span></li>
      <li>
        <span
          >A random word will be selected and hidden from you. You have to
          guess the word one letter at a time. 🏹</span
        >
      </li>
      <li>
        <span
          >Each letter you guess correctly will be shown on all the places it
          can be found in your hidden word. 👏</span
        >
      </li>
      <li>
        <span
          >You have 6 attempts to guess the word before your man gets burned!
          🔥 (and therefore you lose the game) 😥.</span
        >
      </li>
      <li>
        <span
          >If you win, you'll get to see the definitions of the word you've
          conquered!🏆</span
        >
      </li>
    </ol>`;

    if (type === "win")
      return `
      <h1 id="modal-title">🏆 You won! 🏆</h1>
      <p>Here is your prize, conquer them all!:</p>
      <br>
      <br>
      <br>
      <h1>${word.word}</h1>
      <p>The definition is ${word.definition}</p>`;
  }

  close() {
    this.#parentElement.classList.add("hidden");
    this.#overlay.classList.add("hidden");
  }

  addHandlerRender(handler) {
    this.#button.addEventListener("click", handler);
  }

  addHandlerClose(handler) {
    [this.#closeButton, this.#overlay].forEach((dom) =>
      dom.addEventListener("click", handler)
    );

    document.addEventListener("keydown", function (e) {
      if (
        e.key === "Escape" &&
        !document.querySelector(".modal").classList.contains("hidden")
      ) {
        handler();
      }
    });
  }
}

export default new HowToPlayView();
