import "core-js/stable";
import "regenerator-runtime/runtime";

import * as randomWord from "word-pictionary-list";

const welcome = document.querySelector(".welcome");

const gamePlay = document.getElementById("game-play");

const getWordDefinition = async function () {
  const word = randomWord({ exactly: 1, wordsPerString: 1 });

  console.log(word);
  try {
    const wordDefinition = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en-US/${word}`
    );
    const data = await wordDefinition.json();
    const { meanings } = data[0];

    meanings.forEach((meaning) => {
      let { partOfSpeech, definitions } = meaning;
      let { definition } = definitions[0];
      console.log(
        `${
          partOfSpeech.slice(0, 1).toUpperCase() + partOfSpeech.slice(1)
        }. Definition: ${definition}`
      );
    });
  } catch (error) {
    alert(error);
  }
};

getWordDefinition();

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
