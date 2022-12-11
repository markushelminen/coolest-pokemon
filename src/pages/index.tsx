import { inferRouterOutputs } from "@trpc/server";
import { type NextPage } from "next";
import Image from "next/image";
import React from "react";
import { getTwoPokemons } from "../utils/getRandomPokemon";
import { trpc } from "../utils/trpc";
import { exampleRouter } from "../server/trpc/router/example";

const btn =
  "inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";


const Home: NextPage = () => {
  const [ids, updateIds] = React.useState(getTwoPokemons());
  const [first, second] = ids; 

  const firstPokemon = trpc.example.pokemonById.useQuery({id: first});
  const secondPokemon = trpc.example.pokemonById.useQuery({id: second});

  const voteForCoolest = (id: number) => {
    updateIds(getTwoPokemons());
  }

  return (
     <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center pb-4">Which Pokèmon is the Coolest?</div>
      <div className="border rounded p-8 flex items-center justify-between max-w-2xl">
        {!firstPokemon.isLoading && firstPokemon.data && !secondPokemon.isLoading && secondPokemon.data && (
          <>
          <PokemonListing pokemon={firstPokemon.data} vote={() => voteForCoolest(first)}></PokemonListing>
          <div className="p-8">Vs</div>
          <PokemonListing pokemon={secondPokemon.data} vote={() => voteForCoolest(second)}></PokemonListing>
          </>
        )}
        <div className="p-2"></div>
      </div>
    </div>
  );
};

export default Home;
type Pokemon = inferRouterOutputs<typeof exampleRouter>['pokemonById']
const PokemonListing: React.FC<{pokemon: Pokemon, vote: () => void}> = (props) => {
  return (
    <div className="flex flex-col items-center">
          <Image width={256} height={256} src={props.pokemon.sprites.front_default} alt={props.pokemon.name} />
          <div className="text-xl text-center capitalize -mt-8">{props.pokemon.name}</div>
          <button className={btn} onClick={() => props.vote()}>Coolest</button>
        </div>
  );
}