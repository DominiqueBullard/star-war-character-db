// Getting the search input
const searchInput = document.getElementById("search-input");

// Adding an event listener that listens to whenever the user types something into the search bar
searchInput.addEventListener("input", function (e) {
  // Get the value of the input
  const input = e.target.value;
  console.log(input);
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

