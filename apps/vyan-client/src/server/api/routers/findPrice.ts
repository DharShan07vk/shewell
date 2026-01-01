import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
export const findPriceRouter = createTRPCRouter({
  findPrice: publicProcedure
    .input(
      z.object({
        duration: z.number(),
        expertId: z.string(),
        // couple : z.boolean()
      }),
    )
    .query(async ({ input }) => {
      const { duration, expertId } = input;
      const price = await db.professionalUserAppointmentPrice.findFirst({
        select: {
          priceInCentsForSingle: true,
        },
        where: {
          time: duration,
          professionalUserId: expertId,
          // coupleSession : couple
        },
      });
      console.log("price", price);
      return { price };
    }),
});
