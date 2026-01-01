"use server";

import { getServerSession } from "next-auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { db } from "../../../server/db";
export type ReviewProps = {
  id: string;
  rating: number;
  review: string;
  approved: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
};
export const createProductReviews = async (
  data: ReviewProps,
  productId: string,
) => {
  const session = await getServerSession();

  const userDetails = await db.user.findUnique({
    select: {
      id: true,
      email: true,
    },
    where: {
      email: session?.user.email!,
      deletedAt: null,
    },
  });
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  const { rating, review } = data;

  const FormData = z.object({
    review: z.string().min(1),
    rating: z.number(),
  });

  const isValidData = FormData.parse({
    rating,
    review,
  });

  if (!isValidData) {
    return {
      error: "Invalid data",
    };
  }
  await db.review.create({
    data: {
      rating: data.rating.toFixed(1),
      review: data.review,
      userId: userDetails?.id!,
      productId: productId,
      approved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  revalidatePath("/profile/orders");
  return {
    message: "Review uploaded successfully",
  };
};
