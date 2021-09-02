let pokemonList = [
  {
    name: 'Grookey',
    height: "1'00",
    type: 'Grass'
  },

  {
    name: 'Scorbunny',
    height: "1'07",
    type: 'Fire',
  },

  {
    name: 'Sobble',
    height: "1'00",
    type: 'Water'
  }
];
// Apparently double quotes in between add spacing???
for (let i = 0; i < pokemonList.length; i++){
  console.log(pokemonList[i])
  document.write(pokemonList[i].name +  " " + pokemonList[i].height + " ")
}
