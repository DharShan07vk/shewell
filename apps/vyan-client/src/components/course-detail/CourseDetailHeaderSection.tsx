"use client";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Languages } from "lucide-react";

import { Media } from "@/types/media";

interface CourseDetailHeaderSectionProps {
  title: string;
  instructor: string;
  language: string;
  isOnline: boolean;
  hasRecording: boolean;
  date: string;
  banners: Media[];
  time: string;
}

export const CourseDetailHeaderSection = ({
  title,
  instructor,
  language,
  isOnline,
  hasRecording,
  banners,
  date,
  time,
}: CourseDetailHeaderSectionProps): JSX.Element => {
  return (
    <section className="w-full bg-[#F5F5F3] px-4 py-8 sm:px-6 sm:py-10 md:px-12 md:py-14">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:gap-8 md:gap-12 lg:flex-row">
        {/* LEFT CONTENT */}
        <div className="max-w-3xl">
          <h1 className="mb-2 text-2xl font-extrabold text-[#2E2E2E] sm:mb-3 sm:text-3xl md:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="mb-4 text-sm text-[#5E5E5E] sm:mb-5 sm:text-base md:mb-6 md:text-lg">with {instructor}</p>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Badge className="text-xs gap-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-gray-800 sm:text-sm sm:px-4 sm:py-2">
              <Languages size={14} />
              {language}
            </Badge>

            {isOnline && (
              <Badge className="text-xs flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 sm:text-sm sm:px-4 sm:py-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Online
              </Badge>
            )}

            {hasRecording && (
              <Badge className="text-xs rounded-full border border-gray-200 bg-white px-3 py-1.5 sm:text-sm sm:px-4 sm:py-2">
                Recording
              </Badge>
            )}
          </div>
        </div>

        {/* RIGHT – DATE & TIME DISPLAY */}
        <div className="flex w-full flex-col gap-2 sm:gap-3 md:gap-4 lg:w-auto lg:max-w-[360px]">
          {/* DATE CARD */}
          <div className="flex h-12 items-center justify-between rounded-full bg-white px-4 sm:h-14 sm:px-5 md:px-6">
            <span className="text-xs font-semibold text-teal-600 sm:text-sm md:text-base">{date}</span>
            <Calendar className="text-teal-600" size={18} />
          </div>

          {/* TIME CARD */}
          <div className="flex h-12 items-center justify-between rounded-full bg-white px-4 sm:h-14 sm:px-5 md:px-6">
            <span className="text-xs font-semibold text-teal-600 sm:text-sm md:text-base">{time}</span>
            <Clock className="text-teal-600" size={18} />
          </div>
        </div>
      </div>
    </section>
  );
};
