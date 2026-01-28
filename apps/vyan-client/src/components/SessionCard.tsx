"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Clock, IndianRupee } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { InteractiveButton } from "../components/ui/interactive-button";

interface SessionCardProps {
  imageUrl?: string;
  language?: string;
  isOnline?: boolean;
  hasRecording?: boolean;
  sessionDate: string;
  sessionTime: string;
  title: string;
  description: string;
  date: string;
  price: number;
  timeSlot: string;
  detailPath?: string;
}

export const SessionCard: React.FC<SessionCardProps> = ({
  imageUrl,
  language = "English",
  isOnline = true,
  hasRecording = true,
  sessionDate,
  sessionTime,
  title,
  description,
  date,
  price,
  timeSlot,
  detailPath,
}) => {
  
  return (
    <div className="group relative flex flex-col sm:flex-row items-stretch sm:items-center gap-4 rounded-xl px-4 sm:px-6 py-4 shadow-md transition-all duration-300 ease-in-out hover:outline hover:outline-2 hover:outline-[#00898F]">
      {/* Date Box - Left */}
      <div className="flex sm:flex-shrink-0 flex-row sm:flex-col items-center justify-center rounded-lg bg-gradient-to-b from-[#00898F] to-[#006B70] px-4 sm:px-3 py-2 sm:py-4 text-white sm:min-w-[70px] gap-2 sm:gap-0">
        <div className="text-xs sm:text-xs uppercase font-semibold order-2 sm:order-1">{new Date(sessionDate).toLocaleString('default', { month: 'short' })}</div>
        <div className="text-2xl sm:text-2xl font-bold order-1 sm:order-2">{new Date(sessionDate).getDate()}</div>
      </div>

      {/* Image Thumbnail */}
      <div className="hidden sm:block h-32 w-64 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gray-300" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* <p className="max-w-2xl text-sm leading-relaxed text-gray-600">
            {description}
        </p> */}

        <div className="my-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
          <Badge className="bg-[#E1EBED] text-[#00898F]"> {language} </Badge>

          {isOnline && (
              <Badge className="bg-green-50 text-green-700">
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-green-500" />
                Online
              </Badge>
          )}

          {hasRecording && (
              <Badge className="bg-gray-50 text-gray-700">
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-red-500" />
                Recording
              </Badge>
          )}

        </div>

        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{title}</h2>

        <p className="max-w-2xl text-sm leading-relaxed text-gray-600"> {description} </p>

        <div className="mt-1 flex flex-wrap gap-2">
          <InfoChip icon={<IndianRupee />} label={`${price}`} />
          <InfoChip icon={<Clock />} label={timeSlot} />
        </div>

      </div>

      {/* Action Button & Registration Text - Right */}
      <div className="flex flex-shrink-0 flex-row sm:flex-col items-center justify-center sm:justify-start gap-2">
        {detailPath && (
          <Link href={detailPath} aria-label="Register for Session">
            <InteractiveButton className="shadow-lg hover:bg-[#E1EBED]" />
          </Link>
        )}
      </div>
    </div>
  );
};

const InfoChip = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="flex items-center gap-2 rounded-md bg-gray-50 px-2 py-2 text-sm text-gray-700">
    <span className="text-teal-600">{icon}</span>
    {label}
  </div>
)