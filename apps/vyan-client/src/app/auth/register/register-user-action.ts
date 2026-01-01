"use server";
import { db } from "~/server/db";
import { hash } from "bcrypt";
import { generateOtp } from "~/lib/utils";
import { sendEmail } from "@repo/mail";
export interface ISignUpFields {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  age: boolean;
}

const RegisterUserAction = async ({
  name,
  email,
  password,
  phoneNumber,
  age,
}: ISignUpFields) => {
  const user = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  if (user) {
    throw new Error("User already exists please login");
  }

  const passwordHash = await hash(password, 10);
  const otp = generateOtp();
  try {
    const user = await db.user.create({
      data: {
        name: name,
        email: email,
        passwordHash: passwordHash,
        phoneNumber: phoneNumber,
        ageGreaterThan18: age,
        otp: otp,
      },
    });
    const emailBodySendGrid = {
      from: process.env.FROM_EMAIL!,
      subject: "Verification OTP",
      to: [user.email],
      html: `<p>Hi,<strong> ${user.name} <br/> </strong/></p>
      <span>This is your verification OTP ${otp}<span/>
      `,
     
    };
   
    await sendEmail(emailBodySendGrid);

    return {
      message: "Successfull Signup",
    };
  } catch (error) {
    console.error("Failed SignUp");
    throw new Error("Failed Signup");
  }
};

export default RegisterUserAction;
