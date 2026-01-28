"use client";

import React from "react";
import Image from "next/image";

export interface DoctorAvatarProps {
  src: string;
  alt: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

export const DoctorAvatar: React.FC<DoctorAvatarProps> = ({
  src,
  alt,
  size = "medium",
  className = "",
}) => {
  const sizeClasses = {
    small: "w-[80px]",
    medium: "w-[135px]",
    large: "w-[180px]",
  };

  return (
    <div className={`relative flex aspect-square ${sizeClasses[size]} items-center justify-center ${className}`}>
      {/* Decorative gradient ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00898F]/20 to-[#51AF5A]/20 p-1.5">
        <div className="relative h-full w-full overflow-hidden rounded-full bg-white shadow-lg ring-2 ring-white">
          <Image
            src={src || "/images/fallback-user-profile.png"}
            alt={alt}
            className="rounded-full object-cover transition-transform duration-300 hover:scale-105"
            fill
          />
        </div>
      </div>
    </div>
  );
};

DoctorAvatar.displayName = "DoctorAvatar";
