"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@repo/ui/src/@/components/breadcrumb";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/src/@/components/tabs";
import ProfileNav from "~/components/profile-nav";
import Ongoing from "./ongoing";
import Upcoming from "./upcoming";
// import Past from "./past";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/src/@/components/select";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Past from "./past";
import Cancelled from "./cancelled";
import React from "react";

enum Duration {
  ONE_WEEK = "1_WEEK",
  ONE_MONTH = "1_MONTH",
  THREE_MONTHS = "3_MONTHS",
  SIX_MONTHS = "6_MONTHS",
  ONE_YEAR = "1_YEAR",
}
const Orders = () => {
  const [duration, setDuration] = useState<Duration>(Duration.ONE_WEEK);
  const handleDurationChange = (value: Duration) => {
    setDuration(value);
  };

  const session = useSession();

  return (
    <>
      <div className="w-full bg-[#FBFBFB] font-inter">
        <div className="container mx-auto">
          <div className="py-4 md:py-6 xl:py-[28px] 2xl:py-[32px]">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>Appointments</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="pb-[32px] lg:pb-[55px] xl:pb-[60px] 2xl:pb-[65px]">
            <div className="items-start  xl:flex xl:flex-row xl:gap-[46px] 2xl:gap-[60px] ">
              <div className="w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] md:p-10">
                <div className="mb-6 flex justify-between font-poppins text-base font-semibold text-[#181818] lg:mb-[30px] lg:text-xl xl:mb-9 xl:text-2xl 2xl:mb-10 2xl:text-[28px] 2xl:leading-[38px]">
                  <div> Appointments</div>
                  <div>
                    <Select
                      value={duration}
                      onValueChange={handleDurationChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Past" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value={Duration.ONE_WEEK}>
                          1 week
                        </SelectItem>
                        <SelectItem value={Duration.ONE_MONTH}>
                          1 month
                        </SelectItem>
                        <SelectItem value={Duration.THREE_MONTHS}>
                          3 months
                        </SelectItem>
                        <SelectItem value={Duration.SIX_MONTHS}>
                          6 months
                        </SelectItem>
                        <SelectItem value={Duration.ONE_YEAR}>
                          1 year
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Tabs defaultValue="Ongoing">
                    <TabsList className="flex flex-wrap justify-center gap-10 gap-y-5 text-sm font-medium text-[#666666] md:text-base 2xl:text-lg">
                      <TabsTrigger
                        className="border-b-primary font-poppins data-[state=active]:border-b-2"
                        value="Ongoing"
                      >
                        Today
                      </TabsTrigger>
                      <TabsTrigger
                        className="border-b-primary font-poppins data-[state=active]:border-b-2"
                        value="Upcoming"
                      >
                        Upcoming
                      </TabsTrigger>
                      <TabsTrigger
                        className="border-b-primary font-poppins data-[state=active]:border-b-2"
                        value="Past"
                      >
                        Past
                      </TabsTrigger>
                      <TabsTrigger
                        className="border-b-primary font-poppins data-[state=active]:border-b-2"
                        value="Cancelled"
                      >
                        Cancelled
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent
                      value="Ongoing"
                      className="mt-7 lg:mt-[30px] xl:mt-9 2xl:mt-10"
                    >
                      <Ongoing />
                    </TabsContent>
                    <TabsContent
                      value="Upcoming"
                      className="mt-7 lg:mt-[30px] xl:mt-9 2xl:mt-10"
                    >
                      <Upcoming />
                    </TabsContent>

                    <TabsContent
                      value="Past"
                      className="mt-7 lg:mt-[30px] xl:mt-9 2xl:mt-10"
                    >
                      <Past duration={duration} />
                    </TabsContent>

                    <TabsContent
                      value="Cancelled"
                      className="mt-7 lg:mt-[30px] xl:mt-9 2xl:mt-10"
                    >
                      <Cancelled />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Orders;
