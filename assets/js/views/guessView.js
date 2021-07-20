class GuessView {
  #parentElement = document.querySelector(".guess");
  #input = document.querySelector(".input");

  render() {
    this.#parentElement.classList.toggle("hidden");
    this.#parentElement.classList.add("fade-in");
    this.#input.focus();
  }

  addHandlerInput(handler) {
    this.#input.addEventListener("input", handler);
  }

  inputValidation() {
    console.log(this.#input.value);
    const regex = /[A-B]/gi;

    //Display tooltip only if input field value is not a letter
    if (!this.#input.value.match(regex)) {
      this.#input.value = "";
      this.#input.setAttribute("data-toggle", "tooltip");
      this.#input.setAttribute("data-placement", "top");
      this.#input.setAttribute("title", "tooltip");
      this.#input.setAttribute("data-trigger", "manual");
    }
  }
}

export default new GuessView();
