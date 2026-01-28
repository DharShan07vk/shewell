"use client";
import { ShewellButton } from "~/components/ui";
import Image from "next/image";
import Link from "next/link";

const EditProfileHomePage = () => {
  return (
    <>
      <Link href={"/edit-profile/personal-info"}>
        {" "}
        <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-0">
          <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-[65px] flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:flex-row xl:items-center xl:gap-8 lg:gap-[36px]">
            <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:basis-1/3 xl:items-start xl:justify-start">
              <div className="font-poppins text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-gray-900">
                Edit Your Profile
              </div>
              <div className="text-center font-inter text-xs sm:text-sm md:text-base lg:text-lg font-normal leading-relaxed text-[#4D4D4D] xl:text-start">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
                ipsum dolor sit.
              </div>
              <div>
                <ShewellButton 
                  variant="medium"
                  href="/doctor-profile"
                >
                  Edit Now
                </ShewellButton>
              </div>
            </div>
            <div className="xl:basis-2/3">
              <div className="w-full">
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
