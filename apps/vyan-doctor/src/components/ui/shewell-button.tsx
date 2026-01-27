"use client";

import React from "react";
import Link from "next/link";
import { InteractiveButton } from "./interactive-button";

export interface ShewellButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "large" | "medium" | "small";
  fullWidth?: boolean;
  withIcon?: boolean;
  disabled?: boolean;
  className?: string;
}

export const ShewellButton: React.FC<ShewellButtonProps> = ({
  children,
  href,
  onClick,
  variant = "medium",
  fullWidth = false,
  withIcon = true,
  disabled = false,
  className = "",
}) => {
  const sizeClasses = {
    large: "h-[64px] sm:h-[72px] md:h-[80px] px-4 sm:px-5 md:px-6 text-base sm:text-lg md:text-xl",
    medium: "h-[56px] px-5 text-base sm:text-lg",
    small: "h-[45px] px-4 text-sm sm:text-base",
  };

  const baseClasses = `
    group flex items-center justify-between gap-2.5 
    rounded-2xl bg-[#F2F2F2] py-4 
    font-medium text-[#00000066]
    transition-all duration-300 ease-in-out 
    hover:bg-[#e5e5e5]
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    ${fullWidth ? "w-full" : "w-auto"}
    ${sizeClasses[variant]}
    ${className}
  `;

  const content = (
    <>
      <span>{children}</span>
      {withIcon && <InteractiveButton size={variant === "small" ? "small" : "medium"} as="span" />}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={baseClasses}
    >
      {content}
    </button>
  );
};

ShewellButton.displayName = "ShewellButton";
