"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const MyAppointments = () => {
  const session = useSession();
  console.log("session sf", session);
  return (
    <>
     <Link href="/appointment">
     <div className="container mx-auto pt-[16px] pb-[16px]">
        <div className="flex flex-col gap-6 xl:gap-[36px] 2xl:gap-[40px]">
          <div className="flex flex-col gap-2 md:gap-4 xl:gap-6">
            <div className="text-center font-poppins text-[22px] font-bold leading-[32px] md:text-[30px] md:leading-[48px] xl:text-[36px] 2xl:text-[40px] 2xl:leading-[52px]">
              MY APPOINTMENTS
            </div>
            <div className="text-justify font-inter text-sm font-normal leading-[20px] text-inactive md:text-center xl:text-base 2xl:text-[18px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:justify-center xl:gap-[50px]">
            <div className="w-full md:w-[391px]">
              <div className="relative aspect-[391/406] w-full">
                <Image
                  src="/images/appointment-calendar.png"
                  alt="appointment-calendar.png"
                  fill={true}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-[392px]">
              <div className="relative aspect-[392/448] w-full">
                <Image
                  src="/images/meetings.png"
                  alt="meetings.png"
                  fill={true}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
     </Link>
    </>
  );
};
export default MyAppointments;
