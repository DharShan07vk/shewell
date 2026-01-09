import { Day } from "@repo/database";
import { TimeValue } from "react-aria";
export interface IAvailability {
  availability: {
    available: boolean;
    day: Day;
    availableTimings: {
      startingTime: { hour: number; minute: number };
      endingTime: { hour: number; minute: number };
    }[];
  }[];
};
