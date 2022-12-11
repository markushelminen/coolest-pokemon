import type { inferRouterOutputs } from "@trpc/server";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import React from "react";
import { getTwoPokemons } from "../utils/getRandomPokemon";
import { trpc } from "../utils/trpc";
import type { exampleRouter } from "../server/trpc/router/example";

const btn =
  "inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";


const Home: NextPage = () => {
  const [ids, updateIds] = React.useState(getTwoPokemons());
  const [first, second] = ids; 

  
  const firstPokemon = trpc.example.pokemonById.useQuery({id: first});
  const secondPokemon = trpc.example.pokemonById.useQuery({id: second});
  
  const voteMutation = trpc.example.castVote.useMutation();

  const voteForCoolest = (id: number) => {
    if(!first || !second) return;
    if(id === first) {
      voteMutation.mutate({votedFor: first, votedAgainst: second})
    } else {
      voteMutation.mutate({votedFor: second, votedAgainst: first})
    }
    updateIds(getTwoPokemons());
  }

  const dataLoaded = !firstPokemon.isLoading && firstPokemon.data && !secondPokemon.isLoading && secondPokemon.data;

  return (
     <div className="h-screen w-screen flex flex-col justify-between items-center relative">
      <Head>
        <title>Coolest Pokèmon</title>
      </Head>
      <div className="text-2xl text-center pt-8">Which Pokèmon is the Coolest?</div>
      { dataLoaded && (<div className="border rounded p-8 flex items-center justify-between max-w-2xl">
          <>
          <PokemonListing pokemon={firstPokemon.data} vote={() => voteForCoolest(first)}></PokemonListing>
          <div className="p-8">Vs</div>
          <PokemonListing pokemon={secondPokemon.data} vote={() => voteForCoolest(second)}></PokemonListing>
          </>
        <div className="p-2"></div>
      </div>)}
      {!dataLoaded && (<Image width={192} height={192} src="rings.svg" alt="Loading..."></Image>)}
      <div className="w-full text-xl text-center pb-2">
        <a href="https://github.com/markushelminen/coolest-pokemon">Github</a>
        <span className="p-4">{"-"}</span>
        <Link href="/results">
          Results
        </Link>
        <span className="p-4">{"-"}</span>
        <Link href="/about">
          About
        </Link>
      </div>
    </div>
  );
};

export default Home;
type Pokemon = inferRouterOutputs<typeof exampleRouter>['pokemonById']
const PokemonListing: React.FC<{pokemon: Pokemon, vote: () => void}> = (props) => {
  return (
    <div className="flex flex-col items-center transition-opacity" key={props.pokemon.id}>
          <div className="text-xl text-center capitalize -mt-8">{props.pokemon.name}</div>
          <Image className="animate-fade-in" width={256} height={256} src={props.pokemon.spriteUrl} alt={props.pokemon.name} />
          <button className={btn} onClick={() => props.vote()}>Cooler</button>
        </div>
  );
}