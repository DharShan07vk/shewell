import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getServerSession } from "next-auth";
import { Day } from "@repo/database";
import { createTimeDate } from "~/app/lib/utils";
import { format, formatISO, getHours, getMinutes } from "date-fns";

// converting the day of week which is number to enum type because in our model day is enum not number
const dayMapping: { [key: number]: Day } = {
  0: Day.SUN,
  1: Day.MON,
  2: Day.TUE,
  3: Day.WED,
  4: Day.THU,
  5: Day.FRI,
  6: Day.SAT,
};
export const searchTimeSlotsRouter = createTRPCRouter({
  searchTimeSlots: publicProcedure
  .input(
    z.object({
      date: z.date(),
      expertId: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const { date, expertId } = input;
    console.log("coming date", format(formatISO(date), "yyyy-MM-dd"))
    const professionalUser = await db.professionalUser.findFirst({
      select: {
        id: true,
      },
      where: {
        id: expertId,
      },
    });
    if(!professionalUser){
      return
    }

    // finding day on which doctor is unavailable comparing the date selected by user with the date marked unavailable by expert
    const unavailableDay = await db.unAvailableDay.findFirst({
      select: {
        date: true,
      },
      where: {
        
        date: new Date(format(formatISO(date),"yyyy-MM-dd")),
        professionalUserId: professionalUser.id,
      },
    });

    // const moreUnvailableDays = await db.availability.findFirst({
    //  where : {
    //   available : false,
    //   day : 
    //  }
    // })
    console.log("unavailableDate",unavailableDay?.date,"professionalUserId", professionalUser.id, "coming-date", new Date(format(formatISO(date),"yyyy-MM-dd")))
    // console.log("selectedDate", date);
    if (unavailableDay) {
      // console.log("timeSlotsquery", unavailableDay)
      return { timeSlots: [] };
    }
console.log("time slots for unavailable day")


    // getting day(0: Sunday, 1: Monday ...): form the date
    // const dayofWeek = new Date(date).getUTCDay();
    const dayofWeek = date.getDay();
    const dayEnum = dayMapping[dayofWeek];

    // console.log("dayofWeek", dayofWeek, dayEnum);

    if (!dayEnum) {
      throw new Error("Invalid day of the week");
    }

    // console.log("dayofWeek Valid", dayofWeek);

    // finding time slots as per the day and selected expert
    const timeSlots = await db.availability.findMany({
      select: {
        availableTimings: {
          select: {
            startingTime: true,
            endingTime: true,
          },
        },
      },
      where: {
        day: dayEnum,
        professionalUserId: professionalUser?.id,
        available : true
      },
    });

   

    const formattedTimeSlots = 
     
      timeSlots.map((item,index) => (
        {
          
         availableTimings : item.availableTimings.map((items) => ({
          startingTime : createTimeDate(getHours(items.startingTime), getMinutes(items.startingTime),date),
          endingTime : createTimeDate(getHours(items.endingTime), getMinutes(items.endingTime),date)
         }))
        }
      ))
    console.log("formattedTimeSlots", formattedTimeSlots.length
    )
    console.log("timeSlotsquery", createTimeDate(getHours(timeSlots[0]?.availableTimings[0]?.startingTime!), getMinutes(timeSlots[0]?.availableTimings[0]?.startingTime!),date));
    // return { timeSlots };
   
    return { timeSlots: formattedTimeSlots}
  }),
});
