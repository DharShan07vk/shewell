"use server";
import { db } from "~/server/db";
import { hash } from "bcrypt";
import { signIn } from "next-auth/react";

interface IPersInfoProps {
  firstName: string;
  lastName?: string;
  phoneNumber: string;
  email: string;
  password: string;
  dob: Date;
  userName: string;
}

const PersInfoUserAction = async ({
  firstName,
  lastName,
  phoneNumber,
  email,
  password,
  dob,
  userName,
}: IPersInfoProps) => {
  const user = await db.professionalUser.findFirst({
    where: {
      email: email,
    },
  });
  if (user) {
    throw new Error("User already exists");
  }

  const sameUserName = await db.professionalUser.findFirst({
    where: {
      userName: userName,
    },
  });
  if (sameUserName) {
    throw new Error("This Username already exists");
  }

  const passwordHash = await hash(password, 10);
  const lowercaseEmail = email.toLowerCase();
  try {
    const newUser = await db.professionalUser.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        passwordHash: passwordHash,
        email: lowercaseEmail,
        dob: dob,
        userName: userName,
      },
    });

    return {
      message: "Successfully added the Personal Information",
    };
  } catch (error) {
    console.error("Failed SignUp", error);
    throw new Error("Failed SignUp");
  }
};

export default PersInfoUserAction;
