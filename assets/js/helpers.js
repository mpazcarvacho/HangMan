import { API_URL } from "./config.js";

export const getJSON = async function (word) {
  try {
    const res = await fetch(`${API_URL}${word}`);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    alert(err);
  }
};
