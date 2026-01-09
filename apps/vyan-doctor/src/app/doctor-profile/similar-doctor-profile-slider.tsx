"use client";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SimilarDoctorProfileCard from "./similar-doctor-profile-card";
import { api } from "~/trpc/react";
import SimilarDoctorCardSkeleton from "./similar-doctor-card-skeleton";
import React from "react";

interface IDoctorProfileProps {
  doctor: {
    doctorProfile: {
      firstName: string;
      // qualifications: {
      //   displayedQualification: string;
      // }[];
      displayQualification: string;
      avgRating: string;
      totalConsultations: number;
      userName: string;
      professionalUserAppointmentPrices:{
        
      }
    };
    cardImage: React.ReactNode;
    specialization: {
      specialization: string;
    }[];
  }[];
}
const SimilarDoctorProfileSlider = ({
  displayQualificationId,
  similarDoctorProfileId 
}: {
  displayQualificationId: string;
  similarDoctorProfileId : string
}) => {
  const { data, isLoading } = api.similarDoctorProfile.similarDoctorProfile.useQuery({
    displayQualificationId: displayQualificationId,
    similarDoctorProfileId : similarDoctorProfileId
  });
  console.log(data);
 

  return (
    <>
      <Swiper
        breakpoints={{
          425: {
            spaceBetween: 40,
            slidesPerView: 1,
          },
          768: {
            spaceBetween: 20,
            slidesPerView: 1.7,
          },
          1024: {
            spaceBetween: 25,
            slidesPerView: 1.7,
          },
          1440: {
            spaceBetween: 25,
            slidesPerView: 2.2,
          },
          1920: {
            spaceBetween: 25,
            slidesPerView: 3,
          },
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        slidesPerView={1}
        className="mySwiper "
      >
      <div className="flex gap-2">
          {isLoading &&
            Array.from({ length: 2 }).map((_, index) => (
              <React.Fragment key={index}>
                <SimilarDoctorCardSkeleton />
              </React.Fragment>
            ))}
        </div>
        {data?.similarDoctorProfiles.map((item, index) => {
          const convertedAvgRating = item.avgRating?.toString();
          
          // Find a valid displayQualification from ProfessionalSpecializations
          const firstSpecialization = item.ProfessionalSpecializations?.find(
            (spec) => spec.id && spec.specialization
          );
          const displayQualification = firstSpecialization?.id && firstSpecialization?.specialization
            ? { id: firstSpecialization.id, specialization: firstSpecialization.specialization }
            : null;

          // Map specializations with required fields
          const specializations = (item.ProfessionalSpecializations ?? [])
            .filter((spec): spec is { specialization: string } & typeof spec => 
              typeof spec.specialization === 'string'
            )
            .map((spec) => ({ specialization: spec.specialization }));

          return (
            <div className="border-red flex w-full flex-row border" key={index}>
              <SwiperSlide className="pb-10">
                <SimilarDoctorProfileCard
                  doctorProfile={{
                    firstName: item.firstName,
                    displayQualification,
                    avgRating: convertedAvgRating,
                    totalConsultations: item.totalConsultations,
                    languages: item.languages ?? [],
                    professionalUserAppointmentPrices: item.professionalUserAppointmentPrices ?? null,
                    userName: item.userName,
                    media: item.media ?? null,
                  }}
                  specialization={specializations}
                />
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper>
    </>
  );
};
export default SimilarDoctorProfileSlider;
