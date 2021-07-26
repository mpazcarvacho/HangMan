class HowToPlayView {
  #parentElement = document.querySelector(".my-modal");
  #button = document.querySelector(".btn-how-to");
  #closeButton = document.querySelector(".close-modal");
  #overlay = document.querySelector(".overlay");

  render() {
    console.log(this.#parentElement);
    this.#overlay.classList.remove("hidden2");
    this.#parentElement.classList.remove("hidden2");
  }

  close() {
    this.#parentElement.classList.add("hidden2");
    this.#overlay.classList.add("hidden2");
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
