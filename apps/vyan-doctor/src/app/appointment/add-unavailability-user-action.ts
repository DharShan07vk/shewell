"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";

async function AddUnavailabilityUserAction(dates: Date[]) {
  return db.$transaction(
    async (tx) => {
      console.log("datesforunavailabilityDay", dates);
      const session = await getServerSession();
      if (!session) {
        throw new Error("Login to continue")
      }
      if (!session.user.email) {
        throw new Error("Unauthorised")
      }
      const professionalUser = await tx.professionalUser.findFirst({
        select: {
          id: true,
        },
        where: {
          email: session.user.email,
        },
      });
      if (!professionalUser) {
        return
      }
      try {
        // Correct the usage of map
        const unAvailableDaysData = dates.map((item) => ({
          date: new Date(item),
          professionalUserId: professionalUser.id,
        }));
        // await db.unAvailableDay.updateMany({
        //   data : unAvailableDaysData,
        //   where : {
        //     professionalUserId : professionalUser.id
        //   }
        // })
        await tx.unAvailableDay.deleteMany({
          where: {
            professionalUserId: professionalUser.id
          }
        })
        await tx.unAvailableDay.createMany({
          data: unAvailableDaysData,
        });
        revalidatePath("/appointment")
        return {
          message: "Unavailable day has been added",
        };
      } catch (error) {
        console.log(error);
        throw new Error("Unavailability has not been added");
      }
    },
    {
      timeout: 70000
    }
  )
};

export default AddUnavailabilityUserAction;
