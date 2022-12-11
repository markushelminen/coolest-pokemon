import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { prisma } from "../../db/client"
import { getTwoPokemons } from "../../../utils/getRandomPokemon";

export const exampleRouter = router({
  pokemonPair: publicProcedure
  .query( async () => {
    const [first, second] = getTwoPokemons();
    if(!first ||!second) throw new Error("Util function failed!");
    const bothPokemon = await prisma.pokemon.findMany({
      where: {id: {in: [first, second] } },
    });

    if(bothPokemon.length !== 2) throw new Error("failed to find two pokemon");
  return {firstPokemon: bothPokemon[0], secondPokemon: bothPokemon[1]};
  }),
  castVote: publicProcedure
    .input(z.object({
      votedFor: z.number(),
      votedAgainst: z.number()
    }))
    .mutation( async ({input}) => {
      const voteInDb = await prisma.vote.create({
        data: {
          votedForId: input.votedFor,
          votedAgainstId: input.votedAgainst
        },
      });
    return {success: true, vote: voteInDb};
    })
});
