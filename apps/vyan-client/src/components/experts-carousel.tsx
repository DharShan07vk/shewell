"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { InteractiveButton } from "./ui/interactive-button";

const EXPERTS_DATA = [
  { id: 1, role: "Specialist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80" },
  { id: 2, role: "Specialist", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&h=300&q=80" },
  { id: 3, role: "Specialist", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80" },
  { id: 4, role: "Specialist", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&h=300&q=80" },
  { id: 5, role: "Specialist", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&h=300&q=80" },
  { id: 6, role: "Specialist", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&h=300&q=80" },
  { id: 7, role: "Specialist", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&h=300&q=80" },
  { id: 8, role: "Specialist", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&h=300&q=80" },
];

export default function ExpertsCarousel() {
  const [items, setItems] = useState(EXPERTS_DATA);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = useCallback(() => {
    setItems((prev ) => {
      const newArr = [...prev ];
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
    <section className="w-full overflow-hidden bg-white px-[100px] py-12 md:py-16">
      <div className="mx-auto max-w-8xl px-4">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-medium text-gray-900 md:text-4xl lg:text-5xl">
            You're Not Alone - We're Just a Click Away
          </h2>
          <p className="mx-auto text-[24px] text-[#33333399]">
            Consult with empathetic, qualified specialists who listen, guide,
            and support your health decisions.
          </p>
        </div>

        {/* Experts Carousel */}
        <div 
          className="relative flex items-center justify-center h-[280px] md:h-[350px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button 
            onClick={handlePrev} 
            className="absolute left-0 md:left-10 z-30 p-3 border border-gray-300 rounded-full bg-white hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          
          <div className="flex items-center justify-center gap-8 md:gap-12">
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
                      marginLeft: index === 2 ? "2rem" : index === 3 || index === 4 ? "1rem" : "0",
                      marginRight: index === 2 ? "2rem" : index === 1 || index === 0 ? "1rem" : "0",
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                    }}
                    className="relative"
                  >
                    <div className={`relative overflow-hidden rounded-full  border-white shadow-xl
                        ${isCenter ? "h-32 w-32 md:h-48 md:w-48" : "h-24 w-24 md:h-32 md:w-32"}`}
                    >
                      <img src={expert.image} alt="Expert" className="h-full w-full object-cover" />
                      {/* overlay */}
                      <div className="absolute top-[60%] inset-0 bg-black/25   shadow-lg blur-[3px] " />
                      {/* Role Badge */}
                      <motion.div 
                        animate={{ opacity: isCenter ? 1 : 0.7 }}
                        className= {`absolute  ${isCenter ? " bottom-8 " : " bottom-4"} left-1/2 -translate-x-1/2 flex items-center gap-1 l bg-transparent px-2 py-0.5 `}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                        <span className={` ${isCenter ? "text-[20px]" : "text-sm"} transition-all duration-300 ease-in-out font-medium text-white whitespace-nowrap`}>{expert.role}</span>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <button 
            onClick={handleNext} 
            className="absolute right-0 md:right-10 z-30 p-3 border border-gray-300 rounded-full bg-white hover:bg-gray-100 transition-colors"
          >
            <ChevronRight size={24} className="text-gray-600" />
          </button>
        </div>

        {/* CTA Button */}
        <div className="mt-12 flex w-full justify-center md:mt-16">
          <div className="order-0 group flex h-[80px] w-full items-center justify-between gap-2.5 rounded-2xl bg-[#F2F2F2] px-6 py-4 transition-all duration-300 ease-in-out hover:bg-[#e5e5e5] cursor-pointer">
            <span className="text-lg text-center font-medium text-[#00000066] sm:text-xl">
              Consult an Expert Now
            </span>
            <InteractiveButton />
          </div>
        </div>
      </div>
    </section>
  );
}