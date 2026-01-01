import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
export const timeDurationAndPriceForCoupleRouter = createTRPCRouter({
    timeDurationAndPriceForCouple: publicProcedure
    .input(
      z.object({
        professionalUserId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { professionalUserId } = input;
      const timeDurations = await db.professionalUserAppointmentPrice.findMany({
        select: {
          time: true,
          priceInCentsForCouple: true,

        },
        where: {
          professionalUserId: professionalUserId,
          // coupleSession : true
        },
      });
      console.log("timeDurations", timeDurations);
      // Find the minimum time duration and its corresponding price
      const minTimeDuration = timeDurations.reduce((min, current) => {
        return current.time < min!.time ? current : min;
      }, timeDurations[0]);
      console.log("minTimeDuration", minTimeDuration);
      return { timeDurations, minTimeDuration };
    }),
});
