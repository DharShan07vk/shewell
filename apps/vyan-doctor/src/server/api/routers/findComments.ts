import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getServerSession } from "next-auth";
export const searchCommentsRouter = createTRPCRouter({
  searchComments: publicProcedure
    .input(
      z.object({
        bookAppointmentId: z.string(),
        patientId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { bookAppointmentId, patientId } = input;
      const session = await getServerSession();
      console.log("session", session);
      if(!session){
        throw new Error("Unauthorised")
      }
      if(!session.user.email){
        throw new Error("Unauthorised")
      }
      const professionalUser = await db.professionalUser.findFirst({
        where: {
          email: session.user.email,
        },
      });

      const patientHistory = await db.bookAppointment.findMany({
        select: {
          startingTime: true,
          endingTime: true,
          createdAt: true,
          
          professionalUser: {
            select: {
              displayQualification: {
                select: {
                  specialization: true,
                },
              },
            },
          },
          patient: {
            select: {
              firstName: true,
              additionalPatients: true,
            },
          },
          comments: true,
          status : true,
        },

        where: {
          NOT : {
            id : bookAppointmentId
          },
          patientId: patientId,
          professionalUserId : professionalUser?.id
        },
      });
      const meetingDetails = await db.bookAppointment.findFirst({
        select: {
          startingTime: true,
          endingTime: true,
          createdAt: true,
          comments: true,
          professionalUser: {
            select: {
              displayQualification: true,
            },
          },
          patient: {
            select: { additionalPatients: true },
          },
        },
        where: {
          id: bookAppointmentId,
          professionalUserId: professionalUser?.id,
        },
      });

      const comments = await db.comment.findMany({
        where: {
          bookAppointmentId: bookAppointmentId,
        },
      });
      console.log("comments", comments, meetingDetails, patientHistory);
      return { comments, meetingDetails, patientHistory };
    }),
});
