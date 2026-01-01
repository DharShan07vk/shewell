"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PLATFORM_DATA = [
    {
        id: "pre-pregnancy",
        title: "Pre-Pregnancy Webinars",
        description:
            "Prepare your mind and body for a healthy pregnancy journey with expert lifestyle and nutrition guidance.",
        image: "/home/4.png",
        color: "bg-[#1D4D4F]",
    },
    {
        id: "childbirth",
        title: "Childbirth Preparatory Classes",
        description:
            "Understand every trimester, your body changes, and how to confidently prepare for labor and delivery.",
        image: "/home/5.png",
        color: "bg-[#5B418F]",
    },
    {
        id: "breastfeeding",
        title: "Breastfeeding Classes",
        description:
            "Master latching, milk supply, and common challenges to make breastfeeding natural and stress-free.",
        image: "/home/6.png",
        color: "bg-[#917C5D]",
    },
    {
        id: "solids",
        title: "Starting Solids",
        description:
            "Learn when and how to start solids with balanced, safe meal plans curated by child nutrition experts.",
        image: "/home/7.png",
        color: "bg-[#167D71]",
    },
    {
        id: "postpartum",
        title: "Postpartum Mental Wellbeing",
        description:
            "Prioritize your emotional health with tools and therapy to navigate postpartum changes with strength.",
        image: "/home/Group 39661.png",
        color: "bg-[#7A6451]",
    },
];

export default function PlatformSection() {
    const [activeTab, setActiveTab] = useState(PLATFORM_DATA[0]);

    return (
        <section className="w-full bg-[#F5F5F5] py-16 md:py-24 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto border border-gray-200 rounded-[32px] overflow-hidden flex flex-col lg:flex-row h-[600px] lg:h-[650px] shadow-sm bg-white">
                {/* LEFT NAVIGATION */}
                <div className="w-full lg:w-[45%] flex flex-col justify-center px-6 md:px-10 py-8 gap-2 bg-white z-10 overflow-y-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 px-2">
                        Explore Our Programs
                    </h2>
                    <div className="space-y-2">
                        {PLATFORM_DATA.map((item) => (
                            <button
                                key={item.id}
                                onMouseEnter={() => setActiveTab(item)}
                                onClick={() => setActiveTab(item)}
                                className={`flex items-center justify-between w-full px-5 py-4 transition-colors duration-200 text-left group rounded-xl
                            ${activeTab?.id === item.id
                                        ? "bg-[#005F5F] text-white"
                                        : "bg-[#F5F5F5] text-gray-500 hover:bg-gray-200"
                                    }`}
                            >
                                <span className="text-base md:text-lg font-medium">
                                    {item.title}
                                </span>

                                {/* Icon Circle */}
                                <div
                                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors 
                                ${activeTab?.id === item.id
                                            ? "bg-white text-[#005F5F]"
                                            : "bg-gray-300 text-white"
                                        }`}
                                >
                                    <ArrowUpRight size={16} className={`section-icon ${activeTab?.id === item.id ? "rotate-45" : ""}`} />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* RIGHT CONTENT AREA */}
                <div className="relative w-full lg:w-[55%] h-full overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab?.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="absolute inset-0 w-full h-full"
                        >
                            {/* Full Height Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={activeTab?.image}
                                    alt={activeTab?.title}
                                    className="w-full h-full object-cover"
                                />
                                {/* Gradient Overlay for Text Readability */}
                                <div className="absolute inset-0 bg-gradient-to-b from-[#6B8E23]/90 via-[#6B8E23]/20 to-transparent" />
                            </div>

                            {/* Top Text Overlay Area */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.4 }}
                                className="relative z-20 w-full px-8 pt-12 md:px-12 md:pt-16"
                            >
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-tight drop-shadow-sm max-w-2xl">
                                    {activeTab?.description}
                                </h3>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
