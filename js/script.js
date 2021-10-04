let pokemonRepository = (function (){
  let pokemonList = [];
  let apiUrl ='https://pokeapi.co/api/v2/pokemon/?limit=150%22';

  function getAll(){
    return pokemonList;
  }

  function add(pokemon){
    if (typeof pokemon === "object"){
      pokemonList.push(pokemon);
    }
  }
  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    listPokemon.classList.add(
      'list-group-item'
    );

    let button = document.createElement('button')
    button.classList.add('btn', 'btn-primary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', 'modal');
    button.innerText = pokemon.name;
    // appends need to be within the addlistitem function so they are separate from the button eventlistener
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener("click", function(event){
      showDetails(pokemon)

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

  function loadDetails(pokemon) {
    let url= pokemon.detailsUrl;
    return fetch(url).then(function (response){
      return response.json();
    }).then (function (details){
      // Add the details to the items
      console.log(details);
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.types = [...details.types];
      //item.imageUrl = details.sprites.front_default;
      //item.height = details.height;
      //item.types = details.types;
      //item.weight = details.weight;
    }).catch(function (e){
      console.error(e);
    });
  }

  function showDetails(pokemon){
    pokemonRepository.loadDetails(pokemon).then(function () {
      //loadDetails(pokemon).then(function (){
      showModal(pokemon);
    });
  }

  function showModal(pokemon, details) {
    //modal title is defined
    let modalBody = document.querySelector('.modal-body');
    modalbody.innerText = '';

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    //content is defined here
    let contentElement = document.createElement('p');
    contentElement.innerText = "Height: " + pokemon.height;

    let pokemonWeight = document.createElement('p');
    pokemonWeight.innerText = "Weight: " + pokemon.weight;

    let pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.imageUrl;

    let pokemonTypes = document.createElement("ul");
    let types = [];
    pokemon.types.forEach(function (item) {
      types += "<p>" + item.type.name + "</p>";
    });

    pokemonTypes.innerHTML = types;
    //pokemon.types.forEach((item) => (types += <p>${item.type.name}</p>));
    // re-adjust the list so it shows in height, weight, type, img order
    //modal.appendChild(closeButtonElement);
    //modal.appendChild(titleElement);
    //modal.appendChild(contentElement);
    modal.appendChild(pokemonWeight);
    modal.appendChild(pokemonImage);
    modal.appendChild(pokemonTypes);
    //modalContainer.appendChild(modal);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

// Loop for the pokemon
pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
console.log(pokemonRepository.getAll());
