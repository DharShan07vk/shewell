"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "~/server/db";

const AddReviewRatingUserAction = async ({
  review,
  rating,
  professionalUserId,
  bookAppointmentId,
}: {
  review: string | undefined;
  rating: number | undefined;
  professionalUserId: string;
  bookAppointmentId: string;
}) => {
  const schema = z.object({
    review: z.string(),
    rating: z.string(),
    professionalUserId: z.string(),
  });

  const isValid = schema.safeParse({
    review,
    rating,
    professionalUserId,
  });
  if (!isValid) {
    return {
      error: "Data is invalid",
    };
  }
  const session = await getServerSession();
  const user = await db.user.findFirst({
    where: {
      email: session?.user.email!,
    },
  });
  try {
    const existingRating = await db.professionalUserRating.findFirst({
      where: {
        bookAppointmentId: bookAppointmentId,
      },
    });
    if (existingRating) {
      return;
    }
    await db.professionalUserRating.create({
      data: {
        rating: rating!,
        review: review!,
        professionalUserId: professionalUserId,
        bookAppointmentId: bookAppointmentId,
      },
    });

    const avgRating = await db.professionalUserRating.aggregate({
     _avg:{
      rating : true
     },
      where: {
        professionalUserId : professionalUserId,
      },
    });
   
    if (!avgRating._avg.rating) {
      return;
    }
    await db.professionalUser.update({
      data: {
        avgRating: avgRating._avg.rating,
      },
      where: {
        id: professionalUserId,
      },
    });
    revalidatePath("/profile/appointments");
    return {
      message: "Ratings updated successfully",
    };
  } catch (error) {
    console.log("reviewError", error);
    throw new Error("Cannot add the ratings");
  }
};
export default AddReviewRatingUserAction;
