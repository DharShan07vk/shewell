import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, setHours, setMinutes } from "date-fns";


interface ITimeValue {
  hour: number;
  minute: number;
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createTime = (hour: number, minute: number): Date => {
  const date = new Date();
  return setMinutes(setHours(date, hour), minute);
};
// Function to convert Date objects to ITimeValue
 export function dateToITimeValue(date: Date): ITimeValue {
    const hours = parseInt(format(date, "hh"));
    const minutes = parseInt(format(date, "mm"));
    return { hour: hours, minute: minutes };
  }

  export const createTimeDate = (
    hour: number,
    minute: number,
    date: Date,
  ): Date => {
    // console.log("date", hour, minute, date);
    return setMinutes(setHours(date, hour), minute);
  };
  