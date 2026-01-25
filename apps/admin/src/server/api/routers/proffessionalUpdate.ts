import { db } from "../../db";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
export const proffessionalUpdateRouter = createTRPCRouter({
  proffessionalUpdate: publicProcedure
    .input(
        z.object({  
            id: z.string(),
            isapproved: z.boolean()
        })
    )
    .mutation(async ({ input }) => {
        const { id, isapproved } = input;
        await db.professionalUser.update({
            where: {
                id: id
            },
            data: {
                isapproved: isapproved
            }
        });
    })
});