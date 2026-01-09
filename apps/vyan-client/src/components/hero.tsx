import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InteractiveButton } from "./ui/interactive-button";

export default function Hero(): JSX.Element {
  return (
    <section className="relative h-[500px] w-full overflow-hidden bg-white sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[880px]">
      {/* Background Circle - Responsive scaling */}
      <div
        className="absolute right-[-25%] top-[50%] z-20 hidden h-[100px] w-[100px] translate-y-[-50%] rounded-full
         bg-[#9D9D8D]
          md:right-[-20%] md:block md:h-[600px] md:w-[600px]
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
          className="max-w-[600px] font-poppins text-base font-medium
          leading-relaxed text-[#7b7b7b] sm:text-lg md:text-xl
          lg:text-[22px] lg:leading-[1.4] xl:text-[26px] 2xl:text-[28px]"
        >
          A trusted digital companion for women's health, motherhood, mental
          wellbeing, and mindful living—curated by experts and designed for
          every stage of womanhood.
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
          <button className="order-0 group flex h-[80px] w-auto flex-none flex-grow flex-row items-center justify-between gap-2.5 rounded-2xl bg-[#F2F2F2] px-6 py-4 transition-all duration-300 ease-in-out hover:bg-[#e5e5e5]">
            <span className="text-lg font-medium text-[#00000066] sm:text-xl">
              Book Your Consultation
            </span>
            <InteractiveButton />
          </button>
        </Link>
        <Link href="/products">
          <button className="order-0 group flex h-[80px] w-auto flex-none flex-grow flex-row items-center justify-between gap-2.5 rounded-2xl bg-[#F2F2F2] px-6 py-4 transition-all duration-300 ease-in-out hover:bg-[#e5e5e5]">
            <span className="text-lg font-medium text-[#00000066] sm:text-xl">
              Shop Essentials for Mom & Baby
            </span>
            <InteractiveButton />
          </button>
        </Link>
      </div>
    </section>
  );
}
