class GuessView {
  #parentElement = document.querySelector(".guess");
  #input = document.querySelector(".input");
  #btnSubmit = document.querySelector("#btn-submit");
  #tooltip = "";

  render() {
    this.#parentElement.classList.toggle("hidden");
    this.#parentElement.classList.add("fade-in");
    this.#input.focus();
  }

  addHandlerInput(handler) {
    this.#input.addEventListener("input", handler);
  }

  // #TODO add handler for submit button
  // addHandlerSubmit(handler) {}

  inputValidation() {
    const regex = /[A-Z]/gi;

    //if tooltip was shown, and new input is a letter, hide tooltip.
    if (this.#input.value.match(regex)) this.#tooltip?.hide?.();

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
    }
  }
}

export default new GuessView();
