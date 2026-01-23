"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowDownLeft } from "lucide-react";
import { InteractiveButton } from "./ui/interactive-button";

const EXPERTS_DATA = [
    {
        id: 1,
        name: "Dr. Priya Sharma",
        role: "Specialist",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
        id: 2,
        name: "Dr. Meera Patel",
        role: "Specialist",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
        id: 3,
        name: "Dr. Rahul Verma",
        role: "Specialist",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
        id: 4,
        name: "Dr. Anil Kumar",
        role: "Specialist",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
        id: 5,
        name: "Dr. Vikram Singh",
        role: "Specialist",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
        id: 6,
        name: "Dr. Neha Gupta",
        role: "Specialist",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
        id: 7,
        name: "Dr. Sanjay Reddy",
        role: "Specialist",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&h=300&q=80",
    },
];

export default function ExpertsCarousel() {
    const [centerIndex, setCenterIndex] = useState(2);
    const containerRef = useRef<HTMLDivElement>(null);

    const getVisibleExperts = () => {
        const visible: Array<(typeof EXPERTS_DATA)[number] & { position: number }> = [];
        for (let i = -2; i <= 2; i++) {
            let index = centerIndex + i;
            if (index < 0) index = EXPERTS_DATA.length + index;
            if (index >= EXPERTS_DATA.length) index = index - EXPERTS_DATA.length;
            visible.push({ ...EXPERTS_DATA[index]!, position: i });
        }
        return visible;
    };

    const nextSlide = () => {
        setCenterIndex((prev) => (prev + 1) % EXPERTS_DATA.length);
    };

    const prevSlide = () => {
        setCenterIndex((prev) =>
            prev === 0 ? EXPERTS_DATA.length - 1 : prev - 1
        );
    };

    const getScale = (position: number) => {
        if (position === 0) return 1.2;
        if (Math.abs(position) === 1) return 0.9;
        return 0.75;
    };

    const getOpacity = (position: number) => {
        if (position === 0) return 1;
        if (Math.abs(position) === 1) return 0.9;
        return 0.7;
    };

    const getZIndex = (position: number) => {
        return 10 - Math.abs(position);
    };

    return (
      <section className="w-full overflow-hidden bg-white py-16 md:py-24">
        <div className="-mx-auto max-w-8xl px-20">
          {/* Section Header */}
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-medium text-gray-900 md:text-4xl lg:text-5xl">
              You're Not Alone - We're Just a Click Away
            </h2>
            <p className="mx-auto max-w-3xl text-base text-gray-600 md:text-lg">
              Consult with empathetic, qualified specialists who listen, guide,
              and support your health decisions.
            </p>
          </div>

          {/* Experts Carousel */}
          <div className="relative flex items-center justify-center">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-0 z-20 rounded-full border border-gray-300 p-3 text-gray-600 transition-all hover:bg-gray-300 hover:text-gray-800 md:left-4"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Experts Container */}
            <div
              ref={containerRef}
              className="flex items-center justify-center gap-2 py-8 md:gap-4"
            >
              {getVisibleExperts().map((expert) => (
                <motion.div
                  key={`${expert.id}-${expert.position}`}
                  animate={{
                    scale: getScale(expert.position),
                    opacity: getOpacity(expert.position),
                    zIndex: getZIndex(expert.position),
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative flex flex-col items-center"
                >
                  {/* Avatar */}
                  <div
                    className={`relative overflow-hidden rounded-full border-4 border-white shadow-lg ${
                      expert.position === 0
                        ? "h-28 w-28 md:h-40 md:w-40"
                        : "h-20 w-20 md:h-28 md:w-28"
                    }`}
                  >
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Role Badge */}
                  <div className="absolute -bottom-2 flex items-center gap-1 rounded-full bg-white px-3 py-1 shadow-md">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span className="text-xs font-medium text-gray-700">
                      {expert.role}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-0 z-20 z-30 rounded-full border border-gray-300 p-3 text-gray-600 transition-all hover:bg-gray-300 hover:text-gray-800 md:right-4"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* CTA Button */}
          <div className="mt-12 flex w-full justify-center md:mt-16">
            <button className="order-0 group flex h-[80px] w-auto flex-none flex-grow flex-row items-center justify-between gap-2.5 rounded-3xl bg-[#F2F2F2] px-6 py-4 transition-all duration-300 ease-in-out hover:bg-[#e5e5e5]">
              <span className="text-lg font-medium text-[#00000066] sm:text-xl">
                Consult an Expert Now
              </span>
              <InteractiveButton />
            </button>
          </div>
        </div>
      </section>
    );
}
