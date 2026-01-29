"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import './styles.css';

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { useSession } from "next-auth/react";
import Link from "next/link";
interface IHeroMedia {
  id: string;
  media: {
    fileUrl: string | null;
  } | null;
  url: string | null;
}
export default function Hero({ heroMedias }: { heroMedias: IHeroMedia[] }) {
  const session = useSession();
  console.log("session", session);
  return (
    <div className="w-full px-3 sm:px-4 md:px-8 lg:px-12 xl:px-[100px]">
      <Swiper
        className="hm-hero rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden"
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
        }}
      >
        {heroMedias.map((item) => {
          return (
            <>
              <SwiperSlide key={item.id}>
                <Link href={`/${item.url}`}>
                  <video
                    width="100%"
                    height="240"
                    autoPlay
                    loop
                    muted
                    preload="none"
                  >
                    <source src={item.media?.fileUrl || ""} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Link>
                {/* <img src="images/hero.png" alt="" /> */}
              </SwiperSlide>
            </>
          );
        })}
        {/* <SwiperSlide>
          <Link href="/counselling">
            <video width="100%" height="240" autoPlay loop muted preload="none">
              <source src="/images/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/counselling">
            <img className="w-full" src="images/hero.png" alt="" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/counselling">
            
            <img className="w-full" src="images/hero.png" alt="" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/counselling">
            <video width="100%" height="240" autoPlay loop muted preload="none">
              <source src="/images/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
           
          </Link>
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
}
