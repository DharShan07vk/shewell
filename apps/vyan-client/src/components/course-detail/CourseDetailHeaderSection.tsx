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
    <section className="w-full bg-[#F5F5F3] px-6 py-14 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-12 lg:flex-row">
        {/* LEFT CONTENT */}
        <div className="max-w-3xl">
          <h1 className="mb-3 text-[40px] font-extrabold text-[#2E2E2E] md:text-[48px]">
            {title}
          </h1>

          <p className="mb-6 text-lg text-[#5E5E5E]">with {instructor}</p>

          <div className="flex flex-wrap gap-3">
            <Badge className="text-md gap-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-gray-800">
              <Languages size={14} />
              {language}
            </Badge>

            {isOnline && (
              <Badge className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Online
              </Badge>
            )}

            {hasRecording && (
              <Badge className="rounded-full border border-gray-200 bg-white px-4 py-2">
                Recording
              </Badge>
            )}
          </div>
        </div>

        {/* RIGHT – DATE & TIME DISPLAY */}
        <div className="flex w-full max-w-[360px] flex-col gap-4">
          {/* DATE CARD */}
          <div className="flex h-[64px] items-center justify-between rounded-full bg-white px-6">
            <span className="font-semibold text-teal-600">{date}</span>
            <Calendar className="text-teal-600" size={22} />
          </div>

          {/* TIME CARD */}
          <div className="flex h-[64px] items-center justify-between rounded-full bg-white px-6">
            <span className="font-semibold text-teal-600">{time}</span>
            <Clock className="text-teal-600" size={22} />
          </div>
        </div>
      </div>
    </section>
  );
};
