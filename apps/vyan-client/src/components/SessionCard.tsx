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
    <div
      className="
        /* ← replace color
        later */
        group relative flex
        gap-6
        rounded-xl bg-white px-6

        pb-6
        pt-14
        shadow-md   transition-all duration-300 ease-in-out hover:outline hover:outline-2 hover:outline-[#00898F]
      "
    >
      {/* Floating Arrow Button */}
      {detailPath && (
        <Link href={detailPath} aria-label="View course details">
          <InteractiveButton
            className="
              absolute right-6 top-4 z-20 shadow-lg
              group-hover:bg-[#E1EBED]
            "
          />
        </Link>
      )}

      {/* Image */}
      <div className="h-40 w-56 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
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
      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-3">
          {/* Tags */}
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-50 text-blue-700">{language}</Badge>

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

          <p className="text-xs font-medium text-teal-600">
            Session on {sessionDate} | {sessionTime}
          </p>

          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

          <p className="max-w-2xl text-sm leading-relaxed text-gray-600">
            {description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <InfoChip icon={<Calendar />} label={date}  />
          <InfoChip icon={<IndianRupee />} label={`₹ ${price}`} />
          <InfoChip icon={<Clock />} label={timeSlot} />
        </div>
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
  <div className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700">
    <span className="text-teal-600">{icon}</span>
    {label}
  </div>
);
