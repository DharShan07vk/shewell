import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
export const appointmentTimeDurationRouter = createTRPCRouter({
  appointmentTimeDuration: publicProcedure
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
          priceInCentsForSingle: true,

        },
        where: {
          professionalUserId: professionalUserId,
        },
      });
      // Find the minimum time duration and its corresponding price
      const minTimeDuration = timeDurations.reduce((min, current) => {
        return current.time < min!.time ? current : min;
      }, timeDurations[0]);
      return { timeDurations, minTimeDuration };
    }),
});
