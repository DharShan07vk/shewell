import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InteractiveButton } from "./ui/interactive-button";

export default function Hero(): JSX.Element {
  return (
    <section className="relative  h-[500px] w-full overflow-hidden bg-white sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[880px]">
      {/* Background Circle - Always 40vw responsive */}
      <div
        className="absolute right-[-35vw] top-[50%] z-20 hidden translate-y-[-50%] rounded-full bg-[#9D9D8D] md:block"
        style={{ width: "80vw", height: "80vw" }}
      />

      <div
        className="absolute left-0 top-[25%] z-30
        flex w-full -translate-y-1/2 flex-col
        gap-4 sm:left-0 sm:w-full
        md:left-0 md:max-w-[55%] lg:left-0 lg:max-w-[50%] xl:left-0 xl:max-w-[55%] 2xl:max-w-[1000px]"
      >
        <h1
          className="font-poppins text-[32px] font-bold
          leading-tight text-[#114668] sm:text-[44px] md:text-[48px]
          lg:text-[56px] xl:text-[72px] 2xl:text-[88px]"
        >
          Empowering <span className="text-[#51AF5A] font-epicgant">Women</span>, <br />
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

      {/* Hero Image - Always 40% of screen width */}
      <div
        className="absolute right-0 top-0 z-30 hidden h-full md:block"
        style={{ width: "40%" }}
      >
        <img
          src="/home/hero.png"
          alt="SheFit Hero"
          className="h-full w-full object-contain object-right-top transition-transform duration-500 hover:scale-[1.02]"
        />
      </div>

      <div
        className="pointer-events-none absolute bottom-[18%] left-0 select-none
        bg-[linear-gradient(180deg,#114668_1%,#FFFFFF_85%)] bg-clip-text
        font-poppins text-[80px]
        font-semibold text-transparent
        opacity-20 sm:left-0 sm:text-[100px] sm:bottom-[18%] md:text-[120px] md:bottom-[20%]
        lg:left-0 lg:text-[180px] lg:bottom-[22%] xl:left-0 xl:text-[210px] xl:bottom-[24%] 2xl:text-[240px]"
      >
        #shewell
      </div>

      {/* CTA Buttons - Responsive positioning */}
      <div className="absolute bottom-12 left-0 z-40 flex flex-wrap items-center gap-4 sm:bottom-14 sm:left-0 md:bottom-16 md:left-0 lg:bottom-20 xl:bottom-24 xl:left-0">
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
