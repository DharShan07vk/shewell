"use client";
import { Button } from "@repo/ui/src/@/components/button";

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Link from "next/link";
import Image from "next/image";
interface IDoctorProfileProps {
  doctorProfile: {
    firstName?: string | null;
    // qualifications?: {
    //   displayedQualification: string;
    // }[];
    displayQualification: {
      id: string;
      specialization: string;
    } | null;
    avgRating?: string | null;
    totalConsultations?: number | null;
    languages: {
      language?: string;
    }[];
    professionalUserAppointmentPrices:
      | {
          priceInCentsForSingle?: number | null;
          priceInCentsForCouple?: number | null;
        }[]
      | null;

    userName: string | null;
    media: {
      fileUrl?: string | null;
    } | null;
  };
  // cardImage: React.ReactNode;
  specialization: {
    specialization?: string;
  }[];
}

const SimilarDoctorProfileCard = ({
  doctorProfile,
  // cardImage,
  specialization,
}: IDoctorProfileProps) => {
  const StarDrawing = (
    <path d="M15.1533 1.24496C14.6395 0.359428 13.3607 0.359425 12.8468 1.24496L9.2281 7.48137C8.97427 7.91882 8.53553 8.21734 8.03545 8.29287L1.2537 9.31717C0.114654 9.48921 -0.284892 10.9274 0.602182 11.6623L5.6543 15.8479C6.12196 16.2354 6.34185 16.8465 6.22825 17.4431L4.90669 24.3833C4.69778 25.4804 5.8495 26.3328 6.8377 25.8125L13.2236 22.4501C13.7096 22.1941 14.2905 22.1941 14.7766 22.4501L21.1625 25.8125C22.1507 26.3328 23.3024 25.4804 23.0935 24.3833L21.7719 17.4431C21.6583 16.8465 21.8782 16.2354 22.3459 15.8479L27.398 11.6623C28.285 10.9274 27.8855 9.48921 26.7465 9.31717L19.9647 8.29287C19.4646 8.21734 19.0259 7.91882 18.7721 7.48137L15.1533 1.24496Z" />
  );
  const customStyles = {
    itemShapes: StarDrawing,
    activeFillColor: "#00898F",
    inactiveFillColor: "#B5B5B5",
  };
  return (
    <>
      <div className="flex gap-4 rounded-md border border-border-300  p-3 md:p-4 lg:gap-6 lg:p-6">
        {/* image  */}
        <div className="flex flex-col items-center justify-center gap-3 self-center  ">
          {/* <div className="">{cardImage}</div> */}
          <div className="flex aspect-square w-[135px] items-center justify-center self-center bg-[url('/images/doctor-bg.png')] bg-center bg-no-repeat">
            <div className="relative aspect-square w-[116px]">
              <Image
                src={
                  doctorProfile.media?.fileUrl ||
                  "/images/fallback-user-profile.png"
                }
                alt="feature-card"
                className="rounded-full object-cover"
                fill={true}
              />
            </div>
          </div>
          {doctorProfile.professionalUserAppointmentPrices?.length! > 0 ? (
            <div className="font-inter text-[16px] font-semibold text-secondary sm:text-lg">
              {doctorProfile.professionalUserAppointmentPrices![0]
                ?.priceInCentsForSingle ? (
                <div>
                  {" "}
                  INR{" "}
                  {doctorProfile.professionalUserAppointmentPrices![0]
                    ?.priceInCentsForSingle / 100}
                </div>
              ) : (
                <div>
                  INR
                  {doctorProfile.professionalUserAppointmentPrices![0]
                    ?.priceInCentsForCouple! / 100}
                </div>
              )}
            </div>
          ) : (
            <div className="font-inter text-[16px] font-semibold text-secondary sm:text-lg">
              {" "}
              INR --
            </div>
          )}
          <Link href={`/doctor-profile/${doctorProfile.userName}`}>
            <Button className=" px-1 py-1 text-xs sm:px-2 sm:py-2 sm:text-base">
              <svg
                className="mr-1"
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.7583 16.3996H14.0383V13.1596C14.0383 12.6823 13.8486 12.2244 13.5111 11.8869C13.1735 11.5493 12.7157 11.3596 12.2383 11.3596H5.75828C5.28089 11.3596 4.82305 11.5493 4.48549 11.8869C4.14792 12.2244 3.95828 12.6823 3.95828 13.1596V16.3996H3.23828V13.1596C3.23828 12.4913 3.50378 11.8503 3.97637 11.3777C4.44896 10.9051 5.08994 10.6396 5.75828 10.6396H12.2383C12.9066 10.6396 13.5476 10.9051 14.0202 11.3777C14.4928 11.8503 14.7583 12.4913 14.7583 13.1596V16.3996Z"
                  fill="white"
                />
                <path
                  d="M9.03906 10C8.24794 10 7.47458 9.76541 6.81678 9.32588C6.15899 8.88635 5.6463 8.26164 5.34355 7.53073C5.0408 6.79983 4.96158 5.99556 5.11592 5.21964C5.27026 4.44372 5.65123 3.73098 6.21064 3.17157C6.77005 2.61216 7.48278 2.2312 8.2587 2.07686C9.03463 1.92252 9.83889 2.00173 10.5698 2.30448C11.3007 2.60723 11.9254 3.11992 12.3649 3.77772C12.8045 4.43552 13.0391 5.20888 13.0391 6C13.0391 7.06087 12.6176 8.07828 11.8675 8.82843C11.1173 9.57857 10.0999 10 9.03906 10ZM9.03906 2.72727C8.39178 2.72727 7.75903 2.91922 7.22083 3.27883C6.68264 3.63844 6.26316 4.14957 6.01546 4.74758C5.76775 5.3456 5.70294 6.00363 5.82922 6.63848C5.9555 7.27332 6.2672 7.85647 6.7249 8.31417C7.1826 8.77187 7.76574 9.08357 8.40059 9.20984C9.03543 9.33612 9.69347 9.27131 10.2915 9.02361C10.8895 8.7759 11.4006 8.35643 11.7602 7.81823C12.1198 7.28003 12.3118 6.64728 12.3118 6C12.3118 5.13202 11.967 4.29959 11.3532 3.68583C10.7395 3.07208 9.90704 2.72727 9.03906 2.72727Z"
                  fill="white"
                />
              </svg>
              View Profile
            </Button>
          </Link>
        </div>

        {/* text and Specialization */}
        <div className="flex flex-col gap-1 self-center  ">
          <h3 className="font-inter text-base font-semibold md:text-[30px] md:leading-[30px] xl:text-2xl 2xl:text-[28px] 2xl:leading-[38px]">
            {doctorProfile.firstName}
          </h3>
          <div className="font-inter text-sm font-medium md:text-lg 2xl:text-[20px] 2xl:leading-[30px]">
            {/* {doctorProfile.qualifications &&
                doctorProfile.qualifications[0]?.displayedQualification} */}
            {doctorProfile.displayQualification?.specialization}
          </div>
          <div className="flex  flex-wrap items-center gap-1 ">
            <div className="flex">
              <Rating
                className="inline"
                readOnly={true}
                style={{ maxWidth: 95 }}
                value={parseFloat(doctorProfile.avgRating || "0")}
                itemStyles={customStyles}
              />

              <div className="border-r border-primary pr-2 font-inter text-sm font-medium text-active 2xl:text-base">
                {parseFloat(doctorProfile.avgRating || "0").toFixed(1)}
              </div>
            </div>

            <div className="font-inter text-sm font-normal 2xl:text-base">
              {doctorProfile?.totalConsultations
                ? doctorProfile?.totalConsultations
                : 0}{" "}
              Consultation
            </div>
          </div>

          {/* specialized-in */}
          <div className="flex flex-wrap items-center gap-1 font-inter text-xs font-normal text-inactive md:text-sm">
            <span className="font-medium text-active ">Specialized In: </span>

            {specialization.map((item, index) => {
              return (
                <>
                  <div
                    className="rounded-[6px] bg-[#F6F6F6] px-[6px] py-1 text-xs text-inactive"
                    key={index}
                  >
                    {item.specialization}
                    {index < specialization.length - 1 ? "/" : ""}
                  </div>
                </>
              );
            })}
          </div>

          {/* languages */}
          <div className="flex flex-wrap items-center gap-1 font-inter text-xs font-normal text-inactive md:text-sm">
            <span className="font-medium text-active ">Languages: </span>

            {doctorProfile.languages.map((item, index) => {
              return (
                <>
                  <div
                    className="rounded-[6px] bg-[#F6F6F6] px-[6px] py-1 text-xs text-inactive"
                    key={index}
                  >
                    {item.language}
                    {index < doctorProfile.languages.length - 1 ? "/" : ""}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default SimilarDoctorProfileCard;
