"use client";
import { ShewellButton } from "~/components/ui";

const PremiumMembership = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-0">
      <div className="my-8 sm:my-12 md:my-16 lg:my-20 flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900 to-black px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-8 sm:py-10 md:py-12 lg:py-14">
        <h2 className="font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white text-center">
          PREMIUM MEMBERSHIP
        </h2>
        <p className="text-center font-inter text-sm sm:text-base md:text-lg container mx-auto max-w-3xl leading-relaxed text-white/90">
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
