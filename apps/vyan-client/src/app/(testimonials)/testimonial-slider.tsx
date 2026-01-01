"use client";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import BlogCard from "~/app/(blogs)/blog-card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/src/@/components/carousel";
import { useEffect, useState } from "react";
import TestimonialCarousel from "../auth/client-logo-carousel";
import TestimonialCard from "~/components/testimonial-card";
interface ITestimonials {
  testimonials: {
    name: string;
    title: string;
    avgRating: string | null | undefined;
  }[];
}
const TestimonialSlider = ({ testimonials }: ITestimonials) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(3);
  
  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  const goToSlide = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };
  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="max-w-full "
      >
        <CarouselContent className=" ">
          {testimonials.map((item, index) => {
            return (
              <CarouselItem
                className="xs:basis-full  sm:basis-[393px] md:basis-[392px]   "
                key={index}
              >
                <TestimonialCard props={item} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      <div className="mt-4 flex min-h-2.5 items-center justify-center gap-2 md:min-h-4 md:gap-[15px]">
        {Array.from({ length: testimonials.length }).map((_, i) => {
          return (
            <div
              onClick={() => goToSlide(i)}
              key={i}
              className={`flex rounded-full transition-all duration-300 hover:cursor-pointer ${current === i + 1 ? "size-2.5 bg-primary md:size-3" : "size-1 bg-[#F3F4FF] md:size-2"}`}
            ></div>
          );
        })}
      </div>
      {/* <Swiper
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
        slidesPerView={1}
        className="mySwiper "
      >
        {blogCredentials.map((blog, index) => {
          return (
            <div className="border-red flex w-full flex-row border">
              <SwiperSlide className="pb-10" key={index}>
                <BlogCard
                  fileUrl={blog.media.fileUrl!}
                  createdAt={blog.createdAt}
                  title={blog.title}
                  body={blog.body}
                  slug={blog.slug}
                />
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper> */}
    </>
  );
};

export default TestimonialSlider;
