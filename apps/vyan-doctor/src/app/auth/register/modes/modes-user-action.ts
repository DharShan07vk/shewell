"use server";

import { db } from "~/server/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface IModesProps {
  sessionMode: string;
  // sessionType?: string;
  // meetingType?: string;
  listing: string;
  // issues: string;
}
const ModesUserAction = async ({
  sessionMode,
  // sessionType,
  // meetingType,
  listing,
  // issues,
}: IModesProps) => {
  const session = await getServerSession();
  if (!session?.user) {
    throw new Error("Unauthorised user");
  }
  if(!session.user.email){
    throw new Error("Unauthorised user")
  }
 const FormData = z.object({
  sessionMode : z.string(),
  // sessionType : z.string().optional(),
  // meetingType : z.string().optional(),
  listing : z.string()
 })
 const isValidData = FormData.parse({
  sessionMode,
  // sessionType,
  // meetingType,
  listing
 })
  try {
    await db.professionalUser.update({
      data: {
        sessionMode: isValidData.sessionMode,
        // sessionType: isValidData.sessionType,
        // meetingType: isValidData.meetingType,
        listing: isValidData.listing,
        // issue: issues,
      },
      where: {
        email: session.user.email,
      },
    });
    revalidatePath("/auth/register/modes")
    return {
      message: "Successfully modes added",
    };
  } catch (error) {
    console.log(error);
  }
};
export default ModesUserAction;
