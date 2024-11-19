/* async function getData() {
  const response = await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      "https://www.demonslayer-api.com/api/v1/characters"
    )}`
  );
  const data = await response.json();
  console.log(data);
} */

async function getData(URL) {
  //fetch returns a promise
  const response = await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      "https://www.demonslayer-api.com/api/v1/characters"
    )}`
  );
  const data = await response.json();
  document.querySelector("h1").textContent = data.name;
  console.log(data);
}

getData();

function insertCard(operators) {
  clearCards();
  let cardHtml = "";
  data.forEach((character) => {
    cardHtml += `<div class="card"><h2 class="header">${character.name}</h2>
        <ul><li>${character.gender}</li>
        <li>${character.side}</li>
        <li>${character.price}</li></ul>
        <img src="${character.image}" alt="person" class="card-img"></div>
        `;
  });
  DOMSelectors.container.insertAdjacentHTML("afterbegin", cardHtml);
}
//turned into json
/* const data = await response.json();
console.log(response); */
