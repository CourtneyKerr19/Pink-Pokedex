document.addEventListener('DOMContentLoaded', () => {
  const pokedex = document.getElementById('pokedex');
  const searchInput = document.getElementById('search');

  // Fetch Pokémon data from the API
  const fetchPokemon = async () => {
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'; // Fetch the first 151 Pokémon
      const response = await fetch(url);
      const data = await response.json();
      const pokemon = data.results.map((result, index) => ({
          name: result.name,
          id: index + 1,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
      }));
      displayPokemon(pokemon);
  };

  const displayPokemon = (pokemon) => {
      const pokemonHTML = pokemon.map(poke => `
          <div class="pokemon-card">
              <img src="${poke.image}" alt="${poke.name}">
              <h3>${poke.name}</h3>
              <p>#${poke.id.toString().padStart(3, '0')}</p>
          </div>
      `).join('');
      pokedex.innerHTML = pokemonHTML;
  };

  const searchPokemon = (event) => {
      const searchTerm = event.target.value.toLowerCase();
      const allPokemon = document.querySelectorAll('.pokemon-card');
      allPokemon.forEach(pokemon => {
          const name = pokemon.querySelector('h3').innerText.toLowerCase();
          if (name.includes(searchTerm)) {
              pokemon.style.display = 'block';
          } else {
              pokemon.style.display = 'none';
          }
      });
  };

  searchInput.addEventListener('input', searchPokemon);
  fetchPokemon();
});
