let pokemonRepository = (function (){
  let pokemonList = [
    {
      name: 'Chikorita',
      height: "2.11",
      type: 'Grass'
    },

    {
      name: 'Bayleef',
      height: "3.11",
      type: 'Grass',
    },

    {
      name: 'Meganium',
      height: "5.11",
      type: 'Grass'
    }
  ];

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
    button.addEventListener('click', function(showDetails){
      button.innerText = pokemon.name;
      button.classList.add("button-test");
    });
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
  };

  function showDetails(pokemon){
    console.log(pokemonRepository.getAll());
  }
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem
    };
  })();
console.log(pokemonRepository.getAll());

  pokemonRepository.getAll().forEach(function (pokemon){
    pokemonRepository.addListItem(pokemon);
  });
