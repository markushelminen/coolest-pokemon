import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import { PokemonClient } from "pokenode-ts";

export const exampleRouter = router({
  pokemonById: publicProcedure
  .input(z.object({id: z.number()}))
  .query( async ({input}) => {
    const api = new PokemonClient();
    const pokemon = await api.getPokemonById(input.id);
  return pokemon;
  }),
});
