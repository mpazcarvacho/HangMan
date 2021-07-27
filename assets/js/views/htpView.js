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
    console.log(word);
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
      <h1 id="modal-title">${word.word}</h1>
      <div class="container-carousel">
      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      ${word.definitions.map((d, i) => {
        return `
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${
          i + 1
        }"></button>`;
      })}
        </div>
        <div class="carousel-inner">
        ${word.definitions.map((d, i) => {
          return `
          
          
            <div class="carousel-item ${i === 0 ? "active" : ""}">
              <div class="definition d-block w-100">
                <p>Definition ${i + 1}: <i>${d.partOfSpeech} - </i><span>${
            d.definition
          }.</span>
                </p>
                ${d.example ? `<p>Example: ${d.example}</p>` : ""}
                ${
                  d.antonyms.length !== 0
                    ? `<p>Antonyms: ${d.antonyms}</p>`
                    : ""
                }
                ${
                  d.synonyms.length !== 0
                    ? `<p>Synonyms: ${d.synonyms}</p>`
                    : ""
                }
              </div>
            </div>
          
          
        `;
        })}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      `;

    // d.synonyms.split("").join(" - ")
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
