"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { InteractiveButton } from "@/components/ui/interactive-button";

interface BookingSectionProps {
  price: number;
  imageUrl: string;
}

export const BookingSection = ({
  price,
  imageUrl,
}: BookingSectionProps): JSX.Element => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="w-full bg-white px-6 py-12 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 overflow-hidden rounded-[32px] shadow-sm md:grid-cols-2">
          {/* Left Image */}
          <div className="h-full">
            <img
              src={imageUrl}
              alt="Session"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right Form */}
          <div className="flex flex-col bg-white px-10 py-10">
            {/* Price pill */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#e6eff1] px-8 py-4 text-lg">
                <span className="font-semibold text-teal-700">₹{price}</span>
                <span className="text-gray-900">confirm your seat</span>
              </div>
            </div>

            {/* Stepper */}
            <div className="mb-10 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-700 text-xs text-white">
                  1
                </span>
                <span className="text-gray-900">Personal details</span>
              </div>

              <div className="h-px flex-1 bg-gray-200" />

              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-600">
                2
              </span>

              <div className="h-px flex-1 bg-gray-200" />

              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-600">
                3
              </span>
            </div>

            {/* Inputs */}
            <div className="flex-1 space-y-6">
              <Input
                name="name"
                placeholder="Shewell Mom Name"
                value={formData.name}
                onChange={handleInputChange}
                className="h-14 rounded-xl border-none bg-gray-50"
              />

              <Input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="h-14 rounded-xl border-none bg-gray-50"
              />

              <Input
                name="mobile"
                placeholder="Mobile number"
                value={formData.mobile}
                onChange={handleInputChange}
                className="h-14 rounded-xl border-none bg-gray-50"
              />
            </div>

            {/* White separator */}
            <div className="my-8 h-[5px] bg-white/80" />

            {/* Continue */}
            <div
              className="
                group
                flex items-center justify-between
                rounded-2xl px-6
                py-5
                transition-all duration-300 ease-in-out
                hover:bg-[#00898F]
              "
            >
              <span
                className="
                  text-lg font-medium text-gray-900
                  transition-colors duration-300
                  group-hover:text-[#E1EBED]
                "
              >
                Continue
              </span>

              <InteractiveButton
                className="
                  h-8
                  w-8 rotate-[-120deg]
                  "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
