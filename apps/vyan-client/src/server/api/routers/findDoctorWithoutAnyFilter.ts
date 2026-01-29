import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
export const findDoctorWithoutFilterRouter = createTRPCRouter({
  findDoctorWithoutFilter: publicProcedure
    // .input(z.object({}))
    .query(async ({ input }) => {
      //   const {} = input;
      const professionalUser = await db.professionalUser.findMany({
        select: {
          id: true,
          firstName: true,
          displayQualification: {
            select: {
              specialization: true,
            },
          },
          avgRating: true,
          totalConsultations: true,
          userName: true,
          professionalUserAppointmentPrices: {
            select: {
              priceInCentsForSingle: true,
            },
          },
        },
      });
      return { professionalUser };
    }),
});
