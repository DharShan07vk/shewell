"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const STAGES_DATA = [
    {
        id: "pre-pregnancy",
        prefix: "PRE",
        title: "PREGNANCY",
        bgColor: "bg-[#C8B8D9]",
        textColor: "text-[#6B5B7A]",
    },
    {
        id: "1st-trimester",
        prefix: "1ST",
        title: "TRIMESTER",
        bgColor: "bg-[#C5E1C0]",
        textColor: "text-[#4A5B4A]",
    },
    {
        id: "2nd-trimester",
        prefix: "2ND",
        title: "TRIMESTER",
        bgColor: "bg-[#B5E5E0]",
        textColor: "text-[#4A6B68]",
    },
    {
        id: "3rd-trimester",
        prefix: "3RD",
        title: "TRIMESTER",
        bgColor: "bg-[#A8D8D5]",
        textColor: "text-[#4A6B68]",
    },
    {
        id: "post-partum",
        prefix: "POST",
        title: "PARTUM",
        bgColor: "bg-[#B8C4E8]",
        textColor: "text-[#5B6B8A]",
    },
];

export default function PregnancyStages() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section className="w-full py-16 md:py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Your Journey, Every Step
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Expert guidance through every stage of motherhood
                    </p>
                </div>

                {/* Stages Cards */}
                <div className="flex flex-wrap justify-center items-center gap-6">
                    {STAGES_DATA.map((stage) => (
                        <motion.div
                            key={stage.id}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className={`relative flex h-48 w-80 items-center justify-center overflow-hidden rounded-[40px] ${stage.bgColor} p-8 font-sans shadow-lg cursor-pointer group`}
                        >
                            {/* The large Gradient Text */}
                            <h1 className="absolute left-6 top-2 text-[140px] font-black leading-none tracking-tighter select-none">
                                <span className={`bg-gradient-to-b from-black/40 to-transparent bg-clip-text text-transparent`}>
                                    {stage.prefix}
                                </span>
                            </h1>

                            {/* The Title Text */}
                            <h2 className="relative mt-20 self-end text-right text-4xl font-extrabold tracking-tight text-white z-10 drop-shadow-sm">
                                {stage.title}
                            </h2>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
