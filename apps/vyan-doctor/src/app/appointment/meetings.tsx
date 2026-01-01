import MeetingCard from "./overlay-meeting-card";
import { api } from "~/trpc/react";
const Meetings = () => {
  return (
    <>
      <div className="rounded-[14px] border border-secondary bg-[#F2FFF9] px-3 py-3 md:p-5 xl:p-8 ">
        {/* outer-div */}
        <div className="flex items-center justify-between">
          {/* left-div */}
          <div className="flex flex-col gap-3 xl:gap-4">
            <div className="flex items-center gap-4">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="5.88267" cy="5.97447" r="5.88267" fill="#03781D" />
              </svg>
              <div className="font=inter text-base font-medium text-active xl:text-[20px] xl:leading-[30px]">
                Meeting with Tannu( Couple)
              </div>
            </div>
            <div className="flex items-center gap-2 ">
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
                9:00AM - 10:00AM
              </div>
            </div>
          </div>
          {/* right-div */}
          <div>{/* <MeetingCard /> */}</div>
        </div>
      </div>
    </>
  );
};
export default Meetings;
