"use strict";

const gamePlay = document.getElementById("game-play");

const tag = document.createElement("div");
const text = document.createTextNode("String");
tag.appendChild(text);
gamePlay.appendChild(tag);
tag.classList.add("letter-base");

const words = [
  "rinoceronte",
  "caballo",
  "alergia",
  "espasmo",
  "asimetria",
  "veleidoso",
];

console.log(words);
const randomWord = function (words) {
  const totalWords = words.length;
  console.log(totalWords);
  const random = Math.floor(Math.random() * totalWords);
  return words[random];
};

const word = randomWord(words);

const countLetters = function (randomWord) {
  const letterCount = randomWord.length;
  let x = 3;
  for (let i = 0; i < letterCount; i++) {
    x += 3;
    const tag = document.createElement("div");
    console.log(randomWord[i]);
    const text = document.createTextNode(randomWord[i]);
    tag.appendChild(text);
    gamePlay.appendChild(tag);
    tag.classList.add("letter-base");
    tag.style.left = `${x * 3}em`;
  }
};

countLetters(word);
