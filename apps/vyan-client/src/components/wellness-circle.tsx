"use client";
import React from "react";
import { motion } from "framer-motion";

const WellnessCircle = () => {
    return (
        <div className="relative min-h-screen w-full bg-white flex flex-col items-center justify-start overflow-hidden pt-16 md:pt-24">
            {/* 1. Illustration Area */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full px-0 mb-8"
            >
                {/* Mother and Baby Illustration */}
                <img
                    src="/home/Vector.png"
                    alt="Mother and baby illustration"
                    className="w-full h-auto object-cover mx-auto opacity-20 hover:opacity-100"
                />
            </motion.div>

            {/* 2. Cursive Script Heading */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-center mb-6"
            >   
                <h2 className="text-primary font-pacifico text-3xl md:text-4xl lg:text-5xl tracking-wide">
                    <span className="text-primary opacity-50 hover:opacity-100">For her body, </span> < span className="text-primary opacity-50 hover:opacity-100">her mind, </span> <span className="text-primary opacity-50 hover:opacity-100">and her baby</span>
                </h2>
            </motion.div>

            {/* 3. Main Title & Subtext */}
            <div className="text-center max-w-4xl px-0 z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                >
                    India's Wellness Circle For Women <br className="hidden md:block" />{" "}
                    Who Mother With Intention
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                    className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
                >
                    Tap into curated care programs and ancient wisdom to raise happy moms
                    and healthy babies with expert-led sessions and wellness.
                </motion.p>
            </div>

            {/* 4. Decorative Background Element */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#f0f9f8] to-transparent opacity-50 -z-10" />
        </div>
    );
};

export default WellnessCircle;
