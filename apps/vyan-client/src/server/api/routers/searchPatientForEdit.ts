import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getServerSession } from "next-auth";
export const searchPatientForEditRouter = createTRPCRouter({
  searchPatientForEdit: publicProcedure
    .input(
      z.object({
        patientId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { patientId } = input;
      const session = await getServerSession();

      const user = await db.user.findFirst({
        select: {
          id: true,
        },
        where: {
          email: session?.user.email!,
        },
      });
      const patient = await db.patient.findFirst({
        where: {
          userId: user?.id,
          id : patientId
        },
        select: {
          id: true,
          firstName: true,
          phoneNumber: true,
          email: true,
          message : true,
          lastName : true,
          additionalPatients : true
        },
      });
      console.log("patient", patient);
      return { patient };
    }),
});
