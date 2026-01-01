"use server";
import { format } from "date-fns";
import { db } from "~/server/db";

export default async function couponsAvailable(id: string) {
  const couponsAvailable = await db.coupon.findMany({
    select: {
      id: true,
      code: true,
      description: true,
    },
    where: {
      products: {
        some: {
          id: id,
        },
      },
    },
  });
  if (couponsAvailable.length > 0) {
    return couponsAvailable;
  } else {
    return null;
  }
}

export const couponVerification = async (couponName: string) => {
  const VerifiedCoupon = await db.coupon.findFirst({
    where: {
      code: {
        equals: couponName,
        mode: "insensitive",
      },
      expiresAt: {
        gte: new Date(),
      },
      active: true,
    },
    include: {
      categories: {
        select: {
          id: true,
        },
      },
      products: {
        select: {
          id: true,
        },
      },
      users: {
        select: {
          id: true,
        },
      },
      orders: {
        select: {
          id: true,
        },
      },
    },
  });

  if (VerifiedCoupon) {
    return { coupon: VerifiedCoupon };
  } else {
    return { error: "Not a Valid Coupon" };
  }
};
