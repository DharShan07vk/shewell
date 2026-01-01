"use server";

import { getServerSession } from "next-auth";
import { db } from "~/server/db";
import { BookAppointmentStatus } from "@repo/database";
import { format, differenceInMinutes } from "date-fns";
import { processRefund } from "./refund-payment";
import { deleteEvent } from "~/lib/create-event";
import { revalidatePath } from "next/cache";

async function CancelAppointment({
  eventId,
  appointmentId,
  professionalUserId,
}: {
  appointmentId: string;
  eventId: string;
  professionalUserId: string;
}) {
 
  return db.$transaction(
    async (tx) => {
      const session = await getServerSession();

      if(!session){
        throw new Error("Please login ")
      }

      const currentTime = new Date();

      try {
        const appointment = await tx.bookAppointment.findFirst({
          where: {
            id: appointmentId,
            // userId: user?.id,
          },
        });
        const bookedTime = appointment?.startingTime!;

        const differenceInTime = differenceInMinutes(bookedTime!, currentTime);
        try {
          const response = await deleteEvent({
            eventId: eventId,
            professionalUserId: professionalUserId,
          });

          await db.bookAppointment.update({
            data: {
           
              meeting: response,
            },
            where: {
              id: appointmentId,
            },
          });
        
          revalidatePath("/profile/appointments");
          return {
            message: "Meeting response has been updated",
          };
          
        } catch (error) {
          console.log("error at delete event", error);
        }

       
        if (Math.abs(differenceInTime) < 120) {
          // if time is less than 120 minutes, then cancel appointment without refund
          try {
            await db.bookAppointment.update({
              data: {
                status: BookAppointmentStatus.CANCELLED,
               
              },
              where: {
                id: appointmentId,
                // userId: user?.id,
              },
            });
            revalidatePath("/profile/appointments");
            return {
              message: "Appointment has been cancelled without refund",
            };
          } catch (error) {
            console.log("if time is less than 120 minutes update error", error);
          }
        }
        // if time is more than 120 minutes, then cancel appointment with refund
        else {
          const refundAmount = appointment?.priceInCents;

          await processRefund( appointment?.razorpayPaymentId!, refundAmount!, appointmentId);
          try {
            await tx.bookAppointment.update({
              data: {
                status: BookAppointmentStatus.CANCELLED_WITH_REFUND,
               
              },
              where: {
                id: appointmentId,
                // userId: user?.id,
              },
            });
            revalidatePath("/profile/appointments");
        
            return {
              message: "Appointment has been canelled with refund",
            };
          } catch (error) {
            console.log("if time is more than 120 minutes update error", error);
          }
        }
      } catch (error) {
        console.log("appointmnetnotcancelled", error);
        throw new Error("Appointment cannot be cancelled");
      }
    },
    {
      timeout: 10000,
    },
  );
}

export default CancelAppointment;
