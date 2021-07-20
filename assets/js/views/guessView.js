class GuessView {
  #parentElement = document.querySelector(".guess");

  render() {
    this.#parentElement.classList.toggle("hidden");
    this.#parentElement.classList.add("fade-in");
  }
}

export default new GuessView();
