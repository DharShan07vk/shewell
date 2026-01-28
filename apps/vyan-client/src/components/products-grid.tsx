"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowDownLeft,
  ArrowUpRight,
  Star,
} from "lucide-react";
import { InteractiveButton } from "./ui/interactive-button";

const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Newborn food product for better growth",
    description: "(contains fiber, vitamins, protiens)",
    price: 1449,
    rating: 4.5,
    reviews: 56,
    image: "/images/product/prod-1-a.png",
  },
  {
    id: 2,
    name: "Newborn food product for better growth",
    description: "(contains fiber, vitamins, protiens)",
    price: 1449,
    rating: 4.5,
    reviews: 56,
    image: "/images/product/prod-1-c.png",
  },
  {
    id: 3,
    name: "Newborn food product for better growth",
    description: "(contains fiber, vitamins, protiens)",
    price: 1449,
    rating: 4.5,
    reviews: 56,
    image: "/images/product/prod-1-c.png",
  },
  {
    id: 4,
    name: "Newborn food product for better growth",
    description: "(contains fiber, vitamins, protiens)",
    price: 1449,
    rating: 4.5,
    reviews: 56,
    image: "/images/product/prod-1-d.png",
  },
  {
    id: 5,
    name: "Newborn food product for better growth",
    description: "(contains fiber, vitamins, protiens)",
    price: 1449,
    rating: 4.5,
    reviews: 56,
    image: "/images/product/prod-1-a.png",
  },
  {
    id: 6,
    name: "Newborn food product for better growth",
    description: "(contains fiber, vitamins, protiens)",
    price: 1449,
    rating: 4.5,
    reviews: 56,
    image: "/images/product/prod-1-b.png",
  },
];

export default function ProductsGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const renderStars = (rating: number) => {
    const stars: React.ReactNode[] = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} size={14} className="fill-pink-500 text-pink-500" />,
        );
      } else if (i === fullStars && hasHalf) {
        stars.push(
          <Star key={i} size={14} className="fill-pink-500/50 text-pink-500" />,
        );
      } else {
        stars.push(<Star key={i} size={14} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 md:px-12 lg:px-[100px] py-8 sm:py-12 md:py-16 lg:py-24">
      <div className=" w-full px-0">
        {/* Section Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
          <div>
            <h2 className="mb-2 sm:mb-3 text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-gray-900">
              Clean, Safe, Conscious For You and Baby.
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[24px] text-[#33333399]">
              Toxin-free, cruelty-free, and consciously created maternity
              products all validated by experts and moms alike.
            </p>
          </div>

          {/* Navigation Arrows - Disabled */}
          <div className="pointer-events-none hidden items-center gap-2 opacity-30 md:flex">
            <button
              disabled
              className="rounded-full border border-gray-300 p-3 text-gray-800 transition-all"
            >
              <ChevronLeft size={24} color={"#E0E0E0"} />
            </button>
            <button
              disabled
              className="rounded-full border border-gray-300 p-3 text-gray-800 transition-all"
            >
              <ChevronRight size={24} color={"#E0E0E0"} />
            </button>
          </div>
        </div>

        {/* Coming Soon Premium Cards */}
        <div className="z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              {/* Product Image Area with Gradient & Coming Soon */}
              <div className="relative flex h-32 sm:h-40 md:h-48 lg:h-56 w-full items-center justify-center overflow-hidden bg-[#1B8A8E] p-3 sm:p-4 opacity-50 md:p-4">
                {/* Decorative circles */}
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#00898F]/5"></div>
                <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#51AF5A]/5"></div>

                {/* Coming Soon Content */}
                <div className="relative z-10 text-center">
                  <div className="mb-2 sm:mb-3 inline-flex items-center justify-center">
                    <svg
                      className="h-10 sm:h-12 md:h-16 w-10 sm:w-12 md:w-16 text-[#00898F]/40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <p className="bg-white bg-clip-text text-sm sm:text-lg md:text-2xl font-bold text-transparent">
                    Coming Soon
                  </p>
                  <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-white">
                    Curated just for you
                  </p>
                </div>

                {/* Animated shimmer overlay */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>

              {/* Product Details Skeleton */}
              <div className="p-3 sm:p-4">
                {/* Title skeleton */}
                <div className="mb-1 sm:mb-2 h-3 sm:h-4 w-3/4 animate-pulse rounded-full bg-gradient-to-r from-gray-200 to-gray-100"></div>
                <div className="mb-2 sm:mb-3 h-2 sm:h-3 w-1/2 animate-pulse rounded-full bg-gradient-to-r from-gray-200 to-gray-100"></div>

                {/* Price skeleton */}
                <div className="mb-2 sm:mb-3 h-4 sm:h-6 w-1/3 animate-pulse rounded-full bg-gradient-to-r from-gray-200 to-gray-100"></div>

                {/* Rating skeleton */}
                <div className="mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2">
                  <div className="flex gap-0.5 sm:gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={12} className="sm:size-3.5 text-gray-200" />
                    ))}
                  </div>
                </div>

                {/* Button skeleton */}
                <div className="flex h-10 sm:h-11 md:h-[45px] w-full items-center justify-center rounded-lg sm:rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200">
                  <span className="text-xs sm:text-sm font-medium text-white">
                    Shop Now
                  </span>
                </div>
              </div>

              {/* Subtle badge */}
              <div className="absolute right-3 top-3 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#00898F] backdrop-blur-sm">
                New
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons - Coming Soon State */}
        <div className="mt-12 flex flex-col justify-center gap-4 md:flex-row">
          <div className="order-0 group relative flex h-[80px] w-auto flex-none flex-grow flex-row items-center justify-between gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-4 shadow-sm">
            <span className="relative z-10 text-lg font-semibold text-white sm:text-xl">
              Explore All Products
            </span>
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
              <ArrowUpRight className="h-6 w-6 text-white" />
            </div>
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          <div className="order-0 group relative flex h-[80px] w-auto flex-none flex-grow flex-row items-center justify-between gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-4 shadow-sm">
            <span className="relative z-10 text-lg font-semibold text-white sm:text-xl">
              Shop by Trimester
            </span>
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
              <ArrowUpRight className="h-6 w-6 text-white" />
            </div>
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>

        {/* COMMENTED OUT - ORIGINAL PRODUCT CAROUSEL
        <div
          ref={scrollRef}
          className="scrollbar-hide z-10 flex gap-4 overflow-x-auto pb-4 pl-2 pt-4 md:gap-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {PRODUCTS_DATA.map((product) => (
            <motion.div
              key={product.id}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              animate={{
                scale: hoveredId === product.id ? 1.02 : 1,
              }}
              transition={{ duration: 0.2 }}
              className={`w-64 flex-shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg md:w-72 ${
                hoveredId === product.id ? "ring-2 ring-primary/30" : ""
              }`}
            >
              <div className="flex h-48 w-full items-center justify-center overflow-hidden bg-[#F5FBFB] p-4 md:h-56 ">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full rounded-lg object-cover"
                  onError={(
                    e: React.SyntheticEvent<HTMLImageElement, Event>,
                  ) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/300x200?text=Product";
                  }}
                />
              </div>

              <div className="p-4">
                <h3 className="mb-1 line-clamp-2 text-sm font-medium text-gray-900">
                  {product.name}
                </h3>
                <p className="mb-2 text-xs text-gray-500">
                  {product.description}
                </p>

                <p className="mb-2 text-lg font-bold text-gray-900">
                  INR {product.price.toLocaleString()}
                </p>

                <div className="mb-4 flex items-center gap-2">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-xs text-gray-500">
                    {product.rating} | {product.reviews} Reviews
                  </span>
                </div>

                <div className="order-0 group flex h-[45px] w-full flex-grow flex-row items-center justify-between gap-2.5 rounded-2xl bg-[#F2F2F2] px-4 py-0 transition-all duration-300 ease-in-out hover:bg-[#e5e5e5]">
                  <span className="text-lg font-medium text-[#00000066] sm:text-[17px]">
                    Shop Now
                  </span>
                  <InteractiveButton size="small" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-col justify-center gap-4 md:flex-row">
          <div className="order-0 group flex h-[80px] w-auto flex-none flex-grow flex-row items-center justify-between gap-2.5 rounded-2xl bg-[#F2F2F2] px-6 py-4 transition-all duration-300 ease-in-out hover:bg-[#e5e5e5]">
            <span className="text-lg font-medium text-[#00000066] sm:text-xl">
              Explore All Products
            </span>
            <InteractiveButton />
          </div>

          <div className="order-0 group flex h-[80px] w-auto flex-none flex-grow flex-row items-center justify-between gap-2.5 rounded-2xl bg-[#F2F2F2] px-6 py-4 transition-all duration-300 ease-in-out hover:bg-[#e5e5e5]">
            <span className="text-lg font-medium text-[#00000066] sm:text-xl">
              Shop by Trimester
            </span>
            <InteractiveButton />
          </div>
        </div>
        */}
      </div>
    </section>
  );
}
