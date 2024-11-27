import "../CSS/style.css";
import { DOMSelectors } from "../JS/dom.js";

async function getData() {
  try {
    //fetch returns a promise
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        "https://www.demonslayer-api.com/api/v1/characters?limit=100"
      )}`
    );
    const data = await response.json();
    const parseddata = JSON.parse(data.contents);
    const characters = parseddata.content;
    console.log("Characters:", characters);
    if (Array.isArray(characters)) {
      insertCard(characters);
    } else {
      console.error("not array", data);
    }
  } catch (error) {
    console.log(error);
    alert("error");
  }
}

getData();

function clearCards() {
  DOMSelectors.container.innerHTML = "";
}

function insertCard(characters) {
  clearCards();
  let cardHtml = "";
  characters.forEach((character) => {
    cardHtml += `<div class="card flex flex-col items-center justify-evenly w-[17%] h-[25rem] border-2 border-black mb-[3%] shadow-[9px_8px_0_black] rounded-2xl">
        <h2 class="header">${character.name}</h2>
        <ul><li>${character.gender}</li>
        <li>${character.race}</li></ul>
        <img class="card-img h-auto max-w-[100%] object-cover" src="${character.img}" alt="person" class="card-img">
        <ul><li>${character.quote}</li></ul>
      </div>
        `;
  });
  DOMSelectors.container.insertAdjacentHTML("afterbegin", cardHtml);
}

DOMSelectors.reset.addEventListener("click", () => {
  clearCards();
  insertCard(characters);
});

DOMSelectors.form.addEventListener("submit", function (event) {
  event.preventDefault();
});

//separate api calls for each button press
//more than one api call
//make the form open the card with the description and make it big
//<li>${character.description}</li>
