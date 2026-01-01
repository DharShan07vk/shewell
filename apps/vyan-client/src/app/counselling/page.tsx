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

const Counselling = (
) => {
  function toUTCDate(date: Date) {
    return new Date(
      Date.UTC(date?.getFullYear(), date?.getMonth(), date?.getDate()),
    );
  }
  
  const searchParams = useSearchParams();

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
      <div className="w-full">
        <div className="container mx-auto max-w-full">
          <div className="py-[55px] xl:py-[60px] 2xl:py-[65px] ">
           
            <div className="mb-6 xl:mb-[40px] 2xl:mb-[45px]">
              <CounsellingFilter
                onSelectSpecialisation={handleSpecialisationId}
                onSelectDate={handleDate}
              />
            </div>
            {/* DIV-card */}

          
            <div className="grid gap-[36px] xl:grid-cols-2 xl:gap-[30px] 2xl:gap-[45px]">
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
                  <>
                    <CompleteDoctorProfile
                      isCouple={false}
                      key={index}
                      doctorProfile={updatedItem}
                     
                      specialization={item.ProfessionalSpecializations}
                    />
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Counselling;
