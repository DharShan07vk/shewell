"use server";

import { getServerSession } from "next-auth";
import { db } from "~/server/db";
import { BookAppointmentStatus } from "@repo/database";
import { format, differenceInMinutes } from "date-fns";
import { processRefund } from "./refund-action";

const CancelAppointment = async ({
  appointmentId,
}: {
  appointmentId: string;
}) => {
  const session = await getServerSession();

  // const professionalUser = await db.professionalUser.findFirst({
  //   where: {
  //     email: session?.user.email!,
  //   },
  // });

  const currentTime = new Date();

  try {
    const appointment = await db.bookAppointment.findFirst({
      where: {
        id: appointmentId,
        // professionalUserId: professionalUser?.id,
      },
    });

    const appointmentTime = await db.bookAppointment.findFirst({
      select: {
        startingTime: true,
      },
      where: {
        id: appointment?.id,
        // professionalUserId: professionalUser?.id,
      },
    });
    const timeDifference = differenceInMinutes(
      appointmentTime?.startingTime!,
      currentTime,
    );
    const refundAmount = appointment?.priceInCents;

    // checking that professional user can
    if (timeDifference > 0) {
      await processRefund(appointment?.razorpayPaymentId!, refundAmount!, appointmentId);
      await db.bookAppointment.update({
        data: {
          status: BookAppointmentStatus.CANCELLED_WITH_REFUND,
        },
        where: {
          id: appointmentId,
          // professionalUserId: professionalUser?.id,
        },
      });
      return {
        message: "Appointment has been canelled with refund",
      };
    } else {
      return {
        message: "Now you can not cancel the appointment",
      };
    }
  } catch (error) {
    console.log("appointmnetnotcancelled", error);
    throw new Error("Appointment cannot be cancelled");
  }
};

export default CancelAppointment;
