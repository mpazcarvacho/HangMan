class GameView {
  #parentElement = document.querySelector(".game");
  #btnNew = document.querySelector(".btn-new-game");
  #data;

  render() {}

  addClickRender(handler) {
    this.#parentElement.addEventListener("click", handler);
  }
}

export default new GameView();
