import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
export const priceForCoupleRouter = createTRPCRouter({
    priceForCouple: publicProcedure
    .input(
      z.object({
        timeDuration : z.number(),
        professionalUserId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { professionalUserId, timeDuration } = input;
      const priceInCents = await db.professionalUserAppointmentPrice.findFirst({
        select: {
       
          priceInCentsForCouple: true,

        },
        where: {
          professionalUserId: professionalUserId,
          // coupleSession : true,
          time : timeDuration

        },
      });
      console.log("timeDurations", priceInCents);
      // Find the minimum time duration and its corresponding price
    //   const minTimeDuration = timeDurations.reduce((min, current) => {
    //     return current.time < min!.time ? current : min;
    //   }, timeDurations[0]);
    //   console.log("minTimeDuration", minTimeDuration);
      return { priceInCents };
    }),
});
