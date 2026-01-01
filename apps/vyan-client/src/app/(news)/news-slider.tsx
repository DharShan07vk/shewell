"use client";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface InewsImages {
  newsImages: {
    img: string;
  }[];
}
const NewSlider = ({ newsImages }: InewsImages) => {
  return (
    <>
      <Swiper
        breakpoints={{
          425: {
            spaceBetween: 40,
            slidesPerView: 1,
          },
          768: {
            spaceBetween: 15,
            slidesPerView: 1.5,
          },
          1024: {
            spaceBetween: 25,
            slidesPerView: 2.1,
          },
          1440: {
            spaceBetween: 25,
            slidesPerView: 3,
          },
          1920: {
            spaceBetween: 25,
            slidesPerView: 4,
          },
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        slidesPerView={4}
        className="mySwiper "
      >
        {newsImages.map((item, index) => {
          return (
            <SwiperSlide className="pb-10 md:pb-16">
              <div className="w-[392px]  " key={index}>
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={item.img}
                    alt="news-images"
                    fill={true}
                    className="object-cover"
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
export default NewSlider;
