"use client";

import { useEffect, useState } from "react";
import BlogCard from "~/app/(blogs)/blog-card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@repo/ui/src/@/components/carousel";

interface BlogCredentialsProps {
  blogCredentials?: {
    media: {
      fileUrl: string | null;
    };
    createdAt: string;
    title: string;
    body: string;
    slug: string;
    shortDescription: string | null;
  }[];
}

const Slider = ({ blogCredentials }: BlogCredentialsProps) => {
  // 🔒 SAFETY GUARD (MOST IMPORTANT)
  if (!blogCredentials || blogCredentials.length === 0) {
    return null;
  }

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(blogCredentials.length);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const goToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="max-w-full"
      >
        <CarouselContent>
          {blogCredentials.map((blog) => (
            <CarouselItem
              key={blog.slug}
              className="xs:basis-full sm:basis-[393px] md:basis-[392px]"
            >
              <BlogCard
                fileUrl={
                  blog.media?.fileUrl || "/images/blog-fallback-image.jpeg"
                }
                createdAt={blog.createdAt}
                title={blog.title}
                body={blog.body}
                slug={blog.slug}
                des={blog.shortDescription}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Pagination dots */}
      <div className="mt-4 flex min-h-2.5 items-center justify-center gap-2 md:min-h-4 md:gap-[15px]">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            onClick={() => goToSlide(i)}
            className={`cursor-pointer rounded-full transition-all duration-300
              ${
                current === i + 1
                  ? "size-2.5 bg-primary md:size-3"
                  : "size-1 bg-black md:size-2"
              }`}
          />
        ))}
      </div>
    </>
  );
};

export default Slider;
