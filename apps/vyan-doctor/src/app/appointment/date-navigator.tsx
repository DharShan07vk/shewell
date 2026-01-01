// "use client";
// import { Button } from "@repo/ui/src/@/components/button";
// import { useState } from "react";
// import { api } from "~/trpc/react";

// const DateNavigator = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const handlePrevious = () => {
//     setCurrentDate(
//       (prevDate) => new Date(prevDate.setDate(prevDate.getDate() - 1)),
//     );
//   };
//   const { data } = api.searchMeeting.searchMeeting.useQuery({
//     date: currentDate,
//   });

//   console.log("meetings", data);
//   const handleNext = () => {
//     setCurrentDate(
//       (prevDate) => new Date(prevDate.setDate(prevDate.getDate() + 1)),
//     );
//   };

//   const formatDate = (date: Date) => {
//     return date.toDateString();
//   };
//   return (
//     <>
//       <div className=" mt-4 flex items-center justify-center gap-6">
//         <Button
//           className="bg-[#ECECEC] hover:bg-[#ECECEC]"
//           onClick={handlePrevious}
//         >
//           <svg
//             width="18"
//             height="18"
//             viewBox="0 0 18 18"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M11.6923 15.3595C11.5357 15.3595 11.3792 15.3073 11.2749 15.1769L5.37921 9.17689C5.14443 8.9421 5.14443 8.57689 5.37921 8.3421L11.2749 2.3421C11.5096 2.10732 11.8749 2.10732 12.1096 2.3421C12.3444 2.57689 12.3444 2.9421 12.1096 3.17689L6.63139 8.7595L12.1357 14.3421C12.3705 14.5769 12.3705 14.9421 12.1357 15.1769C11.9792 15.2812 11.8488 15.3595 11.6923 15.3595Z"
//               fill="#121212"
//             />
//           </svg>
//         </Button>
//         <span className="font-inter text-[20px] font-bold leading-[30px] text-active">
//           {formatDate(currentDate)}
//         </span>
//         <Button
//           className="bg-[#ECECEC] hover:bg-[#ECECEC]"
//           onClick={handleNext}
//         >
//           <svg
//             width="8"
//             height="14"
//             viewBox="0 0 8 14"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M0.796603 13.3595C0.640082 13.3595 0.509647 13.3073 0.379212 13.203C0.144429 12.9682 0.144429 12.603 0.379212 12.3682L5.85747 6.75949L0.379212 1.17689C0.144429 0.942103 0.144429 0.576885 0.379212 0.342103C0.613995 0.10732 0.979212 0.10732 1.21399 0.342103L7.10965 6.3421C7.34443 6.57688 7.34443 6.9421 7.10965 7.17688L1.21399 13.1769C1.10965 13.2812 0.953125 13.3595 0.796603 13.3595Z"
//               fill="#121212"
//             />
//           </svg>
//         </Button>
//       </div>
//     </>
//   );
// };
// export default DateNavigator;

"use client";
import { Button } from "@repo/ui/src/@/components/button";
import { useState } from "react";
import { api } from "~/trpc/react";
import Meetings from "./meetings";

const DateNavigator = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevious = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNext = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 1);
      return newDate;
    });
  };

  const { data } = api.searchMeeting.searchMeeting.useQuery({
    date: currentDate,
  });

  console.log("meetingsDoctor", data);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="mt-4 flex items-center justify-center gap-6">
          <Button
            className="bg-[#ECECEC] hover:bg-[#ECECEC]"
            onClick={handlePrevious}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.6923 15.3595C11.5357 15.3595 11.3792 15.3073 11.2749 15.1769L5.37921 9.17689C5.14443 8.9421 5.14443 8.57689 5.37921 8.3421L11.2749 2.3421C11.5096 2.10732 11.8749 2.10732 12.1096 2.3421C12.3444 2.57689 12.3444 2.9421 12.1096 3.17689L6.63139 8.7595L12.1357 14.3421C12.3705 14.5769 12.3705 14.9421 12.1357 15.1769C11.9792 15.2812 11.8488 15.3595 11.6923 15.3595Z"
                fill="#121212"
              />
            </svg>
          </Button>
          <span className="font-inter text-[20px] font-bold leading-[30px] text-active">
            {formatDate(currentDate)}
          </span>
          <Button
            className="bg-[#ECECEC] hover:bg-[#ECECEC]"
            onClick={handleNext}
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.796603 13.3595C0.640082 13.3595 0.509647 13.3073 0.379212 13.203C0.144429 12.9682 0.144429 12.603 0.379212 12.3682L5.85747 6.75949L0.379212 1.17689C0.144429 0.942103 0.144429 0.576885 0.379212 0.342103C0.613995 0.10732 0.979212 0.10732 1.21399 0.342103L7.10965 6.3421C7.34443 6.57688 7.34443 6.9421 7.10965 7.17688L1.21399 13.1769C1.10965 13.2812 0.953125 13.3595 0.796603 13.3595Z"
                fill="#121212"
              />
            </svg>
          </Button>
        </div>
      </div>
    </>
  );
};

export default DateNavigator;
