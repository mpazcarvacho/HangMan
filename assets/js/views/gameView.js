class GameView {
  #parentElement = document.querySelector(".game");
  #btnNew = document.querySelector(".btn-new-game");
  #data;

  render(word) {
    console.log(word);
    // const letterCount = word.length;
    // let x = 3;
    // for (let i = 0; i < letterCount; i++) {
    //   x += 3;
    //   const tag = document.createElement("div");
    //   console.log(word[i]);
    //   const text = document.createTextNode(word[i]);
    //   tag.appendChild(text);
    //   gamePlay.appendChild(tag);
    //   tag.classList.add("letter-base");
    //   tag.style.left = `${x * 3}em`;
    // }
  }

  addHandlerRender(handler) {
    this.#btnNew.addEventListener("click", handler);
  }
}

export default new GameView();
