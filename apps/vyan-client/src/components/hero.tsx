"use client";
import React from "react";
import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { hover } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-76px)] overflow-hidden flex flex-col">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row w-full flex-grow h-full">
        {/* Left Content Section */}
        <div className="w-full lg:w-[55%] bg-white px-6 md:px-12 lg:px-16 xl:px-24 py-12 lg:py-0 flex flex-col justify-center relative z-10">
          {/* Heading */}
          <h1 className="text-4xl md:text-[56px] lg:text-[60px] font-bold leading-tight text-[#1B365D] mb-6">
            Empowering{" "}
            <span className="text-secondary">Women</span>,
            <br />
            Nurturing Families
          </h1>

          {/* Description */}
          <p className="text-[#4D4D4D] text-base md:text-xl lg:text-2xl max-w-[500px] mb-0 leading-relaxed">
            A trusted digital companion for women's health, motherhood, mental
            wellbeing, and mindful living—curated by experts and designed for
            every stage of womanhood.
          </p>

          {/* Watermark Text */}
          <div className="pointer-events-none select-none mb-8">
            <span className="text-[120px] md:text-[160px] lg:text-[180px] font-bold bg-gradient-to-b from-[#114668] to-white bg-clip-text text-transparent opacity-30 leading-none tracking-tight">
              #shewell
            </span>
          </div>

          {/* CTA Buttons - Now below the watermark */}
          <div className="flex flex-wrap gap-4 relative z-20">
            <Link href="/counselling">
              <button
                className="
        group flex items-center justify-between
        w-[290px] px-4 py-2 rounded-full
        bg-white border border-gray-400 text-gray-500
        transition-all duration-300 ease-in-out
        hover:bg-primary hover:text-white
      "
              >
                <span className="text-lg font-medium">
                  Book Your Consultation
                </span>

                <span
                  className="
          ml-4 flex items-center justify-center
          w-10 h-10 rounded-full
          bg-teal-600 text-white
          transition-all duration-300 rotate-[-45deg] group-hover:rotate-[135deg]
          group-hover:bg-white group-hover:text-teal-600
        "
                >
                  ➜
                </span>
              </button>
            </Link>
            <Link href="/products">
              <button className="flex items-center gap-3 px-6 py-3 bg-white border-2 border-[#E9E9E9] rounded-full text-[#1B365D] font-medium hover:border-primary hover:bg-primary/5 transition-all duration-300 group">
                Shop Essentials for Mom &amp; Baby
                <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </span>
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image Section with Curved Edge */}
        <div className="w-full lg:w-[45%] bg-[#9BA88D] relative min-h-[400px] lg:min-h-auto flex-grow">
          {/* Curved overlay from left side */}
          <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-48 z-10">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              <path
                d="M100,0 C20,0 0,100 0,100 L0,0 Z"
                fill="white"
              />
            </svg>
          </div>

          {/* Hero Image */}
          <img
            src="/images/hero-pregnant-woman.png"
            alt="Pregnant woman holding her belly"
            className="w-full h-full object-cover object-center"
          />

          {/* Shopping Bag Icon */}
          <Link href="/cart">
            <button className="absolute bottom-6 right-6 w-12 h-12 bg-[#1B365D] rounded-full flex items-center justify-center shadow-lg hover:bg-[#2a4a7a] transition-colors duration-300 z-20">
              <ShoppingBag className="w-5 h-5 text-white" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
