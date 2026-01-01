"use client";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SimilarDoctorProfileCard from "./similar-doctor-profile-card";
import { api } from "~/trpc/react";
import React from "react";
import SimilarDoctorCardSkeleton from "../counselling/[username]/similar-doctor-profile-card-skeleton";

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
      languages: {
        language: string;
      }[];
    };
    cardImage: React.ReactNode;
    specialization: {
      specialization: string;
    }[];
  }[];
}
const SimilarDoctorProfileSlider = ({
  displayQualificationId,
  similarDoctorProfileId,
}: {
  displayQualificationId: string;
  similarDoctorProfileId: string;
}) => {
  const { data, isLoading } =
    api.similarDoctorProfile.similarDoctorProfile.useQuery({
      displayQualificationId: displayQualificationId,
      similarDoctorProfileId: similarDoctorProfileId,
    });
 

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
          return (
            <div className="border-red flex w-full flex-row border">
              <SwiperSlide className="pb-10" key={index}>
                <SimilarDoctorProfileCard
                  // doctorProfile={item}
                  doctorProfile={{
                    ...item,
                    avgRating: convertedAvgRating,
                  }}
                  // cardImage={item.cardImage}
                  specialization={item.ProfessionalSpecializations}
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
