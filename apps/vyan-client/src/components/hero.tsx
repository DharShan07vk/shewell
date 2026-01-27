import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InteractiveButton } from "./ui/interactive-button";

export default function Hero(): JSX.Element {
  return (
    <section className="relative h-[500px] w-full overflow-hidden bg-white px-4 pb-8 pt-8 sm:h-[600px] sm:px-6 sm:pt-10 md:h-[700px] md:px-12 md:pt-12 lg:h-[800px] lg:px-[100px] lg:pb-12 xl:h-[880px]">
      <div className="">
        <h1
          className="font-poppins text-[28px] font-bold
          leading-tight text-[#114668] sm:text-[36px] md:text-[48px]
          lg:text-[56px] xl:text-[72px] 2xl:text-[88px]"
        >
          Empowering{" "}
          <span className="font-epicgant font-medium text-[#51AF5A]">
            Women
          </span>
          , <br />
          Nurturing Families
        </h1>

        <p
          className="max-w-[600px] font-poppins text-sm font-medium
          leading-relaxed text-[#7b7b7b] sm:text-base md:text-lg lg:text-xl
          xl:text-[22px] xl:leading-[1.4] 2xl:text-[26px]"
        >
          A trusted digital companion for women's health, motherhood, mental
          wellbeing, and mindful living—curated by experts and designed for
          every stage of womanhood.
        </p>
      </div>

      {/* Right-side hero image */}
      <div className="pointer-events-none absolute right-0 top-0 z-30 hidden h-full w-[40%] md:block">
        <img
          src="/home/hero.webp"
          alt="Expecting mother"
          className="h-full w-full object-contain object-right-bottom"
          loading="eager"
        />
      </div>
      <div
        className="pointer-events-none bg-[linear-gradient(180deg,#114668_1%,#FFFFFF_85%)]
        bg-clip-text font-poppins
        text-[100px] font-semibold leading-none text-transparent
        opacity-20 sm:text-[140px]
        md:text-[180px] lg:text-[200px] xl:text-[250px] 2xl:text-[260px]"
      >
        #shewell
      </div>

      {/* CTA Buttons - Responsive positioning */}
      <div className="z-40 mt-6 flex flex-col flex-wrap items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4 md:mt-10">
        <Link href="/counselling" className="w-full sm:w-auto sm:flex-1">
          <div className="group flex h-[64px] w-full items-center justify-between gap-2.5 rounded-2xl bg-[#F2F2F2] px-4 py-4 transition-all duration-300 ease-in-out hover:bg-[#e5e5e5] sm:h-[72px] sm:px-5 md:h-[80px] md:px-6">
            <span className="text-base font-medium text-[#00000066] sm:text-lg md:text-xl">
              Book Your Consultation
            </span>
            <InteractiveButton />
          </div>
        </Link>
        <Link href="/products" className="w-full sm:w-auto sm:flex-1">
          <div className="group flex h-[64px] w-full items-center justify-between gap-2.5 rounded-2xl bg-[#F2F2F2] px-4 py-4 transition-all duration-300 ease-in-out hover:bg-[#e5e5e5] sm:h-[72px] sm:px-5 md:h-[80px] md:px-6">
            <span className="text-base font-medium text-[#00000066] sm:text-lg md:text-xl">
              Shop Essentials for Mom & Baby
            </span>
            <InteractiveButton />
          </div>
        </Link>
      </div>
      {/* Background Circle - Always 40vw responsive
      <div
        className="absolute right-[-35vw] top-[50%] z-20 hidden translate-y-[-50%] rounded-full bg-[#9D9D8D] md:block"
        style={{ width: "80vw", height: "80vw" }}
      />
      
      <div
        className="absolute right-0 top-0 z-30 hidden h-full md:block"
        style={{ width: "40%" }}
      >
        <img
          src="/home/hero.png"
          alt="SheFit Hero"
          className="h-full w-full object-contain object-right-top transition-transform duration-500 hover:scale-[1.02]"
        />
      </div> */}
    </section>
  );
}
