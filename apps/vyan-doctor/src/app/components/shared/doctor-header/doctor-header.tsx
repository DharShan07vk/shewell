"use client";
import Link from "next/link";
import TopBar from "../../doctor-header-top-bar";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@repo/ui/src/@/components/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@repo/ui/src/@/components/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/src/@/components/accordion";
import { Button } from "@repo/ui/src/@/components/button";
import User from "./user";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { RiLogoutCircleRLine } from "react-icons/ri";
import React from "react";
import { ChevronRight } from 'lucide-react';
import SearchDialog from "./search-dialog";
import { env } from "~/env";
import { PiUserSwitchBold } from "react-icons/pi";

const DoctorHeader = () => {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [openSearchDialog, setOpenSearchDialog] = useState<boolean>(false);
  const session = useSession();
  console.log("sessionAtHeader", session);
  const router = useRouter();
  const pathname = usePathname()
  
  return (
    <>
      <div className="w-full">
        <div className="z-50">
          {/* topbar */}
          <TopBar />

          {/* middlebar */}
          <div className="w-full bg-white">
            <div className="py-[11px] md:py-[16px] xl:py-[19px]">
              <div className="container mx-auto max-w-full">
                <div className="flex items-center justify-between">
                  {/* logo */}
                  <Link href="/">
                    <div className="relative aspect-[3.68/1] h-[44px] cursor-pointer">
                      <Image
                        src="/images/vyan-logo.png"
                        fill
                        alt="logo"
                        className="h-auto max-w-full"
                      />
                    </div>
                  </Link>
                  {/* for larger screen */}
                  <div className="hidden lg:block">
                    <div className="flex gap-[22px]">
                      <Link
                        href="/"
                        className={`px-4 py-2 font-inter text-sm font-medium leading-[20px] text-active hover:rounded-md hover:bg-primary hover:text-white 2xl:text-lg ${pathname === '/' ? 'bg-primary rounded-md text-white' :""}`}
                      >
                        Home
                      </Link>
                      <Link
                        href="/doctor-profile"
                        className={`px-4 py-2 font-inter text-sm font-medium leading-[20px] text-active hover:rounded-md hover:bg-primary hover:text-white  2xl:text-lg ${pathname === '/doctor-profile' ? 'bg-primary rounded-md text-white' : ""}`}
                      >
                        Profile
                      </Link>
                      {/* <div className=" px-4 py-2 font-inter text-sm font-medium leading-[20px] text-active hover:rounded-md hover:bg-primary  hover:text-white  2xl:text-lg">
                        Appointments
                      </div> */}
                      <NavigationMenu>
                        <NavigationMenuList>
                          <NavigationMenuItem>
                            <NavigationMenuTrigger className={`px-4 py-2 font-inter text-sm font-medium leading-[20px] text-active hover:rounded-md hover:bg-primary  hover:text-white  2xl:text-lg ${pathname === '/dashboard'  ?'bg-primary text-white rounded-md' :""} ${pathname === '/appointment' ? 'bg-primary text-white rounded-md' : ""}`} >
                             Appointments
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="flex flex-col bg-white p-5">
                              <Link href="/dashboard">
                                <NavigationMenuLink className="font-inter text-sm flex items-center">
                                <ChevronRight className="w-[18px]" />
                                  Dashboard
                                </NavigationMenuLink>
                              </Link>
                              <Link href="/appointment">
                                {" "}
                                <NavigationMenuLink className="font-inter text-sm flex items-center">
                                  <ChevronRight className="w-[18px]"/>
                               {" "}
                                  Calendar
                                </NavigationMenuLink>
                              </Link>
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        </NavigationMenuList>
                      </NavigationMenu>

                      {/* <div className="px-4 py-2 font-inter text-sm font-medium leading-[20px] text-active hover:rounded-md hover:bg-primary  hover:text-white  2xl:text-lg">
                        Our Plans
                      </div> */}

                      <NavigationMenu>
                        <NavigationMenuList>
                          <NavigationMenuItem>
                            <NavigationMenuTrigger className={`px-4 py-2 font-inter text-sm font-medium leading-[20px] text-active hover:rounded-md hover:bg-primary  hover:text-white  2xl:text-lg ${pathname === '/blogs' ? 'bg-primary text-white rounded-md': ""}`}>
                              More
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="flex flex-col bg-white px-5 py-3">
                              <Link href="/blogs">
                                <NavigationMenuLink className="font-inter text-sm flex items-center" >
                                <ChevronRight className="w-[18px]" />
                                  Blogs</NavigationMenuLink>
                              </Link>
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        </NavigationMenuList>
                      </NavigationMenu>
                    </div>
                  </div>
                  {/* search , user, profile menu for smaller screen */}
                  <div className="flex items-center gap-[10px] sm:gap-[17px]">
                    {/* search */}

                    <div className="block md:hidden" 
                    onClick={() => setOpenSearchDialog(true)}>
                      
                      {" "}
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <ellipse
                          cx="8.70263"
                          cy="9.20869"
                          rx="7.59325"
                          ry="7.53022"
                          stroke="black"
                          stroke-width="1.20637"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M13.9922 15.7063L17.7736 19.4563"
                          stroke="black"
                          stroke-width="1.20637"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="relative hidden md:block" onClick={() => setOpenSearchDialog(true)}>
                      
                      <input
                        className="md:width-[141px] lg:width-[194px]   w-[102px] rounded-lg border-[1px] border-black py-2 pl-[38px] font-inter text-sm font-normal leading-[20px] placeholder:text-black lg:gap-[25px]"
                        placeholder="Search"
                      />
                      <div className="absolute left-2 top-2 ">
                        {" "}
                        <svg
                          width="20"
                          height="21"
                          viewBox="0 0 20 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <ellipse
                            cx="8.70263"
                            cy="9.20869"
                            rx="7.59325"
                            ry="7.53022"
                            stroke="black"
                            stroke-width="1.20637"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M13.9922 15.7063L17.7736 19.4563"
                            stroke="black"
                            stroke-width="1.20637"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    {/* user */}
                    <div>
                      {/* <svg
                        width="26"
                        height="27"
                        viewBox="0 0 26 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="User" clip-path="url(#clip0_6059_6598)">
                          <path
                            id="Vector"
                            d="M12.817 13.0918C14.5377 13.0918 16.0274 12.4747 17.2449 11.2571C18.4621 10.0398 19.0794 8.55026 19.0794 6.82946C19.0794 5.10924 18.4623 3.61953 17.2447 2.40178C16.0272 1.18461 14.5375 0.567505 12.817 0.567505C11.0962 0.567505 9.60672 1.18461 8.38936 2.40197C7.172 3.61933 6.55469 5.10905 6.55469 6.82946C6.55469 8.55026 7.172 10.04 8.38936 11.2573C9.60712 12.4745 11.0968 13.0918 12.817 13.0918ZM9.46687 3.47929C10.401 2.54519 11.4967 2.09114 12.817 2.09114C14.1372 2.09114 15.2331 2.54519 16.1674 3.47929C17.1015 4.41358 17.5558 5.50954 17.5558 6.82946C17.5558 8.14977 17.1015 9.24553 16.1674 10.1798C15.2331 11.1141 14.1372 11.5682 12.817 11.5682C11.4971 11.5682 10.4014 11.1139 9.46687 10.1798C8.53258 9.24573 8.07832 8.14977 8.07832 6.82946C8.07832 5.50954 8.53258 4.41358 9.46687 3.47929Z"
                            fill="#121212"
                          />
                          <path
                            id="Vector_2"
                            d="M23.7722 20.5609C23.7371 20.0543 23.666 19.5016 23.5615 18.918C23.456 18.3301 23.3201 17.7743 23.1574 17.2663C22.9892 16.7412 22.7609 16.2227 22.4782 15.7258C22.1853 15.21 21.8409 14.7609 21.4545 14.3914C21.0504 14.0048 20.5557 13.6939 19.9836 13.4672C19.4135 13.2417 18.7817 13.1274 18.1059 13.1274C17.8405 13.1274 17.5838 13.2363 17.0881 13.559C16.783 13.758 16.4261 13.9881 16.0278 14.2426C15.6872 14.4596 15.2258 14.6629 14.6559 14.847C14.0999 15.0269 13.5354 15.1182 12.978 15.1182C12.421 15.1182 11.8564 15.0269 11.3 14.847C10.7307 14.6631 10.2691 14.4598 9.92912 14.2428C9.53458 13.9907 9.17752 13.7606 8.86787 13.5588C8.37256 13.2361 8.11587 13.1272 7.85046 13.1272C7.17444 13.1272 6.54285 13.2417 5.97295 13.4674C5.40126 13.6937 4.90634 14.0046 4.50188 14.3916C4.11546 14.7613 3.7711 15.2102 3.47832 15.7258C3.19604 16.2227 2.96753 16.741 2.79932 17.2665C2.63686 17.7745 2.50098 18.3301 2.39545 18.918C2.29071 19.5008 2.21989 20.0537 2.18478 20.5615C2.15027 21.058 2.13281 21.5747 2.13281 22.0968C2.13281 23.454 2.56425 24.5528 3.41504 25.3631C4.25531 26.1627 5.36694 26.5681 6.71919 26.5681H19.2384C20.5902 26.5681 21.7018 26.1627 22.5423 25.3631C23.3933 24.5534 23.8247 23.4542 23.8247 22.0966C23.8245 21.5727 23.8069 21.056 23.7722 20.5609ZM21.4918 24.2592C20.9366 24.7876 20.1994 25.0445 19.2382 25.0445H6.71919C5.75772 25.0445 5.0206 24.7876 4.46558 24.2594C3.92107 23.7411 3.65645 23.0335 3.65645 22.0968C3.65645 21.6096 3.67252 21.1286 3.70465 20.6668C3.73599 20.2137 3.80006 19.7161 3.89508 19.1872C3.98891 18.6649 4.10832 18.1748 4.25035 17.731C4.38663 17.3055 4.57249 16.8842 4.80299 16.4784C5.02298 16.0915 5.27609 15.7597 5.55539 15.4923C5.81663 15.2422 6.14592 15.0374 6.53392 14.8839C6.89276 14.7419 7.29604 14.6641 7.73383 14.6524C7.78719 14.6808 7.8822 14.7349 8.03613 14.8353C8.34935 15.0394 8.71037 15.2723 9.10948 15.5272C9.55937 15.814 10.139 16.0731 10.8315 16.2967C11.5394 16.5256 12.2615 16.6418 12.9782 16.6418C13.6949 16.6418 14.4171 16.5256 15.1247 16.2969C15.8178 16.0729 16.3972 15.814 16.8477 15.5268C17.2561 15.2658 17.607 15.0396 17.9202 14.8353C18.0742 14.7351 18.1692 14.6808 18.2225 14.6524C18.6605 14.6641 19.0638 14.7419 19.4228 14.8839C19.8106 15.0374 20.1399 15.2424 20.4012 15.4923C20.6805 15.7595 20.9336 16.0913 21.1536 16.4786C21.3843 16.8842 21.5703 17.3057 21.7064 17.7308C21.8486 18.1752 21.9682 18.6651 22.0619 19.187C22.1567 19.7168 22.221 20.2147 22.2523 20.667V20.6674C22.2846 21.1274 22.3009 21.6082 22.3011 22.0968C22.3009 23.0337 22.0363 23.7411 21.4918 24.2592Z"
                            fill="#121212"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_6059_6598">
                            <rect
                              width="26"
                              height="26"
                              fill="white"
                              transform="translate(0 0.567383)"
                            />
                          </clipPath>
                        </defs>
                      </svg> */}
                      <User />
                    </div>
                    {/* profile menu for smaller screen */}
                    <div className="lg:hidden">
                      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                        <SheetTrigger>
                          {" "}
                          <svg
                            onClick={() => setSheetOpen(true)}
                            width="28"
                            height="27"
                            viewBox="0 0 28 27"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="Frame 39823">
                              <g id="Menu">
                                <path
                                  id="Vector 4"
                                  d="M24.2109 3.94238L13.7109 3.94238"
                                  stroke="#121212"
                                  stroke-width="1.75"
                                  stroke-linecap="round"
                                />
                                <path
                                  id="Vector 6"
                                  d="M13.7057 22.6091L2.03906 22.6091"
                                  stroke="#121212"
                                  stroke-width="1.75"
                                  stroke-linecap="round"
                                />
                                <path
                                  id="Vector 5"
                                  d="M24.2057 13.2756L2.03906 13.2756"
                                  stroke="#121212"
                                  stroke-width="1.75"
                                  stroke-linecap="round"
                                />
                              </g>
                            </g>
                          </svg>
                        </SheetTrigger>
                        <SheetContent
                          side="right"
                          className="flex w-full flex-col overflow-scroll bg-white"
                        >
                          <SheetClose>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                              fill="none"
                            >
                              <path
                                d="M21.274 5.29839L4.72852 20.9437"
                                stroke="#121212"
                                stroke-width="2.16667"
                                stroke-linecap="round"
                              />
                              <path
                                d="M20.3841 21.2728L4.72852 4.72729"
                                stroke="#121212"
                                stroke-width="2.16667"
                                stroke-linecap="round"
                              />
                            </svg>
                        </SheetClose>
                          <Link
                            onClick={() => setSheetOpen(false)}
                            className="font-inter text-sm font-medium  text-active"
                            href="/"
                          >
                            Home
                          </Link>
                          <Link
                            onClick={() => setSheetOpen(false)}
                            className="font-inter text-sm font-medium  text-active"
                            href="/doctor-profile"
                          >
                            Profile
                          </Link>
                          <Accordion type="single" collapsible>
                            <AccordionItem
                              value="item-1"
                              className="border-none"
                            >
                              <AccordionTrigger className="py-0 font-inter text-sm font-medium leading-[24px] text-active no-underline">
                                Appointments
                              </AccordionTrigger>
                              <AccordionContent className="flex flex-col gap-[16px] p-0 pt-[16px]">
                                <Link
                                 onClick={() => setSheetOpen(false)}
                                  className="font-inter text-xs font-medium leading-[20px] text-inactive pl-2"
                                  href="/dashboard"
                                >
                                  Dashboard
                                </Link>
                                <Link
                                  onClick={() => setSheetOpen(false)}
                                  className="font-inter text-xs font-medium leading-[20px] text-inactive pl-2"
                                  href="/appointment"
                                >
                                  Calendar
                                </Link>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                          {/* <Link
                            className="font-inter text-sm font-medium leading-[24px] text-active"
                            href=""
                          >
                            Our Plans
                          </Link> */}
                          <Accordion type="single" collapsible>
                            <AccordionItem
                              value="item-1"
                              className="border-none"
                            >
                              <AccordionTrigger className="py-0 font-inter text-sm font-medium leading-[24px] text-active no-underline">
                                More
                              </AccordionTrigger>
                              <AccordionContent className="flex flex-col gap-[16px] p-0 pt-[16px]">
                                <Link
                                  onClick={() => setSheetOpen(false)}
                                  className="font-inter text-xs font-medium leading-[20px] text-inactive pl-2"
                                  href="/blogs"
                                >
                                  Blogs
                                </Link>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>

                        <Link href={env.NEXT_PUBLIC_USER} target='_blank'>
                        <Button
                              className="flex w-full  gap-[12px] rounded-[6px] border border-black bg-white text-black hover:bg-white"
                            >
                              <span>
                              <PiUserSwitchBold />
                              </span>
                              Switch Account
                            </Button>
                        </Link>

                          {session.status === "authenticated" ? (
                            <Button
                              onClick={() => {
                                signOut({
                                  // redirect: false,
                                  // callbackUrl: "/"
                                }).then(() => router.push("/")),
                                setSheetOpen(false);
                                // update();
                              }}
                              className="flex w-full  gap-[12px] rounded-[6px] border border-black bg-white text-black hover:bg-white"
                            >
                              <span>
                                <RiLogoutCircleRLine />
                              </span>
                              Logout
                            </Button>
                          ) : (
                            <Link
                              onClick={() => setSheetOpen(false)}
                              href="/auth/login"
                            >
                              {" "}
                              <SheetDescription className="text-center">
                                <Button
                                  className=" "
                                  variant="login"
                                  size="large"
                                >
                                  Login
                                </Button>
                              </SheetDescription>
                            </Link>
                          )}

                          {/* 
                          <Link href="/auth/register/personal-information">
                            {" "}
                            <SheetDescription className="mt-2.5 ">
                              <div className="flex items-center justify-center gap-4">
                                <div className="font-inter text-sm font-normal text-active">
                                  Don't have Vyan Account
                                </div>
                                <Link
                                  href="/auth/register"
                                  className="font-poppins text-sm font-medium text-primary hover:underline  "
                                >
                                  Create account{" "}
                                  <svg
                                    className="ml-2 inline"
                                    width="15"
                                    height="8"
                                    viewBox="0 0 15 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M1.13634 3.36357L12.3273 3.36357L10.2318 1.26807C9.98332 1.01959 9.98332 0.616643 10.2318 0.368122C10.4803 0.119643 10.8833 0.119643 11.1318 0.368122L14.3136 3.54994C14.5621 3.79842 14.5621 4.20136 14.3136 4.44989L11.1318 7.6317C11.0075 7.75596 10.8447 7.81812 10.6818 7.81812C10.5189 7.81812 10.3561 7.75596 10.2318 7.6317C9.98332 7.38322 9.98332 6.98028 10.2318 6.73176L12.3273 4.6363L1.13634 4.6363C0.7849 4.6363 0.499979 4.35138 0.499979 3.99993C0.499979 3.64849 0.7849 3.36357 1.13634 3.36357Z"
                                      fill="#00898F"
                                    />
                                  </svg>
                                </Link>
                              </div>
                            </SheetDescription>
                          </Link> */}

                          <Link href="/auth/register/personal-information">
                            {" "}
                            <SheetDescription className="mt-2.5 ">
                              <div className="flex items-center justify-center gap-2">
                                <div className="font-inter text-xs font-normal text-active">
                                  Don't have Vyan Account
                                </div>
                                <Link
                                  href="/auth/register/personal-information"
                                  className="font-poppins text-xs font-medium text-primary hover:underline  "
                                >
                                  Create account{" "}
                                  <svg
                                    className="ml-2 inline"
                                    width="15"
                                    height="8"
                                    viewBox="0 0 15 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M1.13634 3.36357L12.3273 3.36357L10.2318 1.26807C9.98332 1.01959 9.98332 0.616643 10.2318 0.368122C10.4803 0.119643 10.8833 0.119643 11.1318 0.368122L14.3136 3.54994C14.5621 3.79842 14.5621 4.20136 14.3136 4.44989L11.1318 7.6317C11.0075 7.75596 10.8447 7.81812 10.6818 7.81812C10.5189 7.81812 10.3561 7.75596 10.2318 7.6317C9.98332 7.38322 9.98332 6.98028 10.2318 6.73176L12.3273 4.6363L1.13634 4.6363C0.7849 4.6363 0.499979 4.35138 0.499979 3.99993C0.499979 3.64849 0.7849 3.36357 1.13634 3.36357Z"
                                      fill="#00898F"
                                    />
                                  </svg>
                                </Link>
                              </div>
                            </SheetDescription>
                          </Link>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SearchDialog openSearchDialog={openSearchDialog} setOpenSearchDialog={setOpenSearchDialog}/>
    </>
  );
};
export default DoctorHeader;
