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
  const {
    data: pokemonPair,
    refetch,
    isLoading
  } = trpc.example.pokemonPair.useQuery();
  
  const voteMutation = trpc.example.castVote.useMutation();

  const voteForCoolest = (id: number | undefined) => {
    if(!pokemonPair) return;
    if(id === pokemonPair.firstPokemon?.id && pokemonPair.firstPokemon && pokemonPair.secondPokemon) {
      voteMutation.mutate({votedFor: pokemonPair.firstPokemon.id, votedAgainst: pokemonPair.secondPokemon.id})
    } else if (pokemonPair.firstPokemon && pokemonPair.secondPokemon) {
      voteMutation.mutate({votedFor: pokemonPair.secondPokemon.id, votedAgainst: pokemonPair.firstPokemon.id})
    }
    refetch();
  }

  const fetchingNext = voteMutation.isLoading || isLoading;

  return (
     <div className="h-screen w-screen flex flex-col justify-between items-center relative">
      <Head>
        <title>Coolest Pokèmon</title>
      </Head>
      <div className="text-2xl text-center pt-8">Which Pokèmon is the Coolest?</div>
      { pokemonPair && (<div className="border rounded p-8 flex items-center justify-between max-w-2xl">
          <>
          <PokemonListing pokemon={pokemonPair.firstPokemon} vote={() => voteForCoolest(pokemonPair.firstPokemon?.id)} disabled={fetchingNext}></PokemonListing>
          <div className="p-8">Vs</div>
          <PokemonListing pokemon={pokemonPair.secondPokemon} vote={() => voteForCoolest(pokemonPair.secondPokemon?.id)} disabled={fetchingNext}></PokemonListing>
          </>
        <div className="p-2"></div>
      </div>)}
      {!pokemonPair && (<Image width={192} height={192} src="/rings.svg" alt="Loading..."></Image>)}
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
type Pokemon = inferRouterOutputs<typeof exampleRouter>['pokemonPair']["firstPokemon"]
const PokemonListing: React.FC<{pokemon: Pokemon, vote: () => void, disabled: boolean}> = (props) => {
  if(!props.pokemon) throw new Error("Backend is f*cked");
  return (
    <div className={`flex flex-col items-center transition-opacity ${props.disabled && "opacity-0"}`} key={props.pokemon.id}>
          <div className="text-xl text-center capitalize -mt-8">{props.pokemon.name}</div>
          <Image className="animate-fade-in" width={256} height={256} src={props.pokemon.spriteUrl} alt={props.pokemon.name} />
          <button className={btn} onClick={() => props.vote()} disabled={props.disabled}>Cooler</button>
        </div>
  );
}