"use server";

import { compare, hash } from "bcrypt";
import { getServerAuthSession } from "../../../server/auth";
import { db } from "../../../server/db";
import { revalidatePath } from "next/cache";

const UpdatePassword = async (oldPass: string,newPass:string) => {
  const session = await getServerAuthSession();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  const user = await db.user.findFirst({
    select: {
      passwordHash: true,
    },
    where: {
      id: session?.user.id + "",
    },
  });

  
  const isValid = await compare(oldPass, user?.passwordHash!);
  const hashPass = await hash(newPass, 10);
  if (!isValid) {
    console.log("Password does not match");
    return { error: "Current password does not match" };
  } else {
    console.log("Password matches");
    await db.user.update({
      data: {
        passwordHash: hashPass,
      },
      where: {
        id: session?.user.id + "",
      },
    });
  }
  revalidatePath("/profile/edit-profile");
  return {
    message: "Password updated Successfully",
  };
};
export default UpdatePassword;
