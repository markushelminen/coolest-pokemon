import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { prisma } from "../../db/client"

export const exampleRouter = router({
  pokemonById: publicProcedure
  .input(z.object({id: z.number()}))
  .query( async ({input}) => {
    const pokemon = await prisma.pokemon.findFirst({ where: {id : input.id}});
    if(!pokemon) throw new Error("lol doesn't exist")
  return pokemon;
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
