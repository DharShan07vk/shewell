"use client";
import { ShewellButton } from "~/components/ui";

const PremiumMembership = () => {
  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-0">
      <div className="my-6 sm:my-8 md:my-12 lg:my-16 xl:my-20 flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-900 to-black px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14">
        <h2 className="font-poppins text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-white text-center">
          PREMIUM MEMBERSHIP
        </h2>
        <p className="text-center font-inter text-xs sm:text-sm md:text-base lg:text-lg container mx-auto max-w-3xl leading-relaxed text-white/90">
          Don't miss out - join our premium community of counselors dedicated to
          making a difference. Upgrade now and let your expertise shine on Vyan
        </p>
        <ShewellButton 
          variant="medium" 
          className="mt-2"
        >
          Go Premium
        </ShewellButton>
      </div>
    </div>
  );
};
export default PremiumMembership;
