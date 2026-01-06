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
    des:string | null
  }[];
}
const Slider = ({ blogCredentials }: blogCredentialsProps) => {
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
  return (
    <>
      <Carousel setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
         className="max-w-full"
        >
        <CarouselContent className="w-full">
        {blogCredentials.map((blog, index) => {
          return (
            <div className="w-full">
              <CarouselItem className="pb-10" key={index}>
                <BlogCard
                  fileUrl={blog.media.fileUrl || "/images/blog-fallback-image.jpeg"}
                  createdAt={blog.createdAt}
                  title={blog.title}
                  body={blog.body}
                  slug={blog.slug}
                  des={blog.des}
                />
              </CarouselItem>
            </div>
          );
        })}
          
        </CarouselContent>
       
      </Carousel>
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
