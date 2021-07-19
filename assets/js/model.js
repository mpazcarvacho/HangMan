import * as wordList from "word-pictionary-list";
import * as helpers from "./helpers.js";

export const state = {
  word: {
    defStr: [],
    letters: {
      letter: [],
      letterBaseEl: [],
      letterEl: [],
    },
  },
};

export const loadWord = async function () {};

export const getWordDefinition = async function () {
  try {
    //1. Get random word from npm package, validate word: Only one word and no '-'
    let randomWord;

    do {
      randomWord = wordList().split(" ");
    } while (randomWord.length > 1 || RegExp("-", "g").exec(randomWord));

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
      // console.log(state.word.defStr);
      //4. Separate strings from randomWord and storing them in state #DONE

      //Add here div elements and store them into state. Classes  will be added in GameView Class.
      // debugger;

      state.word.letters = {
        letter: Array.from(state.word.word),
        letterBaseEl: Array(state.word.word.length).fill(
          document.createElement("div")
        ),
        letterEl: Array(state.word.word.length).fill(
          document.createElement("div")
        ),
      };
    });
    // console.log(state.word.letters);

    console.log(state);
  } catch (error) {
    throw error;
  }
};
