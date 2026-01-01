"use client";
import WhyVyanCard from "./why-vyan-card";

const WhyVyan = () => {
  return (
    <>
      <div className="container mx-auto mb-[65px]">
        <div className="flex flex-col items-center justify-center">
          <div className="font-poppins text-[22px] font-bold leading-[32px] md:text-[30px] md:leading-[48px]">
            Why VYAN
          </div>
          <div className="mb-[24px] mt-3 text-center font-inter text-sm font-normal leading-[20px] text-inactive md:mb-[30px] md:mt-[16px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div className="flex flex-col flex-wrap items-center  justify-center gap-4 md:flex-row ">
            <WhyVyanCard />
            <WhyVyanCard />
            <WhyVyanCard />
            <WhyVyanCard />
            <WhyVyanCard />
          </div>
        </div>
      </div>
    </>
  );
};
export default WhyVyan;
