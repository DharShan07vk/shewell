"use server";

import { db } from "~/server/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IResetPasswordActionProps {
  token: string;
  password: string;
  confirmPassword: string;
}

const resetPasswordAction = async ({
  token,
  password,
  confirmPassword,
}: IResetPasswordActionProps) => {
  try {
   
    const decoded = jwt.verify(token, process.env.EMAIL_JWT_SECRET!) as {
      email: string;
    };
    
    const user = await db.user.findFirst({
      where: {
        email: decoded.email,
        deletedAt: null,
      },
    });
    
    if (!user) {
     
      return {
        success: false,
        message: "Your link has expired and no longer usable.",
      };
    }
    if (password !== confirmPassword) {
      return {
        success: false,
        message: "Passwords do not match",
      };
    }

    if (password.trim().length < 8) {
      return {
        success: false,
        message: "Password must be at least 8 characters long",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
      where: {
        id: user.id,
        deletedAt: null,
      },
      data: {
        passwordHash: hashedPassword,
      },
    });
    return {
      success: true,
      message: "Password reset successfully now you can login",
    };
  } catch (error) {
    console.log("error is", error);
    return {
      success: false,
      message: "Your link has expired and no longer usable.",
    };
  }
};

export default resetPasswordAction;
