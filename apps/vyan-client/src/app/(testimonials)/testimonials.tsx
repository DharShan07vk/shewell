import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialCard from "~/components/testimonial-card";
import { Pagination } from "swiper/modules";
import TestimonialSlider from "./testimonial-slider";
import { db } from "~/server/db";

const Testimonials = async () => {
  const testimonials = await db.testimonials.findMany({
    select: {
      name: true,
      avgRating: true,
      title : true,
      
    },
    where: {
      active: true,
    },
  });

  const updateTestimonials = testimonials.map((item,index) => ({
    ...item,
    avgRating : item.avgRating?.toString()
  }))
  return (
    <>
      <div className="w-full bg-testimonial bg-cover py-8 md:py-[55px] xl:py-[65px] 2xl:py-[70px]  ">
        <div className="container mx-auto ">
          <h2 className="mb-8 text-center font-poppins text-4xl text-[22px]  font-bold leading-[32px] text-white md:mb-[30px] md:text-[30px] md:leading-[48px] lg:mb-[38px] xl:mb-[44px] xl:text-[36px] xl:leading-[45px] 2xl:mb-[48px] 2xl:text-[40px] 2xl:leading-[52px]">
            Happy Customers
          </h2>
          <div className=" pt-8 md:pt-[38px] xl:px-[135px] xl:pt-[52px] 2xl:px-[103px] 2xl:pt-[56px]">
            <TestimonialSlider testimonials={updateTestimonials} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Testimonials;
