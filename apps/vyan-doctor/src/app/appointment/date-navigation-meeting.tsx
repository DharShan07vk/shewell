"use client";
import { Button } from "@repo/ui/src/@/components/button";
import React, { useEffect, useRef, useState } from "react";
import { api } from "~/trpc/react";
import EditAvailablity from "./add-unavailability";
import Meetings from "./meetings";
import MeetingCard from "./overlay-meeting-card";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { BookAppointmentStatus } from "@repo/database";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
interface IUnavailableDays {
  date: Date;
}
const DateNavigationMeeting = ({
  unavailableDays,
}: {
  unavailableDays: IUnavailableDays[];
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  // use to refetch the data using trpc
  const trpcContext = api.useUtils();

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

  const { data, refetch } = api.searchMeeting.searchMeeting.useQuery(
    {
      date: currentDate,
    },
    {
      refetchOnWindowFocus: true,
      enabled: !!currentDate,
    },
  );

  // console.log("meetingsDoctor", data);
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
      <div className="flex flex-col gap-5 md:gap-[37px] xl:gap-10">
        {/* upper-content */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:pl-[150px] lg:pl-[273px] xl:pl-[420px] 2xl:pl-[600px]">
          {/* date-navigator */}
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
              <span className="font-inter sm:text-[20px] xs:font-semibold xs:text-[15px] sm:font-bold leading-[30px] text-active">
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

          {/* edit-unavailability */}
        </div>
        {/* meetings */}
        <div className="flex flex-col gap-6 pb-[65px] 2xl:px-[176px]">
          {data?.typedMeetings.length! > 0
            ? data?.typedMeetings.map((meeting, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className="rounded-[14px] border border-secondary bg-[#F2FFF9] px-3 py-3 md:p-5 xl:p-8 "
                    >
                      {/* outer-div */}
                      <div className="flex items-center justify-between">
                        {/* left-div */}
                        <div className="flex flex-col gap-3 xl:gap-4">
                          <div className="flex items-center xs:gap-1 sm:gap-4 ">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="5.88267"
                                cy="5.97447"
                                r="5.88267"
                                fill="#03781D"
                              />
                            </svg>
                            <div className="font-inter xs:text-sm sm:text-base font-medium text-active xl:text-[20px] xl:leading-[30px]">
                              Meeting with {meeting.patient.firstName}
                            </div>
                            {BookAppointmentStatus.COMPLETED ===
                              meeting.status && <div className = "xs:text-sm sm:text-base">Completed</div>}
                          </div>
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                              <svg
                                width="19"
                                height="20"
                                viewBox="0 0 19 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M17.2574 9.97637C17.2574 14.306 13.7435 17.8199 9.41387 17.8199C5.08423 17.8199 1.57031 14.306 1.57031 9.97637C1.57031 5.64673 5.08423 2.13281 9.41387 2.13281C13.7435 2.13281 17.2574 5.64673 17.2574 9.97637Z"
                                  stroke="#7E7E7E"
                                  stroke-width="1.7648"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M12.3174 12.4672L9.88586 11.0161C9.4623 10.7651 9.11719 10.1612 9.11719 9.66703V6.45117"
                                  stroke="#7E7E7E"
                                  stroke-width="1.7648"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                              <div className="font-inter text-sm font-medium text-[#7E7E7E] xl:text-base">
                                {format(meeting.startingTime, "h':'mm a")}-{" "}
                                {format(meeting.endingTime, "h':'mm a")}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* right-div */}
                        <div>
                          <MeetingCard meetingInfo={meeting} />
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            : "No meetings aligned"}
        </div>
      </div>
    </>
  );
};
export default DateNavigationMeeting;
