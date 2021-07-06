class GameView {
  #parentElement = document.querySelector(".game");
  #data;

  addClickRender(handler) {
    window.addEventListener("click", handler);
  }
}

export default new GameView();
