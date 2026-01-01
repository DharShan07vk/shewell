import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
export const searchSpecializationRouter = createTRPCRouter({
  searchSpecialization: publicProcedure
    // .input(
    //   z.object({
    //     specialization: z.string().optional(),
    //   }),
    // )
    .query(async ({ input }) => {
      // const { specialization } = input;
      const specializations = await db.professionalSpecializations.findMany({
        select: {
          id: true,
          specialization: true,
        },
      });
      console.log("specializationss", specializations);
      return { specializations };
    }),
});
