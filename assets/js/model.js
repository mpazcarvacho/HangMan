import * as wordList from "word-pictionary-list";
import * as helpers from "./helpers.js";

export const state = {
  word: {},
};

export const loadWord = async function () {};

export const getWordDefinition = async function () {
  try {
    //Get random word and save it into state.
    const randomWord = wordList().split(" ");
    //<state.word.word = randomWord[0];
    console.log(randomWord[0]);

    //Call dictionary API to get definitions of the word.
    const data = await helpers.getJSON(randomWord[0]);
    console.log(data);

    const { meanings } = data[0];

    let defStr = [];

    //Each partOfSpeech can have multiple definitions. Iterate through them and save them into state.
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
