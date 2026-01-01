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
interface blogCredentialsProps {
  blogCredentials: {
    media: {
      fileUrl: string | null;
    };
    createdAt: Date;
    title: string;
    body: string;
    slug: string;
    shortDescription:string | null;
  }[];
}
const Slider = ({ blogCredentials }: blogCredentialsProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(3);
  // console.log(testimonials);
  // console.log("courseModules", course);
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
        <CarouselContent className="">
          {blogCredentials.map((blog, index) => {
            return (
              <CarouselItem
                className="xs:basis-full  sm:basis-[393px] md:basis-[392px]   "
                key={index}
              >
                <BlogCard
                  fileUrl={
                    blog.media.fileUrl || "/images/blog-fallback-image.jpeg"
                  }
                  createdAt={blog.createdAt}
                  title={blog.title}
                  body={blog.body}
                  slug={blog.slug}
                  des={blog.shortDescription}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      <div className="flex min-h-2.5 items-center justify-center gap-2 md:min-h-4 md:gap-[15px] mt-4">
        {Array.from({ length: blogCredentials.length }).map((_, i) => {
          return (
            <div
              onClick={() => goToSlide(i)}
              key={i}
              className={`flex rounded-full transition-all duration-300 hover:cursor-pointer ${current === i + 1 ? "size-2.5 bg-primary md:size-3" : "size-1 bg-[#000000] md:size-2"}`}
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
export default Slider;
