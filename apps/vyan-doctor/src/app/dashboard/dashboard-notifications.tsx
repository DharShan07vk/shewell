"use client ";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/src/@/components/select";

export const NotificationCard = ({
  title,
  time,
  message,
}: {
  title: string;
  time: string;
  message: string;
}) => {
  return (
    <div className="flex flex-col gap-2 py-[12px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="h-[6px] w-[6px] rounded-full bg-secondary"></div>
          <div className="font-inter text-sm font-medium text-active 2xl:text-[17px] 2xl:leading-[24px]">
            {title}
          </div>
        </div>
        <div className="font-inter text-xs font-medium text-secondary 2xl:text-sm ">
          {time}
        </div>
      </div>
      <div className="font-inter text-sm font-normal text-inactive 2xl:text-[17px] 2xl:leading-[24px]">
        {message}
      </div>
    </div>
  );
};

const cards = [
  {
    title: "Upcoming Appointment",
    time: "11:00 AM",
    message: "Your next meeting is about to start , please login into",
  },
  {
    title: "Transaction of INR 30,000 into y..",
    time: "9:45 AM",
    message: "Dear Doc, as your booked appointment we have trans",
  },
  {
    title: "Appointment Confirmation",
    time: "9:45 AM",
    message: "Dear Doc, the patient has confirmed the appointment",
  },
];
const DashboardNotification = () => {
  return (
    <div className="rounded-[9.37px] border border-[#DFE7EF] p-4 sm:p-6 xl:p-5 2xl:p-[26px]">
      {/* notification and dropdown */}
      <div className="mb-3 flex items-center justify-between 2xl:mb-[14px]">
        <div className="font-inter text-base font-semibold text-active lg:text-xl 2xl:text-2xl">
          Notification
        </div>

        <Select>
          <SelectTrigger className="w-[107px]">
            <SelectValue className="text-[14px]" placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="bg-white ">
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* notification-card */}
      <div className="flex flex-col divide-y-2 divide-[#8F8F8F]">
        {cards.map((item, index) => {
          return (
            <>
              <NotificationCard
                title={item.title}
                message={item.message}
                time={item.time}
              />
            </>
          );
        })}
      </div>

      {/* transaction */}
      <div className="flex  gap-3 rounded-[12px] bg-secondary p-[10px] ">
        <div className=" flex items-center gap-[10px] ">
          <div>
            <svg
              width="39"
              height="39"
              viewBox="0 0 39 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.960938"
                y="0.222656"
                width="37.8501"
                height="37.8501"
                rx="5.97632"
                fill="url(#paint0_linear_4471_111929)"
              />
              <path
                d="M28.4549 23.8794L27.2389 22.13C27.0729 21.8922 26.9836 21.6094 26.9829 21.3193V16.2988C26.9829 14.4128 26.2337 12.604 24.9001 11.2703C23.5664 9.93672 21.7577 9.1875 19.8716 9.1875C17.9856 9.1875 16.1768 9.93672 14.8432 11.2703C13.5096 12.604 12.7603 14.4128 12.7603 16.2988V21.3193C12.7597 21.6094 12.6703 21.8922 12.5043 22.13L11.2883 23.8794C11.1042 24.0834 10.9831 24.3364 10.9397 24.6078C10.8963 24.8791 10.9325 25.1573 11.0438 25.4085C11.1551 25.6598 11.3369 25.8734 11.5671 26.0235C11.7972 26.1737 12.066 26.2539 12.3408 26.2546H16.3871C16.5503 27.0584 16.9864 27.781 17.6214 28.3C18.2565 28.8191 19.0514 29.1027 19.8716 29.1027C20.6918 29.1027 21.4868 28.8191 22.1218 28.3C22.7569 27.781 23.1929 27.0584 23.3562 26.2546H27.4025C27.6773 26.2539 27.946 26.1737 28.1762 26.0235C28.4064 25.8734 28.5881 25.6598 28.6994 25.4085C28.8108 25.1573 28.8469 24.8791 28.8035 24.6078C28.7601 24.3364 28.6391 24.0834 28.4549 23.8794ZM19.8716 27.6768C19.4315 27.6756 19.0025 27.5382 18.6435 27.2836C18.2844 27.029 18.013 26.6696 17.8662 26.2546H21.877C21.7303 26.6696 21.4588 27.029 21.0998 27.2836C20.7408 27.5382 20.3118 27.6756 19.8716 27.6768ZM12.3408 24.8323C12.3729 24.8025 12.4016 24.7691 12.4261 24.7328L13.6706 22.9407C14.0026 22.4651 14.1812 21.8994 14.1826 21.3193V16.2988C14.1826 14.79 14.782 13.3429 15.8489 12.276C16.9158 11.2091 18.3628 10.6098 19.8716 10.6098C21.3804 10.6098 22.8275 11.2091 23.8944 12.276C24.9613 13.3429 25.5606 14.79 25.5606 16.2988V21.3193C25.562 21.8994 25.7407 22.4651 26.0727 22.9407L27.3171 24.7328C27.3417 24.7691 27.3703 24.8025 27.4025 24.8323H12.3408Z"
                fill="white"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_4471_111929"
                  x1="1.95699"
                  y1="0.222657"
                  x2="38.811"
                  y2="38.0727"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop
                    offset="0.16792"
                    stop-color="#E9E9E9"
                    stop-opacity="0.5"
                  />
                  <stop
                    offset="0.900557"
                    stop-color="#EAEAEA"
                    stop-opacity="0.3"
                  />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-inter text-base font-semibold text-white">
              Transaction of INR 30,000 .
            </div>
            <div className="font-inter text-base font-normal text-white">
              Dear Doc, as per your booked appointment we have transferred.....
            </div>
          </div>
        </div>
        <div className="font-inter text-sm font-normal text-[#ECECEC]">
          34m ago
        </div>
      </div>
    </div>
  );
};

export default DashboardNotification;
