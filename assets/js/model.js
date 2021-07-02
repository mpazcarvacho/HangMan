import * as wordList from "word-pictionary-list";

const randomWord = wordList();

console.log(randomWord);

export const state = {
  word: {},
};

export const loadWord = async function () {};

export const getWordDefinition = async function () {
  try {
    const wordDefinition = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en-US/${word}`
    );
  } catch (error) {
    alert(error);
  }
};
