"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Search, User } from "lucide-react";
import { env } from "process";

export function Header() {
  const [isServiceOpen, setIsServiceOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#0E3A47] to-[#13647A] shadow-sm">
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
          {/* Service Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsServiceOpen(true)}
            onMouseLeave={() => setIsServiceOpen(false)}
          >
            <button className="flex items-center gap-1 text-white hover:text-[#A5F3FC] transition-colors font-medium">
              Service
              <ChevronDown className="h-4 w-4" />
            </button>

            {isServiceOpen && (
              <div className="absolute left-0 top-full mt-2 w-48 rounded-md bg-white shadow-lg py-2 ring-1 ring-black ring-opacity-5">
                <Link
                  href="/counselling"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#13647A]"
                >
                  Counselling
                </Link>
                <Link
                  href="/doctor-profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#13647A]"
                >
                  Doctor Profile
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/counselling"
            className="text-white hover:text-[#A5F3FC] transition-colors font-medium"
          >
            Book experts
          </Link>

          <Link
            href="/products"
            className="text-white hover:text-[#A5F3FC] transition-colors font-medium"
          >
            Product
          </Link>

          <Link
            href="/session" 
            className="text-white hover:text-[#A5F3FC] transition-colors font-medium"
          >
            session
          </Link>

          <Link
            href="/blogs"
            className="text-white hover:text-[#A5F3FC] transition-colors font-medium"
          >
            Blog
          </Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          <button
            className="rounded-full bg-[#1A8191] p-2 text-white hover:bg-[#A5F3FC] hover:text-[#13647A] transition-all duration-300"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          <Link
            href="/profile"
            className="rounded-full bg-[#1A8191] p-2 text-white hover:bg-[#A5F3FC] hover:text-[#13647A] transition-all duration-300"
            aria-label="User profile"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
