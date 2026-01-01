import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
export const findDoctorbasedOnDoctorIdRouter = createTRPCRouter({
  findDoctorbasedOnDoctorId: publicProcedure
    .input(z.object({
        doctorId : z.string()
    }))
    .query(async ({ input }) => {
        const { doctorId} = input;
      const professionalUser = await db.professionalUser.findFirst({
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
          // professionalUserAppointmentPrices: {
          //   select: {
          //     priceInCents: true,
          //   },
          // },
        },
        where:{
            id : doctorId
        }
      });
      console.log("professionalUser", professionalUser);
      return { professionalUser };
    }),
});
