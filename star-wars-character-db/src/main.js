// Getting the search input
const searchInput = document.getElementById("search-input");

// Adding an event listener that listens to whenever the user types something into the search bar
searchInput.addEventListener("input", function (e) {
  // Get the value of the input
  const input = e.target.value;
  if(input.lenght >= 1){
    debouncedCharacterSearch(input)
  }
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
  fetch(`https://swapi.py4e.com/api/people`)
  .then(resp => resp.json())
  .then(data => {
    if (data.count >= 1){
      displayCharacters(data.results)
    } else {
      displayError()
    }
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
  if (characterData.count >= 1){
    displayCharacters(characterData.results)
  } else {
    displayError
  }
	console.log(characterData);
  displayCharacters(characterData.results)
}

const links = document.querySelectorAll('.characters a');

links.forEach(link => {
  link.addEventListener('click', () => {
    const characterUrl = link.getAttribute('data-url');
    openCharacterDialog(characterUrl);
  });
});


function displayCharacters(characters){
  const listOfCharacterNames = data.results.map(character => {
    return `<li><a data-url="${character.url}">${character.name}</a></li>`

  }).join(" ");

  results.innerHTML = `<ul class="characters">${listOfCharacterNames}</ul>`;

}

function displayError() {
  results.innerHTML = "<ul class='characters'><li>The characters you seek are not here</li></ul>"
} try {
  throw new Error ("Something went wrong");
} catch (error) {
  displayError();
  console.log(error)
}


function openCharacterDialog(characterApiUrl) {
  // Open the dialog
  dialog.showModal();

  fetch(characterApiUrl).then(resp => resp.json()).then(data => {
      characterTitle.innerText = data.name;
      dialogContent.innerHTML = `
        <p><strong>Height:</strong> ${data.height}</p>
        <p><strong>Mass:</strong> ${data.mass}</p>
         <p><strong>Gender:</strong> ${data.gender}</p>
          `;

  }).catch(err => {
      console.log(err);
      dialogContent.innerHTML = 'Failed to load data.';

  });
  closeDialogButton.addEventListener('click', () => {
    dialog.close();
  });
  
}



const dialog = document.getElementById("popup-dialog");
const characterTitle = document.getElementById("character-title");
const dialogContent = document.getElementById("dialog-content");
const closeDialogButton = document.getElementById("close-dialog");