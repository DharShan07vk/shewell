"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { InteractiveButton } from "./ui/interactive-button";
import router from "next/router";

const EXPERTS_DATA = [
  {
    id: 1,
    role: "Specialist",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80",
  },
  {
    id: 2,
    role: "Specialist",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&h=300&q=80",
  },
  {
    id: 3,
    role: "Specialist",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80",
  },
  {
    id: 4,
    role: "Specialist",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&h=300&q=80",
  },
  {
    id: 5,
    role: "Specialist",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&h=300&q=80",
  },
  {
    id: 6,
    role: "Specialist",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&h=300&q=80",
  },
  {
    id: 7,
    role: "Specialist",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&h=300&q=80",
  },
  {
    id: 8,
    role: "Specialist",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&h=300&q=80",
  },
];

export default function ExpertsCarousel() {
  const [items, setItems] = useState(EXPERTS_DATA);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = useCallback(() => {
    setItems((prev) => {
      const newArr = [...prev];
      const first = newArr.shift();
      if (first) newArr.push(first);
      return newArr;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setItems((prev) => {
      const newArr = [...prev];
      const last = newArr.pop();
      if (last) newArr.unshift(last);
      return newArr;
    });
  }, []);

  // Auto-scroll Timer
  useEffect(() => {
    if (isHovered) return; // Pause timer when user hovers

    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Rotates every 3 seconds

    return () => clearInterval(interval);
  }, [handleNext, isHovered]);

  return (
    <section className="w-full overflow-hidden bg-white px-4 sm:px-6 md:px-12 lg:px-[100px] py-6 sm:py-8 md:py-12">
      <div className="max-w-8xl mx-auto px-0">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8 text-center md:mb-12">
          <h2 className="mb-2 sm:mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-gray-900">
            You're Not Alone  We're Just a Click Away
          </h2>
          <p className="mx-auto text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px] text-[#33333399]">
            Consult with empathetic, qualified specialists who listen, guide,
            and support your health decisions.
          </p>
        </div>

        {/* Experts Carousel */}
        <div
          className="relative flex h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            onClick={handlePrev}
            className="absolute left-0 sm:left-2 z-30 rounded-full border border-gray-300 bg-white p-2 sm:p-3 transition-colors hover:bg-gray-100 md:left-10"
          >
            <ChevronLeft size={20} className="text-gray-600 sm:size-6" />
          </button>

          <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-8 lg:gap-12">
            <AnimatePresence mode="popLayout" initial={false}>
              {items.slice(0, 5).map((expert, index) => {
                const isCenter = index === 2;
                const isSide = index === 1 || index === 3;

                return (
                  <motion.div
                    key={expert.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: isCenter ? 1.5 : isSide ? 1.4 : 1.1,
                      zIndex: isCenter ? 20 : 10,
                      marginLeft:
                        index === 2
                          ? "2rem"
                          : index === 3 || index === 4
                            ? "1rem"
                            : "0",
                      marginRight:
                        index === 2
                          ? "2rem"
                          : index === 1 || index === 0
                            ? "1rem"
                            : "0",
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                    }}
                    className="relative"
                  >
                    <div
                      className={`relative overflow-hidden rounded-full border-white shadow-xl
                        ${isCenter ? "h-20 w-20 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-48 lg:w-48" : "h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-32 lg:w-32"}`}
                    >
                      <img
                        src={expert.image}
                        alt="Expert"
                        className="h-full w-full object-cover"
                      />
                      {/* overlay */}
                      <div className="absolute inset-0 top-[60%] bg-black/25   shadow-lg blur-[3px] " />
                      {/* Role Badge */}
                      <motion.div
                        animate={{ opacity: isCenter ? 1 : 0.7 }}
                        className={`absolute  ${isCenter ? " bottom-4 sm:bottom-6 lg:bottom-8 " : " bottom-2 sm:bottom-3"} l left-1/2 flex -translate-x-1/2 items-center gap-1 bg-transparent px-2 py-0.5 `}
                      >
                        <span className="h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-white"></span>
                        <span
                          className={` ${isCenter ? "text-xs sm:text-base lg:text-[20px]" : "text-[10px] sm:text-sm"} whitespace-nowrap font-medium text-white transition-all duration-300 ease-in-out`}
                        >
                          {expert.role}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-0 sm:right-2 z-30 rounded-full border border-gray-300 bg-white p-2 sm:p-3 transition-colors hover:bg-gray-100 md:right-10"
          >
            <ChevronRight size={20} className="text-gray-600 sm:size-6" />
          </button>
        </div>

        {/* CTA Button */}
        <div
          className="mt-8 sm:mt-12 flex w-full justify-center md:mt-16 "
          onClick={() => window.location.href = "/counselling"}
        >
          <div className="order-0 group flex h-12 sm:h-16 md:h-20 lg:h-[80px] w-full cursor-pointer items-center justify-between gap-2.5 rounded-xl sm:rounded-2xl bg-[#F2F2F2] px-3 sm:px-4 md:px-6 py-3 sm:py-4 transition-all duration-300 ease-in-out hover:bg-[#e5e5e5]">
            <div className="flex flex-1 justify-center">
              <span className="text-xs sm:text-base md:text-lg lg:text-2xl font-semibold text-[#00000066]">
                Book a Session with our experts
              </span>
            </div>
            <InteractiveButton />
          </div>
        </div>
      </div>
    </section>
  );
}
