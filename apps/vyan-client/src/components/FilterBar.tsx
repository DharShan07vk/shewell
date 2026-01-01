"use client";
import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { Badge } from "../components/ui/badge";

interface FilterBarProps {
  onlyOnlineCourses?: boolean;
  freeSessions?: boolean;
}

export const FilterBar = ({
  onlyOnlineCourses = false,
  freeSessions = false,
}: FilterBarProps): JSX.Element => {
  const [isOnlineCourses, setIsOnlineCourses] = useState(onlyOnlineCourses);
  const [isFreeSessions, setIsFreeSessions] = useState(freeSessions);

  const [selectedFilters, setSelectedFilters] = useState<string[]>([
    "Label",
    "Label",
    "Label",
    "Label",
    "Label",
    "Label",
  ]);

  const handleRemoveFilter = (index: number) => {
    setSelectedFilters(selectedFilters.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full space-y-6">
      {/* CENTERED FILTER BAR */}
      <div className="flex justify-center">
        <div className="inline-flex items-center rounded-2xl bg-gray-300 px-6 py-3 text-sm">
          <FilterToggle
            label="Only Online Courses"
            enabled={isOnlineCourses}
            onClick={() => setIsOnlineCourses(!isOnlineCourses)}
          />

          <Divider />

          <FilterItem label="Category" />
          <Divider />
          <FilterItem label="Trimester" />
          <Divider />
          <FilterItem label="Time" />
          <Divider />
          <FilterItem label="Date" />

          <Divider />

          <FilterToggle
            label="Free sessions"
            enabled={isFreeSessions}
            onClick={() => setIsFreeSessions(!isFreeSessions)}
          />
        </div>
      </div>

      {/* FILTERS APPLIED */}
      <div className="m-24 rounded-xl border bg-white px-6 py-4">
        <div className="mb-3 text-xs font-medium text-black">
          Filters Applied
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filter, index) => (
              <Badge
                key={index}
                variant="outline"
                className="rounded-md px-3 py-1 text-sm text-black"
              >
                {filter}
                <button
                  onClick={() => handleRemoveFilter(index)}
                  className="ml-2 text-black hover:text-gray-600"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>

          {selectedFilters.length === 0 && (
            <span className="text-sm text-gray-400">No results found</span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------ Helpers ------------------ */

const Divider = () => <span className="mx-4 h-6 w-px bg-gray-300" />;

const FilterItem = ({ label }: { label: string }) => (
  <button className="flex items-center gap-1 text-black  hover:text-gray-600">
    {label}
    <ChevronUp size={14} />
  </button>
);

const FilterToggle = ({
  label,
  enabled,
  onClick,
}: {
  label: string;
  enabled: boolean;
  onClick: () => void;
}) => (
  <div className="flex items-center gap-3">
    <span className="text-black">{label}</span>
    <button
      onClick={onClick}
      className={`relative h-5 w-9 rounded-full transition ${
        enabled ? "bg-green-600" : "bg-gray-600"
      }`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${
          enabled ? "left-4" : "left-1"
        }`}
      />
    </button>
  </div>
);
