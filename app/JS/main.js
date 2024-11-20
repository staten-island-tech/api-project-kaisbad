import "../CSS/style.css";
import { DOMSelectors } from "../JS/dom.js";

/* async function getData() {
  //fetch returns a promise
  const response = await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      "https://www.demonslayer-api.com/api/v1/characters"
    )}`
  );
  const data = await response.json();
  document.querySelector("h1").textContent = data.name;
  console.log(data);
} */

const response = await fetch(
  `https://api.allorigins.win/get?url=${encodeURIComponent(
    "https://www.demonslayer-api.com/api/v1/characters"
  )}`
);
const data = await response.json();

function clearCards() {
  DOMSelectors.container.innerHTML = "";
}

function insertCard() {
  clearCards();
  let cardHtml = "";
  data.forEach((character) => {
    cardHtml += `<div class="card"><h2 class="header">${character.name}</h2>
        <ul><li>${character.gender}</li>
        <li>${character.race}</li>
        <li>${character.description}</li></ul>
        <img src="${character.img}" alt="person" class="card-img"></div>
        `;
  });
  DOMSelectors.container.insertAdjacentHTML("afterbegin", cardHtml);
}

insertCard();
