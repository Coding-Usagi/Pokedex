let pokemonRepository = (function (){
  let pokemonList = [];
  let apiUrl ='https://pokeapi.co/api/v2/pokemon/?limit=150%22';

   function showModal(pokemon) {
     let modalContainer = document.querySelector('#modal-container');
     // What the modal looks like is defined
     modalContainer.innerHTML = '';
     let modal = document.createElement('div');
     modal.classList.add('modal');

     //Close button is added to the modal
     //Event listener is added to the close button
     let closeButtonElement = document.createElement('button');
     closeButtonElement.classList.add('modal-close');
     closeButtonElement.innerText = 'Close';
     closeButtonElement.addEventListener('click', hideModal);

     //modal title is defined
     let titleElement = document.createElement('h1');
     titleElement.innerText = pokemon.name;

     //content is defined here
     let contentElement = document.createElement('p');
     contentElement.innerText = "Height: " + pokemon.height;

     let pokeWeight = document.createElement('p');
     pokeWeight.innerText = "Weight: " + pokemon.weight;

     let pokemonImage = document.createElement('img');
     pokemonImage.src = pokemon.imageUrl;

     modal.appendChild(closeButtonElement);
     modal.appendChild(titleElement);
     modal.appendChild(contentElement);
     modal.appendChild(pokeWeight);
     modal.appendChild(pokemonImage);
     modalContainer.appendChild(modal);


     modalContainer.classList.add('is-visible');
   }

   function hideModal() {
     let modalContainer = document.querySelector('#modal-container');
     modalContainer.classList.remove('is-visible');

     if (dialogPromiseReject) {
       dialogPromiseReject();
       dialogPromiseReject = null;
     }

     window.addEventListener('keydown', (e) => {
       if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
         hideModal();
       }
     });
     modalContainer.addEventListener('click', (e) => {
       // Since this is also triggered when clicking INSIDE the modal
       // We only want to close if the user clicks directly on the overlay
       let target = e.target;
       if (target === modalContainer) {
         hideModal();
       }
     });

     document.querySelector('#show-modal').addEventListener('click', () => {
       showModal('Modal title', 'This is the modal content!');
     });
   };

   function showDialog(title, text) {
   showModal(title, text);

   // Add a confirm and cancel button to the modal
   let modal = modalContainer.querySelector('.modal');

   let confirmButton = document.createElement('button');
   confirmButton.classList.add('modal-confirm');
   confirmButton.innerText = 'Confirm';

   let cancelButton = document.createElement('button');
   cancelButton.classList.add('modal-cancel');
   cancelButton.innerText = 'Cancel';

   modal.appendChild(confirmButton);
   modal.appendChild(cancelButton);

   // Focus the confirmButton so that the user can press Enter
   confirmButton.focus();
   return new Promise((resolve, reject) => {
   cancelButton.addEventListener('click', hideModal);
   confirmButton.addEventListener('click', () => {
     dialogPromiseReject = null; // Reset this
     hideModal();
     resolve();
   });
   // This can be used to reject from other functions
   dialogPromiseReject = reject;
 });
 }

 function getAll(){
   return pokemonList;
 }

  function add(pokemon){
    pokemonList.push(pokemon);

  }
  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-test");
    // appends need to be within the addlistitem function so they are separate from the button eventlistener
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

    button.addEventListener('click', showDetails(pokemon));
    button.addEventListener("click", function(){
      showDetails(pokemon)
      console.log(pokemon.name)
    });
  }

  function showDetails(pokemon){
    console.log(pokemon.name);
  }

  function loadList(){
    return fetch(apiUrl).then (function (response){
      return response.json();
    }).then(function (json){
      json.results.forEach(function (item){
        let pokemon={
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch (function (e){
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url= item.detailsUrl;
    return fetch(url).then(function (response){
      return response.json();
    }).then (function (details){
      // Add the details to the items
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e){
      console.error(e);
    });
  }

  function showDetails(pokemon){
    loadDetails(pokemon).then(function (){
      showModal(pokemon);
    });
  }

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails
    };
  })();

  pokemonRepository.loadList().then(function(){
    // Data is loaded
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });
console.log(pokemonRepository.getAll());

  pokemonRepository.getAll().forEach(function (pokemon){
    pokemonRepository.addListItem(pokemon);
  });
