const MAX_POKEMON_ID = 493; 

export const getRandomPokemon: (notThisOne?: number) => number = (notThisOne?: number) => {
    const pokemonId = Math.floor(Math.random() * (MAX_POKEMON_ID) + 1);

    if(pokemonId !== notThisOne) return pokemonId;
    return getRandomPokemon(notThisOne);
};

export const getTwoPokemons = () => {
    const firstId = getRandomPokemon();
    const secondId = getRandomPokemon(firstId);

    return [firstId, secondId];
};

