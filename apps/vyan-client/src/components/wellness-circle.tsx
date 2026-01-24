"use client";
import React from "react";
import { motion } from "framer-motion";

const WellnessCircle = () => {
    return (
        <div className="relative min-h-screen w-full bg-white flex flex-col items-center justify-start overflow-hidden pt-16 md:pt-24">
            {/* 1. Illustration Area */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1.2, ease: "easeInOut" }}
                className="text-center mb-0"
            >   
                <h2 className="text-primary font-amatic-sc font-bold text-8xl tracking-wide">
                    <span className="text-primary opacity-50 hover:opacity-100">For her body, </span> < span className="text-primary opacity-50 hover:opacity-100">her mind, </span> <span className="text-primary opacity-50 hover:opacity-100">and her baby</span>
                </h2>
            </motion.div>

            {/* 3. Main Title & Subtext */}
          

            {/* 4. Decorative Background Element */}
           
        </div>
    );
};

export default WellnessCircle;
