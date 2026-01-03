"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Search, User } from "lucide-react";
import { env } from "~/env";

export function Header() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="relative sticky top-0 z-50 w-full bg-gradient-to-r from-[#0E3A47] to-[#13647A] shadow-sm">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="relative h-10 w-32">
          <img
            src="/home/Logo.png"
            alt="Shewell"
            className="h-full w-full object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link
            href="/session"
            className="font-medium text-white transition-colors hover:text-[#A5F3FC]"
          >
            Session
          </Link>

          <Link
            href="/products"
            className="font-medium text-white transition-colors hover:text-[#A5F3FC]"
          >
            Product
          </Link>
          <Link
            href="/counselling"
            className="font-medium text-white transition-colors hover:text-[#A5F3FC]"
          >
            Book experts
          </Link>

          <Link
            href="/blogs"
            className="font-medium text-white transition-colors hover:text-[#A5F3FC]"
          >
            Blog
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setIsMoreOpen(true)}
            onMouseLeave={() => setIsMoreOpen(false)}
          >
            <button
              className="flex items-center gap-1 font-medium text-white transition-colors hover:text-[#A5F3FC]"
              onClick={() => setIsMoreOpen(!isMoreOpen)}
            >
              More
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isMoreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isMoreOpen && (
              <div className="absolute left-0 top-full z-10 ">
                <div className="w-48 rounded-md bg-white  shadow-lg">
                  <Link
                    href="/shefit"
                    className="block rounded-t-md px-4 py-2 text-sm text-gray-700 hover:bg-[#f3f4f6]"
                    onClick={() => setIsMoreOpen(false)}
                  >
                    SheFit
                  </Link>
                  <Link
                    href="/shefit/sessions"
                    className="block rounded-b-md px-4 py-2 text-sm text-gray-700 hover:bg-[#f3f4f6]"
                    onClick={() => setIsMoreOpen(false)}
                  >
                    Retreat Retreat
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4  ">
          <div className="relative">
            {!isSearchOpen ? (
              <button
                className="absolute right-0 top-[-17.5px] rounded-full bg-[#1A8191] p-2 text-white transition-all duration-300 hover:bg-[#A5F3FC] hover:text-[#13647A]"
                aria-label="Search"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </button>
            ) : (
              <div className="absolute right-0 top-[-18px] flex items-center gap-2 rounded-full bg-[#1A8191] px-4 py-2">
                <Search className="h-5 w-5 text-white" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-48 bg-transparent text-white placeholder-white/70 focus:outline-none"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
              </div>
            )}
          </div>

          <Link
            href="/auth/login"
            className="rounded-full bg-[#1A8191] p-2 text-white transition-all duration-300 hover:bg-[#A5F3FC] hover:text-[#13647A]"
            aria-label="User profile"
          >
            <User className="h-5 w-5" />
          </Link>

          <Link
            href={env.NEXT_PUBLIC_PROFESSIONAL + ""}
            className="text-[#FFFFFF99] hover:text-white "
          >
            Register as Therapist
          </Link>
        </div>
      </nav>
    </header>
  );
}
