// Getting the search input
const searchInput = document.getElementById("search-input");

// Adding an event listener that listens to whenever the user types something into the search bar
searchInput.addEventListener("input", function (e) {
  // Get the value of the input
  const input = e.target.value;
  console.log(input);
  searchForCharacter(input)

  debouncedCharacterSearch(input)
})

/*
document.addEventListener("DOMContentLoaded", function(){
  fetch(`https://swapi.py4e.com/api/people`) 
  .then(resp => resp.json())
    .then(data => {
    console.log(data);
   }).catch(e => {
    console.log(e);
   })
   

})
*/

const results = document.getElementById("results");

function debounce(func, wait) {
  let timeout;

  return function (...args) {
    const context = this;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
const debouncedCharacterSearch = debounce(searchForCharacter, 500)

document.addEventListener("DOMContentLoaded", function(){
  fetch(`https://swapi.py4e.com/api/people`) 
  .then( resp => resp.json())
  .then ( data => {
    console.log(data);
    const listOfCharacterNames = data.results.map(character => {
        return `<li>${character.name}</li>`
    });
      results.innerHTML = `<ul class="characters">${listOfCharacterNames}</ul>`;
  }).catch(e => {
      console.log(e);
      results.innerText = "The characters you seek are not here";
  })
})

document.addEventListener("DOMContentLoaded", function () {
  fetch(`https://swapi.py4e.com/api/people`).then(resp => resp.json()).then(data => {
    console.log(data)
    displayCharacters(data.results);
  }).catch(e => {
    console.log(e);
    results.innerText = "The characters you seek are not here";
  })
})


async function searchForCharacter(query) {
  const characterData = await
  fetch(`https://swapi.py4e.com/api/people?search=${query}`).then(resp => resp.json());

	console.log(characterData);
  displayCharacters(characterData.results)
}

function displayCharacters(characters){
  const listOfCharacterNames = data.results.map(character => {
    return `<li>${character.name}</li>`
  }).join(" ");

  results.innerHTML = `<ul class="characters">${listOfCharacterNames}</ul>`;
}


const dialog = document.getElementById("popup-dialog");
const characterTitle = document.getElementById("character-title");
const dialogContent = document.getElementById("dialog-content");
const closeDialogButton = document.getElementById("close-dialog");