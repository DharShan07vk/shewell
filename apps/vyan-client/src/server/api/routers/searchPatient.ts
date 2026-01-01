import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getServerSession } from "next-auth";
export const searchPatientRouter = createTRPCRouter({
  searchPatient: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const session = await getServerSession();

      const user = await db.user.findFirst({
        select: {
          id: true,
        },
        where: {
          email: session?.user.email!,
        },
      });
      if (!user) {
        return;
      }
      const patient = await db.patient.findMany({
        where: {
          userId: user.id,
          deletedAt: null,
        },
        select: {
          id: true,
          firstName: true,
          phoneNumber: true,
          email: true,
          message: true,
          lastName: true,
          additionalPatients: true,
        },
      });
      console.log("patient", patient);
      return { patient };
    }),
});
