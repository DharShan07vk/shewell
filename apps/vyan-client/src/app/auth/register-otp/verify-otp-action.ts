"use server";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { db } from "~/server/db";

const verifyOtpAction = async ({
  otp,
  // email,
}: {
  otp: string;
  // email: string;
}) => {
  try {
    const session = await getServerSession();
    if (!session) {
      return;
    }
    const user = await db.user.findFirst({
      where: {
        email: session.user.email!,
      },
    });
    if (!user) {
      return;
    }

    const email = session.user.email;
    const currentTime = new Date();
    const savedOTP = await db.user.findFirst({
      select: {
        otp: true,
      },
      where: {
        email: email!,
      },
    });
    if (!savedOTP) {
      return;
    }

    // console.log("savedOTP", savedOTP, "otp", otp);
    if (savedOTP.otp !== otp) {
      // console.log("invalid otp")
      throw new Error("Invalid OTP");
    }

    await db.user.update({
      data: {
        verifiedAt: currentTime,
      },
      where: {
        email: email!,
      },
    });

    console.log("Account verification successfully");
    return {
      message: "Your account has been verified",
    };
  } catch (error) {
    console.log("verificaiton-error", error);
    throw new Error("Your account has not been verified");
  }
};
export default verifyOtpAction;
