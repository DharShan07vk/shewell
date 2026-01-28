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
      className="flex w-full sm:w-[calc(50%-1rem)] md:max-w-[270px] lg:max-w-[280px] xl:max-w-[300px] flex-col gap-4 sm:gap-6 md:gap-8 rounded-2xl border p-4 md:p-5 transition-all hover:shadow-md"
      style={{ backgroundColor: bgColor, borderColor: borderColor }}
    >
      {/* Header */}
      <div className="flex w-full items-center justify-between">
        <h3 className="font-inter text-sm sm:text-base font-semibold leading-6 text-gray-900">
          {title}
        </h3>
      </div>

      {/* Stats */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="font-inter text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            {number.toLocaleString()}
          </div>
          <div
            className={`font-inter text-xs sm:text-sm font-medium ${
              isPositiveChange ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositiveChange ? "+" : ""}
            {change.toFixed(2)}%
          </div>
        </div>
        <div className="font-inter text-xs sm:text-sm font-semibold text-primary">
          {percentage.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
