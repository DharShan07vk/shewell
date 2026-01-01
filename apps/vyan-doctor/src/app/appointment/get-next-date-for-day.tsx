import { Day } from "@repo/database";


function GetNextDateForDay(day: Day): Date {
    const daysMap: Record<Day, number> = {
      [Day.MON]: 1,
      [Day.TUE]: 2,
      [Day.WED]: 3,
      [Day.THU]: 4,
      [Day.FRI]: 5,
      [Day.SAT]: 6,
      [Day.SUN]: 0
    };
  
    const today = new Date();
    const targetDayIndex = daysMap[day];
    
    // If today matches the target day, return today's date
    if (today.getDay() === targetDayIndex) {
      return today;
    }
    
    // Calculate days to add to get to the next occurrence of the day
    const daysToAdd = (targetDayIndex - today.getDay() + 7) % 7;
    
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysToAdd);
    
    return nextDate;
  }
  export default GetNextDateForDay