import * as wordList from "word-pictionary-list";

const randomWord = wordList();

console.log(randomWord);

export const state = {
  word: {},
};

export const loadWord = async function () {};
