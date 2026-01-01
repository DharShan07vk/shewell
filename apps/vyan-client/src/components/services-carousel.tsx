"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const COURSES_DATA = [
    {
        id: 1,
        category: "Child Healthcare",
        mainImage: "/home/Group 39661.png",
        services: [
            { label: "Lifestyle Issue", position: "top-[10%] left-[5%]" },
            { label: "Nutritional Issue", position: "top-[10%] right-[5%]" },
            { label: "Development Challenge", position: "bottom-[20%] left-[5%]" },
            { label: "Behavioral Challenge", position: "bottom-[20%] right-[5%]" },
        ],
    },
    {
        id: 2,
        category: "Woman Wellbeing",
        mainImage: "/home/Group 39661-2.png",
        services: [
            { label: "Mental Wellbeing", position: "top-[10%] right-[5%]" },
            { label: "Physical Health", position: "bottom-[20%] right-[5%]" },
            { label: "Lifestyle Issue", position: "top-[10%] left-[5%]" },
            { label: "Overweight", position: "bottom-[20%] left-[5%]" },
        ],
    },
    {
        id: 3,
        category: "Pregnancy Care",
        mainImage: "/home/Group 39661-3.png",
        services: [
            { label: "Prenatal Care", position: "top-[10%] left-[5%]" },
            { label: "Nutrition Guide", position: "top-[10%] right-[5%]" },
            { label: "Exercise Programs", position: "bottom-[20%] left-[5%]" },
            { label: "Mental Support", position: "bottom-[20%] right-[5%]" },
        ],
    },
    {
        id: 4,
        category: "Postnatal Support",
        mainImage: "/home/Group 39661-4.png",
        services: [
            { label: "Recovery Care", position: "top-[10%] left-[5%]" },
            { label: "Breastfeeding", position: "top-[10%] right-[5%]" },
            { label: "Baby Care", position: "bottom-[20%] left-[5%]" },
            { label: "Mental Health", position: "bottom-[20%] right-[5%]" },
        ],
    },
    {
        id: 5,
        category: "Family Wellness",
        mainImage: "/home/Group 39661 -5.png",
        services: [
            { label: "Parenting Tips", position: "top-[10%] left-[5%]" },
            { label: "Family Bonding", position: "top-[10%] right-[5%]" },
            { label: "Child Development", position: "bottom-[20%] left-[5%]" },
            { label: "Healthy Habits", position: "bottom-[20%] right-[5%]" },
        ],
    },
];

const ServicesCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const current = COURSES_DATA[currentIndex];

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev === COURSES_DATA.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? COURSES_DATA.length - 1 : prev - 1
        );
    };

    return (
        <section className="relative w-full min-h-screen bg-white py-12 md:py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                {/* Carousel Container */}
                <div className="relative flex flex-col items-center">
                    {/* Main Image Area with Title Integrated */}
                    <div className="relative w-full flex items-center justify-center mb-12 md:mb-16">
                        {/* Main Image */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current?.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                                className="relative w-full max-w-4xl h-[400px] md:h-[500px] lg:h-[600px]"
                            >
                                <Image
                                    src={current?.mainImage}
                                    alt={current?.category}
                                    fill
                                    className="object-contain"
                                    priority
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
                                    className={`absolute z-20 flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2 md:py-3 bg-white rounded-full shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all cursor-pointer ${service.position}`}
                                >
                                    <span className="text-xs md:text-sm font-semibold text-gray-700 whitespace-nowrap">
                                        {service.label}
                                    </span>
                                    <div className="bg-[#167D71] text-white p-1.5 rounded-full flex-shrink-0">
                                        <ArrowUpRight size={14} />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full border border-gray-200 text-gray-400 z-30 hover:bg-gray-50 hover:text-gray-600 transition-all cursor-pointer"
                        >
                            <ChevronLeft size={32} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full border border-gray-200 text-gray-400 z-30 hover:bg-gray-50 hover:text-gray-600 transition-all cursor-pointer"
                        >
                            <ChevronRight size={32} />
                        </button>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex gap-2 mb-12 md:mb-16">
                        {COURSES_DATA.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-3 h-3 rounded-full transition-all ${
                                    idx === currentIndex
                                        ? "bg-[#167D71] w-8"
                                        : "bg-gray-300 hover:bg-gray-400"
                                }`}
                            />
                        ))}
                    </div>

                    {/* Footer Text */}
                    <div className="text-center">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                            Courses That Support You - Every Step of the Way
                        </h3>
                        <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base lg:text-lg">
                            From fertility to first steps – evidence-based, heart-led,
                            expert-designed just for you.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesCarousel;
