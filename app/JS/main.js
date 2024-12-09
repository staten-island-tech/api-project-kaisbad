import "../CSS/style.css";
import { DOMSelectors } from "../JS/dom.js";

let characters = [];

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
    characters = parseddata.content;
    console.log("Characters:", characters);
    if (Array.isArray(characters)) {
      insertCard(characters);
    } else {
      console.error("not array", data);
    }
  } catch (error) {
    alert("error");
  }
}

getData();

function clearCards() {
  DOMSelectors.container.innerHTML = "";
}

function insertCard(characters) {
  clearCards();
  characters.forEach((character) => {
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<div class="card flex flex-col justify-evenly items-center w-[17%] [@media(max-width:1200px)]:w-[22%] [@media(max-width:800px)]:w-[50%] border-2 border-black mb-[3%] shadow-[9px_8px_0_black] rounded-2xl">
        <h2 class="header text-2xl text-center">${character.name}</h2>
        <ul class="text-base text-center"><li>${character.gender}</li>
        <li class="text-base text-center">${character.race}</li></ul>
        <img class="card-img h-auto max-w-[70%] object-cover" src="${character.img}" alt="person" class="card-img">
        <ul class="text-base text-center w-[95%]"><li>${character.quote}</li></ul>
        <button class="learn text-2xl flex w-[96%] mx-auto my-8 justify-around" data-id="${character.id}">Learn More</button>
      </div>
      
        `
    );
  });
}

DOMSelectors.container.addEventListener("click", function (event) {
  if (event.target.classList.contains("learn")) {
    const characterID = event.target.getAttribute("data-id");
    const selectedCharacter = characters.find(
      (character) => character.id.toString() === characterID
    );
    if (selectedCharacter) {
      createSelectedCard(selectedCharacter);
    } else {
      console.error("error");
    }
  }
});

function createSelectedCard(selectedCharacter) {
  clearCards();
  let cardHtml = `<div class="card flex flex-col justify-evenly items-center w-[60%] h-auto border-2 border-black mb-[3%] shadow-[9px_8px_0_black] rounded-2xl">
        <h2 class="header text-3xl mx-auto">${selectedCharacter.name}</h2>
        <ul class="text-center text-lg"><li>${selectedCharacter.gender}</li>
        <li>${selectedCharacter.race}</li></ul>
        <img class="card-img h-auto w-70% max-w-[70%] object-cover" src="${selectedCharacter.img}" alt="person" class="card-img">
        <br>
        <ul class="text-center w-[98%]"><li>${selectedCharacter.quote}</li>
        <br>
        <li class="text-center">${selectedCharacter.description}</li></ul>
        <button class="return text-4xl flex w-[96%] mx-auto my-8 justify-around data-id="${selectedCharacter.id}">Return</button>
      </div>
      `;
  DOMSelectors.container.insertAdjacentHTML("afterbegin", cardHtml);

  const returnButton = document.querySelector(".return");
  if (returnButton) {
    returnButton.addEventListener("click", () => {
      clearCards();
      insertCard(characters);
    });
  }
}

/* DOMSelectors.reset.addEventListener("click", () => {
  clearCards();
});

DOMSelectors.create.addEventListener("click", () => {
  insertCard(characters);
});
 */
//separate api calls for each button press
//more than one api call
//make the button open the card with the description and make it big
//<li>${character.description}</li>
