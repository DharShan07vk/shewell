import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Hero(): JSX.Element {
  return (
    <section className="relative h-[400px] w-full overflow-hidden bg-white sm:h-[650px] md:h-[750px] lg:h-[880px]">
      <div
        className="absolute right-[-34%] top-[50%] z-20 hidden h-[1398px] w-[1398px] translate-y-[-50%] rounded-[50%]
         bg-[#9D9D8D] lg:block"
      />

      <div
        className="absolute left-4 top-[30%]
        flex w-[calc(100%-32px)] -translate-y-1/2 flex-col
        gap-4 sm:left-8 sm:w-[calc(100%-64px)]
        md:left-12 md:gap-6 lg:left-[80px] lg:w-[1100px]"
      >
        <h1
          className="font-poppins text-[30px] font-bold
          leading-tight text-[#114668] sm:text-[44px] md:text-[50px]
          lg:text-[72px]"
        >
          Empowering <span className="text-[#51AF5A]">Women</span>, <br />
           Nurturing Families
        </h1>

        <p
          className="max-w-[700px] font-poppins font-medium leading-relaxed
          text-base text-[#7b7b7b] sm:text-xl md:text-2xl
          lg:text-[28px] lg:leading-[1.4]"
        >
          A trusted digital companion for women's health, motherhood, mental wellbeing, and mindful living—curated by experts and designed for every stage of womanhood.
        </p>
      </div>

      <div className="absolute right-[-50px] top-0 z-30 hidden h-auto w-[700px] overflow-hidden lg:block">
        <img src="/home/hero.png" alt="SheFit Hero" className="object-cover" />
      </div>

      <div
        className="pointer-events-none absolute bottom-[60px] left-2 select-none
        bg-[linear-gradient(180deg,#114668_1%,#FFFFFF_85%)] bg-clip-text
        font-poppins text-[90px]
        font-semibold text-transparent
        opacity-20 sm:left-8 sm:text-[140px] md:text-[200px]
        lg:left-[60px] lg:text-[300px]"
      >
        #sheWell
      </div>

      {/* CTA Buttons - Bottom positioned */}
      <div className="absolute bottom-10 left-4 z-30 flex flex-wrap items-center gap-4 sm:bottom-6 sm:left-8 md:left-12 lg:bottom-24 lg:left-[80px]">
        <Link href="/counselling">
          <button className="group flex h-12 sm:h-14 items-center justify-between gap-3 rounded-full border border-gray-300 bg-white px-4 sm:px-5 text-gray-600 shadow-md transition-all duration-300 ease-in-out hover:border-primary hover:bg-primary hover:text-white">
            <span className="text-sm sm:text-base font-medium">
              Book Your Consultation
            </span>
            <span className="flex h-8 w-8 sm:h-9 sm:w-9 rotate-[-45deg] items-center justify-center rounded-full bg-primary text-white transition-all duration-300 group-hover:rotate-0 group-hover:bg-white group-hover:text-primary">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </button>
        </Link>
        <Link href="/products">
          <button className="group flex h-12 sm:h-14 items-center gap-3 rounded-full border border-gray-300 bg-white px-4 sm:px-5 font-medium text-[#1B365D] shadow-md transition-all duration-300 hover:border-primary hover:bg-primary/5">
            <span className="text-sm sm:text-base">Shop Essentials for Mom & Baby</span>
            <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-primary transition-transform group-hover:scale-110">
              <ArrowUpRight className="h-4 w-4 text-white" />
            </span>
          </button>
        </Link>
      </div>
    </section>
  );
}
