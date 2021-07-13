import * as wordList from "word-pictionary-list";
import * as helpers from "./helpers.js";

export const state = {
  word: {},
};

export const loadWord = async function () {};

export const getWordDefinition = async function () {
  try {
    //1. Get random word from npm package
    const randomWord = wordList().split(" ");

    //2. Call dictionary API to get definitions of the word.
    const data = await helpers.getJSON(randomWord[0]);
    const { meanings } = data[0];

    let defStr = [];

    //3. Each partOfSpeech can have multiple definitions. Iterate through them and save them into state.
    meanings.forEach((meaning) => {
      let { partOfSpeech, definitions } = meaning;

      definitions.forEach((def) => {
        const { definition } = def;
        defStr.push(
          `${
            partOfSpeech.slice(0, 1).toUpperCase() + partOfSpeech.slice(1)
          }. Definition: ${definition}`
        );
        state.word = {
          word: randomWord[0],
          defStr: defStr,
        };
      });
    });
  } catch (error) {
    throw error;
  }
};
