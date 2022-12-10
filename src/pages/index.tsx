import { type NextPage } from "next";
import Image from "next/image";
import React from "react";
import { getTwoPokemons } from "../utils/getRandomPokemon";
import { trpc } from "../utils/trpc";


const Home: NextPage = () => {
  const [ids, updateIds] = React.useState(getTwoPokemons());
  const [first, second] = ids; 

  const firstPokemon = trpc.example.pokemonById.useQuery({id: first});
  const secondPokemon = trpc.example.pokemonById.useQuery({id: second});

  if(firstPokemon.isLoading || secondPokemon.isLoading) return undefined;
  
  return (
     <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center pb-4">Which Pokèmon is the Coolest?</div>
      <div className="border rounded p-8 flex items-center justify-between max-w-2xl">
        <div className="w-64 h-64 flex flex-col">
          <Image width={256} height={256} src={firstPokemon.data?.sprites.front_default} alt={firstPokemon.data?.name} />
          <div className="text-xl text-center capitalize -mt-8">{firstPokemon.data?.name}</div>
        </div>
        <div className="p-8">Vs</div>
        <div className="w-64 h-64 flex flex-col">
          <Image width={256} height={256} src={secondPokemon.data?.sprites.front_default} alt={secondPokemon.data?.sprites.front_default} />
          <div className="text-xl text-center capitalize -mt-8">{secondPokemon.data?.name}</div>  
        </div>
        <div className="p-2"></div>
      </div>
    </div>
  );
};

export default Home;
