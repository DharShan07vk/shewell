import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
export const searchLanguagesRouter = createTRPCRouter({
  searchLanguage: publicProcedure
    // .input(
    //   z.object({
    //     specialization: z.string().optional(),
    //   }),
    // )
    .query(async ({ input }) => {
    //   const { specialization } = input;
      const languages = await db.professionalLanguages.findMany({
        select: {
          id: true,
          language: true,
        },
      });
      console.log("languages", languages);
      return { languages };
    }),
});
