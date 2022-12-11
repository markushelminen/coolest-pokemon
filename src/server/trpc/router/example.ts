import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import { PokemonClient } from "pokenode-ts";

export const exampleRouter = router({
  pokemonById: publicProcedure
  .input(z.object({id: z.number()}))
  .query( async ({input}) => {
    const api = new PokemonClient();
    const pokemon = await api.getPokemonById(input.id);
  return {name: pokemon.name, sprites: pokemon.sprites};
  }),
  castVote: publicProcedure
    .input(z.object({
      votedFor: z.number(),
      votedAgainst: z.number()
    }))
    .mutation( async ({input}) => {
      const voteInDb = await prisma?.vote.create({
        data: {
          ...input
        },
      });
    return {success: true, vote: voteInDb};
    })
});
