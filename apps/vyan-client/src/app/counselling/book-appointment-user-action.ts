"use server";
import { AppointmentType } from "@repo/database";
import { getServerSession } from "next-auth";
import { db } from "~/server/db";
interface IBookAppointmentDetailsProps {
  serviceMode: {
    serviceType: AppointmentType;
    priceInCents: number;
    description: string;
    planName: string;
  };
  professionalUser: {
    professionalUserId: string;
  };
  patient: {
    firstName: string;
    email: string;
    phoneNumber: string;
  };
  startingTime: Date;
  endingTime: Date;
}
const BookAppointmentUserAction = async ({
  serviceMode,
  professionalUser,
  patient,
  startingTime,
  endingTime,
}: IBookAppointmentDetailsProps) => {
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
  const patientInfo = await db.patient.findFirst({
    select: {
      id: true,
    },
    where: {
      userId: user.id,
    },
  });
  if (!patientInfo) {
    return;
  }
  try {
    if (
      !serviceMode ||
      !professionalUser ||
      !patient ||
      !startingTime ||
      !endingTime
    ) {
      throw new Error("Incomplete data for booking appointment");
    }
    await db.bookAppointment.create({
      data: {
        endingTime: endingTime,
        startingTime: startingTime,
        description: serviceMode.description,
        planName: serviceMode.description,
        priceInCents: serviceMode.priceInCents,
        serviceType: serviceMode.serviceType,
        patientId: patientInfo?.id,
        professionalUserId: professionalUser.professionalUserId,
        userId: user.id,
      },
    });
    return {
      message: "Appointment has booked",
    };
  } catch (error) {
    console.log("booking", error);
    throw new Error("Failed to Book the appointment");
  }
};

export default BookAppointmentUserAction;
