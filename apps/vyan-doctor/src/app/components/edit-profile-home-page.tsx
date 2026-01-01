"use client";
import { Button } from "@repo/ui/src/@/components/button";
import Image from "next/image";
import Link from "next/link";

const EditProfileHomePage = () => {
  return (
    <>
      <Link href={"/edit-profile/personal-info"}>
        {" "}
        <div className="container mx-auto">
          <div className="mb-[32px] flex flex-col  gap-[32px] md:mb-[65px] xl:flex-row xl:items-center xl:gap-[36px]">
            <div className="flex flex-col items-center justify-center gap-[12px] md:gap-[16px] lg:gap-[24px] xl:basis-1/3 xl:items-start xl:justify-start">
              <div className="font-poppins text-[22px] font-bold leading-[32px] md:text-[30px] md:leading-[48px] lg:text-[36px] lg:leading-[45px] 2xl:text-[40px] 2xl:leading-[52px]">
                Edit Your Profile
              </div>
              <div className="text-center font-inter text-sm font-normal leading-[20px] text-[#4D4D4D] lg:text-base lg:leading-[24px] xl:text-start 2xl:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
                ipsum dolor sit.
              </div>
              <div>
                <Link href="/doctor-profile">
                  <Button className="rounded-md bg-primary px-4 py-3 font-inter text-base  font-medium leading-[24px] text-white shadow-[2px_2px_4px_0px_rgba(64,64,64,0.25)]">
                    Edit Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="xl:basis-2/3">
              <div className="w-full ">
                <div className="relative aspect-[968/567] w-full">
                  <Image
                    src="/images/edit-slots.png"
                    alt=""
                    className="object-cover"
                    fill={true}
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
export default EditProfileHomePage;
