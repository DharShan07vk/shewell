"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { updateEvent } from "~/lib/create-event";

import { db } from "~/server/db";
interface IRescheduleDetails {
  startingTime: Date;
  endingTime: Date;
  appointmentId: string;
  professionalUserId?: string;
  eventId?: string;
}

const RescheduleAction = async ({
  startingTime,
  endingTime,
  appointmentId,
  eventId,
  professionalUserId,
}: IRescheduleDetails) => {
  const session = await getServerSession();
  if (!session) {
    return {
      error: "Unauthorised",
    };
  }

  const formSchema = z.object({
    startingTime: z.date(),
    endingTime: z.date(),
    appointmentId: z.string(),
  });

  const isValid = formSchema.safeParse({
    startingTime,
    endingTime,
    appointmentId,
  });

  if (!isValid) {
    return {
      error: "Invalid data",
    };
  }
  try {
    try {
      const response = await updateEvent({
        appointmentId: appointmentId,
        endTime: endingTime,
        eventId: eventId!,
        professionalUserId: professionalUserId!,
        startTime: startingTime,
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
    } catch (error) {
      console.log("Error Update Event", error);
    }
    await db.bookAppointment.update({
      data: {
        startingTime: startingTime,
        endingTime: endingTime,
        id: appointmentId,
        
      },
      where: {
        id: appointmentId,
      },
    });
    revalidatePath("/profile/appointments");
    return {
      message: "Appointment has been rescheduled",
    };
  } catch (error) {
    console.log("rescheduleError", error);
    throw new Error("Appointment cannot be rescheduled");
  }
};
export default RescheduleAction;
