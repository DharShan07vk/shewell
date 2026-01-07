import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Hero(): JSX.Element {
  return (
    <section className="relative h-[500px] w-full overflow-hidden bg-white sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[880px]">
      {/* Background Circle - Responsive scaling */}
      <div
        className="absolute right-[-25%] top-[50%] z-20 hidden h-[100px] w-[100px] translate-y-[-50%] rounded-full
         bg-[#9D9D8D]
          md:right-[-20%] md:h-[600px] md:w-[600px] md:block
          lg:right-[-20%] lg:h-[1000px] lg:w-[1000px] 
          xl:right-[-25%] xl:h-[1200px] xl:w-[1200px] 
          2xl:right-[-30%] 2xl:h-[1500px] 2xl:w-[1500px]"
      />

      <div
        className="absolute left-4 top-[25%] z-30
        flex w-[calc(100%-32px)] -translate-y-1/2 flex-col
        gap-4 sm:left-8 sm:w-[calc(100%-64px)]
        md:left-12 md:max-w-[55%] lg:left-[60px] lg:max-w-[50%] xl:left-[80px] xl:max-w-[55%] 2xl:max-w-[1000px]"
      >
        <h1
          className="font-poppins text-[32px] font-bold
          leading-tight text-[#114668] sm:text-[44px] md:text-[48px]
          lg:text-[56px] xl:text-[72px] 2xl:text-[88px]"
        >
          Empowering <span className="text-[#51AF5A]">Women</span>, <br />
          Nurturing Families
        </h1>

        <p
          className="max-w-[600px] font-poppins font-medium leading-relaxed
          text-base text-[#7b7b7b] sm:text-lg md:text-xl
          lg:text-[22px] xl:text-[26px] 2xl:text-[28px] lg:leading-[1.4]"
        >
          A trusted digital companion for women's health, motherhood, mental wellbeing, and mindful living—curated by experts and designed for every stage of womanhood.
        </p>
      </div>

      <div className="absolute right-0 top-0 z-30 hidden h-full w-[50%] md:block md:w-[30%] lg:w-[45%] xl:w-[48%] 2xl:w-[50%]">
        <img 
          src="/home/hero.png" 
          alt="SheFit Hero" 
          className="h-full w-full object-contain object-right-top transition-transform duration-500 hover:scale-[1.02]" 
        />
      </div>

      <div
        className="pointer-events-none absolute bottom-[10%] left-2 select-none
        bg-[linear-gradient(180deg,#114668_1%,#FFFFFF_85%)] bg-clip-text
        font-poppins text-[80px]
        font-semibold text-transparent
        opacity-20 sm:left-8 sm:text-[120px] md:text-[160px]
        lg:left-[50px] lg:text-[200px] xl:left-[60px] xl:text-[280px] 2xl:text-[320px]"
      >
        #sheWell
      </div>

      {/* CTA Buttons - Responsive positioning */}
      <div className="absolute bottom-8 left-4 z-40 flex flex-wrap items-center gap-4 sm:bottom-10 sm:left-8 md:left-12 lg:bottom-16 xl:bottom-24 xl:left-[80px]">
        <Link href="/counselling">
          <button className="group flex h-12 items-center justify-between gap-3 rounded-full border border-gray-300 bg-white px-4 text-gray-600 shadow-md transition-all duration-300 ease-in-out hover:border-primary hover:bg-primary hover:text-white sm:h-14 sm:px-5">
            <span className="text-sm font-medium sm:text-base">
              Book Your Consultation
            </span>
            <span className="flex h-8 w-8 rotate-[-45deg] items-center justify-center rounded-full bg-primary text-white transition-all duration-300 group-hover:rotate-0 group-hover:bg-white group-hover:text-primary sm:h-9 sm:w-9">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </button>
        </Link>
        <Link href="/products">
          <button className="group flex h-12 items-center gap-3 rounded-full border border-gray-300 bg-white px-4 font-medium text-[#1B365D] shadow-md transition-all duration-300 hover:border-primary hover:bg-primary/5 sm:h-14 sm:px-5">
            <span className="text-sm sm:text-base">Shop Essentials for Mom & Baby</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary transition-transform group-hover:scale-110 sm:h-9 sm:w-9">
              <ArrowUpRight className="h-4 w-4 text-white" />
            </span>
          </button>
        </Link>
      </div>
    </section>
  );
}
