"use client";
import WhyVyanCard from "./why-vyan-card";

const WhyVyan = () => {
  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-0 my-8 sm:my-12 md:my-16 lg:my-20 xl:my-24">
      <div className="flex flex-col items-center justify-center">
        <h2 className="font-poppins text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-gray-900">
          Why VYAN
        </h2>
        <p className="mb-4 sm:mb-6 md:mb-8 lg:mb-10 mt-2 sm:mt-3 md:mt-4 text-center font-inter text-xs sm:text-sm md:text-base leading-relaxed text-gray-600 max-w-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex flex-col flex-wrap items-center justify-center gap-3 sm:gap-4 md:flex-row md:gap-4 lg:gap-5 xl:gap-6">
          <WhyVyanCard />
          <WhyVyanCard />
          <WhyVyanCard />
          <WhyVyanCard />
          <WhyVyanCard />
        </div>
      </div>
    </div>
  );
};
export default WhyVyan;
