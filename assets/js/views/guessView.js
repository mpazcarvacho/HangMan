class GuessView {
  #parentElement = document.querySelector(".guess");
  #input = document.querySelector(".input");
  #btnSubmit = document.querySelector("#btn-submit");
  #tooltip = "";
  #validInput = false;
  #guess = "";
  #fails = document.querySelector(".fails");
  #attempts = document.querySelector(".attempts-left");

  render() {
    this.#parentElement.classList.toggle("hidden");
    this.#parentElement.classList.add("fade-in");
    this.#input.focus();
  }

  addHandlerInput(handler) {
    // this.#input.addEventListener("input", handler);
    this.#input.addEventListener("input", function (e) {
      e.preventDefault();
      handler();
    });
  }

  // #TODO add handler for submit button
  addHandlerSubmit(handler) {
    ["click", "submit"].forEach((event) =>
      this.#btnSubmit.addEventListener(event, function (e) {
        // e.preventDefault();
        handler();
      })
    );

    this.#input.addEventListener("keydown", function (e) {
      if (e.key == "Enter") {
        e.preventDefault();
        handler();
      }
    });
  }

  inputValidation() {
    const regex = /[A-Z]/gi;

    //if tooltip was shown, and new input is a letter, hide tooltip.
    if (this.#input.value.match(regex)) {
      this.#guess = this.#input.value.toLowerCase();
      this.#tooltip?.hide?.();
      this.#validInput = true;
    }

    //Display tooltip only if input field value is not a letter and is not empty
    if (!this.#input.value.match(regex) && this.#input.value !== "") {
      this.#input.value = "";
      this.#input.setAttribute("data-bs-toggle", "tooltip");
      this.#input.setAttribute("data-bs-placement", "top");
      this.#input.setAttribute("title", "Letters only!");
      this.#input.setAttribute("data-trigger", "manual");
      this.#input.setAttribute("id", "input");

      if (!this.#tooltip) {
        this.#tooltip = new bootstrap.Tooltip(this.#input, {
          boundary: document.body, // or document.querySelector('#boundary')
        });
      }

      this.#tooltip.show();

      this.#validInput = false;
    }
  }

  validInput() {
    //Clear guess  if input correct #TODO
    if (this.#validInput) this.#input.value = "";
    return [this.#validInput, this.#guess];
  }

  renderFails(fails, ATTEMPTS) {
    // console.log(fails.length);
    this.#fails.innerHTML = `<span>${[...fails].join(" - ")}</span>`;
    this.#attempts.innerHTML = `${ATTEMPTS - fails.length}`;
  }
}

export default new GuessView();
