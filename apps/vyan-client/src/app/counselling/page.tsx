"use client";

import Image from "next/image";

import CompleteDoctorProfile from "~/app/counselling/complete-doctor-profile";
import { db } from "~/server/db";
import CousnsellingFilter from "./counselling-filter";
import CounsellingFilter from "./counselling-filter";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/src/@/components/select";
import { Button } from "@repo/ui/src/@/components/button";
import CompleteDoctorProfileSkeleton from "./complete-doctor-profile-skeleton";
import SkeletonLoader from "~/components/shared/skeleton-loader";

const Counselling = () => {
  function toUTCDate(date: Date) {
    return new Date(
      Date.UTC(date?.getFullYear(), date?.getMonth(), date?.getDate()),
    );
  }

  const searchParams = useSearchParams();
  console.log("searchParams", searchParams);
  const specialisationId = searchParams.get("specialisationId");
  const selectedDate = searchParams.get("selectedDate");
  const languageId = searchParams.get("languageId");
  const time = searchParams.get("time");
  const inputSearch = searchParams.get("therapistSearch");
  console.log("specialisationId", specialisationId);

  const { data: doctor } =
    api.findDoctorWithoutFilter.findDoctorWithoutFilter.useQuery();

  const { data: specialisation } =
    api.searchSpecialization.searchSpecialization.useQuery();

  const formattedLanguageIds: string[] =
    typeof languageId === "string" ? languageId.split(",") : [];
  console.log("formattedLanguageIds", formattedLanguageIds);
  console.log("selectedDate", selectedDate);
  console.log("time", time);
  console.log("inputSearch", inputSearch);
  const {
    data: filteredDoctors,
    refetch,
    isLoading,
  } = api.findDoctor.findDoctor.useQuery({
    specialisationId: specialisationId!,
    date: toUTCDate(new Date(selectedDate!)),
    languageIds: formattedLanguageIds,
    time: time,
    inputSearch: inputSearch,
  });
  console.log("filteredDoctors", filteredDoctors);
  useEffect(() => {
    refetch();
  }, [specialisationId]);

  const handleSpecialisationId = (value: string) => {
    // setSpecialisationId(value);
  };
  const handleDate = (value: Date) => {
    // setDate(value);
  };

  return (
    <>
      <div className="px-0 sm:px-0 md:px-0 lg:px-[0] xl:px-[0]">
        <section className="w-full overflow-hidden bg-white px-4 py-8 sm:px-6 sm:py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20">
          <div className="max-w-8xl mx-auto">
            {/* Section Header */}
            <div className="mb-8 text-center sm:mb-10 md:mb-16">
              <h2 className="mb-3 font-poppins text-lg font-medium leading-tight text-[#333333] sm:mb-4 sm:text-2xl md:mb-6 md:text-3xl lg:text-[54px] xl:text-[54px]">
                Find Your Trusted Care Partner
              </h2>
              <p className="mx-auto px-2 text-xs text-[#33333399] sm:px-4 sm:text-sm md:px-6 md:text-base lg:px-6 lg:text-[26px] xl:text-[26px]">
                Connect with certified specialists who understand your journey
                and provide personalized support.
              </p>
            </div>

            {/* Filter Section */}
            <div className="mb-8 sm:mb-10 md:mb-12 xl:mb-[40px] 2xl:mb-[45px]">
              <CounsellingFilter
                onSelectSpecialisation={handleSpecialisationId}
                onSelectDate={handleDate}
              />
            </div>

            {/* Doctor Profiles Grid */}
            <div className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-[36px] xl:grid-cols-2 xl:gap-[30px] 2xl:gap-[45px]">
              {isLoading &&
                Array.from({ length: 2 }).map((_, index) => (
                  <CompleteDoctorProfileSkeleton key={index} />
                ))}
              {filteredDoctors?.professionalUsers.map((item, index) => {
                const updatedItem = {
                  ...item,
                  avgRating: item.avgRating?.toString(),
                };
                return (
                  <CompleteDoctorProfile
                    isCouple={false}
                    key={index}
                    doctorProfile={updatedItem}
                    specialization={item.ProfessionalSpecializations}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Counselling;
