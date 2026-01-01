"use client";
import React from "react";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface IsignUpImages {
  signUpImages: {
    img: string;
  }[];
}

const SignUpSlider = ({ signUpImages }: IsignUpImages) => {
  return (
    <Swiper
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      slidesPerView={2}
      className="mySwiper"
    >
      {signUpImages.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-[182px]">
            <Image
              src={item.img}
              alt="image"
              width={120}
              height={120}
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default SignUpSlider;
