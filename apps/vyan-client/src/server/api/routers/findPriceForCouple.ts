import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
export const findPriceForCoupleRouter = createTRPCRouter({
  findPriceForCouple: publicProcedure
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
          priceInCentsForCouple: true,
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
