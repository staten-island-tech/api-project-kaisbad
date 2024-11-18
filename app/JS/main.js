//https://www.demonslayer-api.com/
async function getData() {
  const response = await fetch(
    "https://www.demonslayer-api.com/api/v1/characters"
  );
  const data = await response.json();
  console.log(data);
}
//turned into json
/* const data = await response.json();
console.log(response); */
getData();
