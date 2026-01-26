"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { InteractiveButton } from "./ui/interactive-button";

const COURSES_DATA = [
  {
    id: 1,
    category: "Woman Wellbeing",
    mainImage: "/home/service-wellbeing.webp",
    services: [
      { label: "Lifestyle Issue", position: "top-[10%] left-[5%]" },
      { label: "Mental Wellbeing", position: "top-[10%] right-[5%]" },
      { label: "Overweight", position: "bottom-[20%] left-[5%]" },
      { label: "Physical Health", position: "bottom-[20%] right-[5%]" },
    ],
  },
  {
    id: 2,
    category: "Prenatal Care",
    mainImage: "/home/service-prenatal.webp",
    services: [
      { label: "Pregnancy Loss", position: "top-[10%] right-[5%]" },
      { label: "Prenatal Weight Issue", position: "bottom-[20%] right-[5%]" },
      { label: "Childbirth Education", position: "top-[10%] left-[5%]" },
      { label: "Gestational Diabetes", position: "bottom-[20%] left-[5%]" },
    ],
  },
  {
    id: 3,
    category: "Postnatal Care",
    mainImage: "/home/service-postnatal.webp",
    services: [
      { label: "Lactation Counselling", position: "top-[10%] left-[5%]" },
      { label: "Postpartum Mental Wellbeing", position: "top-[10%] right-[5%]" },
      { label: "Postnatal Weight Loss", position: "bottom-[20%] left-[5%]" },
      { label: "Postnatal Recovery", position: "bottom-[20%] right-[5%]" },
    ],
  },
  {
    id: 4,
    category: "PCOS",
    mainImage: "/home/service-pcos.webp",
    services: [
      { label: "Polycystic Ovary Syndrome", position: "top-[10%] left-[5%]" },
      { label: "Psychological Support", position: "top-[10%] right-[5%]" },
      { label: "Overweight Issue", position: "bottom-[20%] left-[5%]" },
    ],
  },
  {
    id: 5,
    category: "Child Healthcare",
    mainImage: "/home/service-child.webp",
    services: [
      { label: "Parenting Tips", position: "top-[10%] left-[5%]" },
      { label: "Development Challenges", position: "top-[10%] right-[5%]" },
      { label: "Nutritional Issue", position: "bottom-[20%] left-[5%]" },
      { label: "Behavioral Challenges", position: "bottom-[20%] right-[5%]" },
    ],
  },
];

const ServicesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = COURSES_DATA[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === COURSES_DATA.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? COURSES_DATA.length - 1 : prev - 1,
    );
  };

  return (
    <section className="px-[100px] py-6 relative w-full overflow-hidden bg-white">
      <div className="z-10 max-w-full px-0 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className=" mb-6 font-poppins text-xl font-medium leading-tight text-[#333333] md:text-2xl lg:text-[54px]"
        >
          India's Wellness Circle For Women Who Mother With Intention
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className=" text-[24px] text-[#33333399] md:text-[26px] lg:text-[28px] mb-24 px-4 md:px-6 lg:px-6"
        >
          Tap into curated care programs and ancient wisdom to raise happy moms
          and healthy babies with expert-led sessions and wellness products.
          Shewell isn’t just for India. It’s for every woman, everywhere
        </motion.p>
      </div>
      <div className=" w-full px-0">
        {/* Carousel Container */}
        <div className="relative flex flex-col items-center">
          {/* Main Image Area with Title Integrated */}
          <div className="relative mb-12 flex w-full items-center justify-center md:mb-16">
            {/* Main Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current?.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="relative h-[400px] w-full max-w-4xl md:h-[500px] lg:h-[600px]"
              >
                <Image
                  src={current?.mainImage + ""}
                  alt={current?.category + ""}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                />
              </motion.div>
            </AnimatePresence>

            {/* Service Labels (Bubbles) */}
            <AnimatePresence>
              {current?.services?.map((service, idx) => (
                <motion.div
                  key={`${current?.id}-${idx}`}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className={`absolute z-20 flex h-[60px] w-[200px] cursor-pointer
                                    flex-row items-center justify-between
                                    gap-2 rounded-[18px] border
                                    border-white/30 bg-white/20 px-4 py-3
                                    shadow-lg backdrop-blur-[7px]
                                    transition-all duration-300 hover:scale-105
                                    hover:bg-white/30 md:h-[80px] md:w-[300px]
                                    md:px-5 lg:h-[100px] lg:w-[380px] ${service.position}`}
                >
                  <div className="flex-shrink-0 p-2 text-white md:p-3">
                    {/* <ArrowUpRight size={18} className="md:h-5 md:w-5" /> */}
                    <InteractiveButton />
                  </div>
                  <span className="whitespace-nowrap text-sm font-semibold text-gray-800 md:text-base lg:text-lg">
                    {service.label}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-[0px] top-1/2 z-30 -translate-y-1/2 cursor-pointer rounded-full border border-gray-200 p-2 text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-600 md:left-0 md:p-3"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 z-30 -translate-y-1/2 cursor-pointer rounded-full border border-gray-200 p-2 text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-600 md:right-0 md:p-3"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* Dots Indicator
          <div className="mb-12 flex gap-2 md:mb-16">
            {COURSES_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-3 w-3 rounded-full transition-all ${idx === currentIndex
                    ? "w-8 bg-[#167D71]"
                    : "bg-gray-300 hover:bg-gray-400"
                  }`}
              />
            ))}
          </div> */}

        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;
