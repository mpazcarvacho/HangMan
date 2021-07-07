class HowToPlayView {
  #parentElement = document.querySelector(".modal");
  #button = document.querySelector(".btn-how-to");
  #closeButton = document.querySelector(".close-modal");
  #overlay = document.querySelector(".overlay");

  render() {
    this.#parentElement.classList.remove("hidden");
    this.#overlay.classList.remove("hidden");
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
