"use client";
import React from "react";
import { motion } from "framer-motion";

const overallVariant = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.5,
        },
    },
};

const WellnessCircle = () => {
    return (
        <div className="py-12 md:py-16 px-6 md:px-20 xl:px-48 w-full bg-white flex flex-col items-center overflow-hidden">
            {/* 1. Illustration Area */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full px-0 mb-8"
            >
                {/* Mother and Baby Illustration */}
                <img
                    src="/home/Vector.png"
                    alt="Mother and baby illustration"
                    className="w-full h-auto object-cover mx-auto opacity-20 hover:opacity-100 transition-opacity ease-in-out cursor-pointer"
                />
            </motion.div>

            {/* 2. Cursive Script Heading */}
            <motion.div
                variants={overallVariant}
                initial="hidden"
                animate="visible"
                // transition={{ delay: 0.3, duration: 1.2, ease: "easeInOut" }}
                className="text-center mb-0"
            >   
                <h2 className="text-primary font-amatic-sc font-bold text-8xl tracking-wide flex flex-wrap justify-center gap-6">
                    <span className="text-primary opacity-50 hover:opacity-100 transition-opacity duration-500 ease-in-out cursor-default">For her body, </span> 
                    <span className="text-primary opacity-50 hover:opacity-100 transition-opacity duration-500 ease-in-out cursor-default">her mind, </span>
                    <span className="text-primary opacity-50 hover:opacity-100 transition-opacity duration-500 ease-in-out cursor-default">and </span>
                    <span className="text-primary opacity-50 hover:opacity-100 transition-opacity duration-500 ease-in-out cursor-default">her baby</span>
                </h2>
            </motion.div>           
        </div>
    );
};

export default WellnessCircle;
