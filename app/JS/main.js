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
    cardHtml += `<div class="card flex flex-col justify-evenly w-[17%] border-2 border-black mb-[3%] shadow-[9px_8px_0_black] rounded-2xl">
        <h2 class="header mx-auto">${character.name}</h2>
        <ul class="text-center whitespace-normal"><li>${character.gender}</li>
        <li>${character.race}</li></ul>
        <img class="card-img h-auto max-w-[100%] object-cover" src="${character.img}" alt="person" class="card-img">
        <ul class="text-center whitespace-normal"><li>${character.quote}</li></ul>
        <button class="btn flex w-[96%] mx-auto my-8 justify-around" id="learn" data-id="${character.name}>Learn More</button>
      </div>
      
        `;
  });
  DOMSelectors.container.insertAdjacentHTML("afterbegin", cardHtml);
}

DOMSelectors.btn.addEventListener("click", handleButtonClick);

DOMSelectors.reset.addEventListener("click", () => {
  clearCards();
});

DOMSelectors.learn.addEventListener("click", () => {
  clearCards();
});

DOMSelectors.create.addEventListener("click", () => {
  insertCard(characters);
});

//separate api calls for each button press
//more than one api call
//make the button open the card with the description and make it big
//<li>${character.description}</li>
