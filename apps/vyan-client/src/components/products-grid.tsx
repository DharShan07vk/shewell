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
    <section className="w-full bg-gray-50 py-16 md:py-24">
      <div className=" w-full px-0">
        {/* Section Header */}
        <div className="mb-10 flex items-start justify-between">
          <div>
            <h2 className="mb-3 text-3xl font-medium text-gray-900 md:text-4xl lg:text-5xl">
              Clean, Safe, Conscious - For You and Baby.
            </h2>
            <p className="max-w-3xl text-base text-gray-600 md:text-lg">
              Toxin-free, cruelty-free, and consciously created maternity
              products - all validated by experts and moms alike.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={() => scroll("left")}
              className="rounded-full border border-gray-300 p-3 text-gray-800 transition-all hover:bg-gray-300 hover:text-gray-800"
            >
              <ChevronLeft size={24} color={"#E0E0E0"} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="rounded-full border border-gray-300 p-3 text-gray-800 transition-all hover:bg-gray-300 hover:text-gray-800"
            >
              <ChevronRight size={24} color={"#E0E0E0"} />
            </button>
          </div>
        </div>

        {/* Products Carousel */}
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-4 overflow-x-auto pb-4 md:gap-6"
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
              className={`w-64 flex-shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg md:w-72 ${hoveredId === product.id ? "ring-2 ring-primary/30" : ""
                }`}
            >
              {/* Product Image */}
              <div className="flex h-48 w-full items-center justify-center overflow-hidden bg-[#F5FBFB] md:h-56">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  onError={(
                    e: React.SyntheticEvent<HTMLImageElement, Event>,
                  ) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/300x200?text=Product";
                  }}
                />
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h3 className="mb-1 line-clamp-2 text-sm font-medium text-gray-900">
                  {product.name}
                </h3>
                <p className="mb-2 text-xs text-gray-500">
                  {product.description}
                </p>

                {/* Price */}
                <p className="mb-2 text-lg font-bold text-gray-900">
                  INR {product.price.toLocaleString()}
                </p>

                {/* Rating */}
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-xs text-gray-500">
                    {product.rating} | {product.reviews} Reviews
                  </span>
                </div>

                {/* Shop Now Button */}
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

        {/* CTA Buttons */}
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
      </div>
    </section>
  );
}
