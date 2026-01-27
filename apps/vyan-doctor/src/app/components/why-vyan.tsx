"use client";
import WhyVyanCard from "./why-vyan-card";

const WhyVyan = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-0 my-12 sm:my-16 md:my-20 lg:my-24">
      <div className="flex flex-col items-center justify-center">
        <h2 className="font-poppins text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-gray-900">
          Why VYAN
        </h2>
        <p className="mb-6 sm:mb-8 md:mb-10 mt-3 sm:mt-4 text-center font-inter text-sm sm:text-base leading-relaxed text-gray-600 max-w-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex flex-col flex-wrap items-center justify-center gap-4 md:flex-row">
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
