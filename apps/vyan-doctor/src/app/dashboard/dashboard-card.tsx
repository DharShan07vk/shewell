"use client";
import * as React from "react";

const DashboardCard = ({
  title,
  number,
  change,
  percentage,
  bgColor,
  borderColor,
}: {
  title: string;
  number: number;
  change: number;
  percentage: number;
  bgColor: string;
  borderColor: string;
}) => {
  const isPositiveChange = change >= 0;

  return (
    <div
      className="flex w-full sm:w-[calc(50%-1rem)] md:max-w-[270px] lg:max-w-[280px] xl:max-w-[300px] flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-5 transition-all hover:shadow-md"
      style={{ backgroundColor: bgColor, borderColor: borderColor }}
    >
      {/* Header */}
      <div className="flex w-full items-center justify-between">
        <h3 className="font-inter text-xs sm:text-sm md:text-base font-semibold leading-tight sm:leading-6 text-gray-900">
          {title}
        </h3>
      </div>

      {/* Stats */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="font-inter text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
            {number.toLocaleString()}
          </div>
          <div
            className={`font-inter text-[10px] sm:text-xs md:text-sm font-medium ${
              isPositiveChange ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositiveChange ? "+" : ""}
            {change.toFixed(2)}%
          </div>
        </div>
        <div className="font-inter text-[10px] sm:text-xs md:text-sm font-semibold text-primary">
          {percentage.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
