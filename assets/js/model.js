import * as wordList from "word-pictionary-list";
import * as helpers from "./helpers.js";

export const state = {
  word: {
    definitions: [],
    letters: {
      letter: [],
      letterBaseEl: [],
      letterEl: [],
    },
  },
  failedGuesses: [],
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
    // console.log(meanings);
    for (let i = 0; i < meanings.length; i++) {
      let { partOfSpeech, definitions } = meanings[i];

      for (let j = 0; j < definitions.length; j++) {
        const { definition } = definitions[j];

        state.word.definitions.push({
          partOfSpeech: partOfSpeech,
          antonyms: definitions[j].antonyms,
          definition: definition,
          synonyms: definitions[j].synonyms,
          example: definitions[j].example,
        });
      }
    }

    state.word.word = randomWord[0].toLowerCase();

    state.word.letters = {
      letter: Array.from(state.word.word),
      letterBaseEl: [],
      letterEl: [],
      guess: new Array(state.word.word.length).fill(false),
    };

    console.log(state.word);
    // console.log(state.word.definitions);

    return;
    meanings.forEach((meaning) => {
      let { partOfSpeech, definitions } = meaning;

      definitions.forEach((def) => {
        const { definition } = def;
        console.log(state.word.definitions);
        /////

        // defStr.push(
        //   `${
        //     partOfSpeech.slice(0, 1).toUpperCase() + partOfSpeech.slice(1)
        //   }. Definition: ${definition}`
        // );

        state.word = {
          word: randomWord[0].toLowerCase(),
          defStr: defStr,
        };
      });

      //4. Add here div elements and store them into state. Classes  will be added in GameView Class. #DONE

      state.word.letters = {
        letter: Array.from(state.word.word),
        letterBaseEl: [],
        letterEl: [],
        guess: new Array(state.word.word.length).fill(false),
      };
    });
  } catch (error) {
    console.error(error);
    // throw error;
  }
};

export const setLettersDOM = function (letterBaseEl, lEl) {
  state.word.letters.letterBaseEl.push(letterBaseEl);
  state.word.letters.letterEl.push(lEl);
};

export const addGuess = function (guess) {
  //1. Add true in index position of guessed value #DONE
  for (let i = 0; i < state.word.letters.letter.length; i++) {
    if (state.word.letters.letter[i] === guess) {
      state.word.letters.guess[i] = true;
    }
  }
};

export const addFailedGuess = function (failedGuess) {
  state.failedGuesses.push(failedGuess);
};
