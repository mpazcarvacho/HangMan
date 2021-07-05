import * as wordList from "word-pictionary-list";
import * as helpers from "./helpers.js";

const randomWord = wordList().split(" ");

console.log(randomWord[0]);

export const state = {
  word: {},
};

export const loadWord = async function () {};

export const getWordDefinition = async function () {
  try {
    const data = await helpers.getJSON(randomWord);
    const { meanings } = data[0];

    let defStr = [];

    meanings.forEach((meaning) => {
      let { partOfSpeech, definitions } = meaning;
      let { definition } = definitions[0];
      defStr.push(
        `${
          partOfSpeech.slice(0, 1).toUpperCase() + partOfSpeech.slice(1)
        }. Definition: ${definition}`
      );
    });
    return defStr;
  } catch (error) {
    alert(error);
  }
};
