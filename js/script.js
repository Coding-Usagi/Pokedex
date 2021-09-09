let pokemonRepository = (function(){
  let pokemonList = [
    {
      name: 'Grookey',
      height: "1.00",
      type: 'Grass'
    },

    {
      name: 'Scorbunny',
      height: "1.07",
      type: 'Fire',
    },

    {
      name: 'Sobble',
      height: "1.00",
      type: 'Water'
    }
  ];

  function getAll(){
    return pokemonList;
  }

  function add(pokemon){
    pokemonList.push(pokemon);

    return {
    add: add,
    getAll: getAll
    };
})();


//pokemonList.forEach (function(getAll()){
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write('<p>' + pokemon.name + " " + pokemon.height + " " + pokemon.type + '</p>');
  console.log(pokemonRepository.getAll());
});
// Apparently double quotes in between add spacing???
//for (let i = 0; i < pokemonList.length; i++){
  //if (pokemonList[i].height > 1.00){
    //result = "Wow that's big!";
  //} else {
    //result = "";
  //}

  //console.log(pokemonList[i])
  //document.write(pokemonList[i].name +  " " + pokemonList[i].height + " ");
  //document.write(result + " ")
//}
