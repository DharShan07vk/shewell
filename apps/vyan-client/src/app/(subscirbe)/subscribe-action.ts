"use server";
import { db } from "~/server/db";
import {userType} from "@repo/database"
const SubscribeAction = async ({ email }: { email: string }) => {
  const existingUser = await db.newsletter.findFirst({
    where: {
      email: email,
      userType : userType.CLIENT
    },
  });
  if (existingUser) {
    throw new Error(
      "This email already exists, please subscribe with another email",
    );
  }

  const lowercaseEmail = email.toLowerCase();
  try {
    await db.newsletter.create({
      data: {
        email: lowercaseEmail,
        userType : userType.CLIENT
      },
    });

    return {
      message: "Successfully Subscribed",
    };
  } catch (error) {
    console.error("Error at newsletter", error);
    throw new Error("Error");
  }
};
export default SubscribeAction;
