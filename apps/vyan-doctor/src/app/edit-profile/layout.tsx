"use client";
import { Button } from "@repo/ui/src/@/components/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import path from "path";
import { useState } from "react";
import StepperEditProfile from "./stepper-edit-profile";
import React from "react";
import { useSession } from "next-auth/react";

const EditProfileLayout = ({ children }: { children: React.ReactNode }) => {

  const searchParams = useSearchParams();
  

  const session = useSession();

  const router = useRouter();
  if (session.status === "unauthenticated") {
    router.push("/auth/login");
  }
  const step = searchParams.get("step");
  const [steP, setStep] = useState<string>("1");
  return (
    <>
      <div className="w-full">
        <div className="  bg-[url('/images/header.png')] bg-contain  bg-no-repeat	pt-[120px] sm:pt-[165px] ">
          <div className="bg-white  md:rounded-t-[50px]">
            <div className="container mx-auto ">
              <div className="flex flex-col gap-[42px] pb-8 pt-[18px] md:gap-[50px] md:pb-[50px] md:pt-5 xl:mb-[52px] xl:mt-6 xl:gap-[56px] 2xl:mb-[65px] 2xl:mt-8 2xl:gap-[72px]">
                {/* status and preview */}
                
                <div className="flex justify-center gap-2  sm:justify-end sm:gap-6 flex-wrap ">
                <Link href="/dashboard">
                <Button className="rounded-md bg-primary px-4 py-2 font-inter font-medium shadow-[2px_2px_4px_0px_rgba(64,64,64,0.25)] hover:bg-secondary xs:text-xs sm:text-base">
                    <svg
                      className="mr-1 inline"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.464 14.5358C18.8857 15.9035 17.9811 17.1087 16.8293 18.0461C15.6776 18.9834 14.3138 19.6244 12.8571 19.9129C11.4005 20.2014 9.8953 20.1287 8.47323 19.7011C7.05116 19.2735 5.75548 18.5041 4.69948 17.46C3.64347 16.416 2.85929 15.1292 2.41549 13.7121C1.97169 12.295 1.88179 10.7908 2.15364 9.33094C2.42549 7.87107 3.05082 6.50002 3.97495 5.33766C4.89909 4.1753 6.0939 3.25701 7.45491 2.66309"
                        stroke="white"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M20.1768 11.0001C20.1768 9.80625 19.9417 8.62411 19.4848 7.52115C19.028 6.41819 18.3583 5.41601 17.5142 4.57185C16.67 3.72768 15.6678 3.05804 14.5649 2.60118C13.4619 2.14432 12.2798 1.90918 11.0859 1.90918V11.0001H20.1768Z"
                        stroke="white"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Check Stats
                  </Button>
                </Link>
                  <Link href="/doctor-profile">
                    <Button className="rounded-md bg-black px-4 py-2 font-inter font-medium shadow-[2px_2px_4px_0px_rgba(64,64,64,0.25)] hover:bg-black xs:text-xs sm:text-base">
                      <svg
                        className="mr-1 inline"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_4616_30594)">
                          <path
                            d="M19.6757 9.30851C18.5533 7.86933 17.0993 6.6789 15.4712 5.86601C13.8091 5.03621 12.0211 4.60566 10.1546 4.58309C10.1032 4.58168 9.8968 4.58168 9.84539 4.58309C7.97891 4.6057 6.19087 5.03621 4.52884 5.86601C2.90068 6.6789 1.44681 7.86929 0.324316 9.30851C-0.108105 9.86292 -0.108105 10.6373 0.324316 11.1917C1.44677 12.6309 2.90068 13.8214 4.52884 14.6342C6.19087 15.464 7.97887 15.8946 9.84539 15.9172C9.8968 15.9186 10.1032 15.9186 10.1546 15.9172C12.0211 15.8945 13.8091 15.464 15.4712 14.6342C17.0993 13.8214 18.5532 12.631 19.6757 11.1917C20.1081 10.6373 20.1081 9.86292 19.6757 9.30851ZM4.89231 13.9063C3.37201 13.1473 2.01427 12.0355 0.965877 10.6914C0.76326 10.4316 0.76326 10.0687 0.965877 9.8089C2.01423 8.46472 3.37197 7.353 4.89231 6.59394C5.32411 6.37839 5.76505 6.19199 6.21415 6.03418C5.05876 7.07277 4.33083 8.57792 4.33083 10.2501C4.33083 11.9224 5.0588 13.4276 6.2143 14.4662C5.7652 14.3084 5.32415 14.1219 4.89231 13.9063ZM10 15.1057C7.32262 15.1057 5.14442 12.9275 5.14442 10.2501C5.14442 7.57265 7.32262 5.39449 10 5.39449C12.6775 5.39449 14.8557 7.57269 14.8557 10.2501C14.8557 12.9275 12.6775 15.1057 10 15.1057ZM19.0342 10.6913C17.9858 12.0355 16.6281 13.1472 15.1078 13.9063C14.6765 14.1216 14.2358 14.3072 13.7873 14.4648C14.9419 13.4263 15.6692 11.9216 15.6692 10.2501C15.6692 8.57765 14.9411 7.0723 13.7855 6.03371C14.2348 6.19156 14.6759 6.3782 15.1078 6.59386C16.6281 7.35292 17.9858 8.46464 19.0342 9.80882C19.2368 10.0687 19.2368 10.4315 19.0342 10.6913Z"
                            fill="white"
                          />
                          <path
                            d="M9.9998 8.17188C8.85402 8.17188 7.92188 9.10402 7.92188 10.2498C7.92188 11.3956 8.85402 12.3277 9.9998 12.3277C11.1456 12.3277 12.0777 11.3956 12.0777 10.2498C12.0778 9.10402 11.1456 8.17188 9.9998 8.17188ZM9.9998 11.5142C9.30265 11.5142 8.73543 10.947 8.73543 10.2498C8.73543 9.55261 9.30258 8.98547 9.9998 8.98547C10.6969 8.98547 11.2641 9.55261 11.2641 10.2498C11.2642 10.947 10.6969 11.5142 9.9998 11.5142Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_4616_30594">
                            <rect
                              width="20"
                              height="20"
                              fill="white"
                              transform="translate(0 0.25)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      Preview
                    </Button>
                  </Link>
                  <Link href="/appointment">
                  <Button className="rounded-md bg-black px-4 py-2 font-inter font-medium shadow-[2px_2px_4px_0px_rgba(64,64,64,0.25)] hover:bg-black xs:text-xs sm:text-base">
                    Add your slots
                  </Button>
                  </Link>
                </div>
                {/* edit-profile-form */}
                <div>
                  <div className="mb-6 font-inter text-lg font-semibold text-active md:mb-[28px] md:text-[20px] md:leading-[30px] xl:mb-8 xl:text-2xl 2xl:mb-[40px] 2xl:text-[28px] 2xl:leading-[38px]">
                    Edit Profile
                  </div>

                  <div className="flex flex-col md:flex-row md:gap-7 xl:gap-8 2xl:gap-10">
                    {/* div-left-headings */}
                    <div className="flex flex-col gap-[50px] md:basis-[278px] xl:basis-[312px] 2xl:basis-[370px]">
                      {/* headings */}
                      <div className="">
                        <StepperEditProfile />
                      </div>

                      {/* image */}
                      <Link className="hidden md:block " href="/">
                        <div className="w-[280px] md:w-[278px]">
                          <div className="relative aspect-square w-full ">
                            <Image
                              src="/images/cta.png"
                              alt=""
                              fill={true}
                              className="rounded-md object-cover"
                            />
                          </div>
                        </div>
                      </Link>
                    </div>
                    {/* right-content-based-on-heading */}
                    <div className="flex w-full flex-col gap-5 md:basis-[598px] md:gap-7 xl:basis-[936px] xl:gap-8 2xl:basis-[936px] 2xl:gap-10">
                      {/* form-content */}
                      <div className="w-full ">{children}</div>
                      {/* image */}
                      <Link className="block md:hidden " href="/">
                        <div className="w-[280px] sm:w-[400px]">
                          <div className="relative aspect-square w-full ">
                            <Image
                              src="/images/cta.png"
                              alt=""
                              fill={true}
                              className="rounded-md object-cover"
                            />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditProfileLayout;
