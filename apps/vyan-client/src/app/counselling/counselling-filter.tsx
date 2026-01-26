"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/src/@/components/select";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/src/@/components/dialog";
import { Calendar } from "@repo/ui/src/@/components/calendar";
import Multiselect from "multiselect-react-dropdown";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@repo/ui/src/@/components/checkbox";
import { format } from "date-fns";
import { Button } from "@repo/ui/src/@/components/button";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/src/@/components/popover";

interface ILanguageProps {
  id: string;
  language: string;
}
const CounsellingFilter = ({
  onSelectSpecialisation,
  onSelectDate,
}: {
  onSelectSpecialisation: (value: string) => void;
  onSelectDate: (value: Date) => void;
}) => {
  /* State */
  const [dateDialog, setDateDialog] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  /* Derived State from URL */
  const selectedDateParam = searchParams.get("selectedDate");
  const selectedDate = selectedDateParam
    ? new Date(selectedDateParam)
    : undefined;

  const getLanguageIds = searchParams.get("languageId");
  const languageIdArray = getLanguageIds ? getLanguageIds.split(",") : [];

  const getSpecialisationId = searchParams.get("specialisationId") || "";

  /* Local state for Search Input */
  const [searchTherapist, setSearchTherapist] = useState<string>(
    searchParams.get("therapistSearch") || "",
  );

  /* Sync search input with URL changes (e.g. Back button or Clear All) */
  useEffect(() => {
    setSearchTherapist(searchParams.get("therapistSearch") || "");
  }, [searchParams]);

  /* Handlers */
  const handleSpecialisationChange = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    console.log("value", value);
    if (value && value !== "All") {
      current.set("specialisationId", value);
    } else {
      current.delete("specialisationId");
    }
    router.push(`${pathname}?${current.toString()}`);
    onSelectSpecialisation(value === "All" ? "" : value);
  };

  const handleDateSelect = (value: Date) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("selectedDate", value.toDateString());
    router.push(`${pathname}?${current.toString()}`);
    setDate(value); // Update calendar internal state
    onSelectDate(value);
  };

  const handleLanguageChange = (checked: boolean, id: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    let newIds = [...languageIdArray];
    if (checked) {
      newIds.push(id);
    } else {
      newIds = newIds.filter((item) => item !== id);
    }

    if (newIds.length > 0) {
      current.set("languageId", newIds.join(","));
    } else {
      current.delete("languageId");
    }
    router.push(`${pathname}?${current.toString()}`);
  };

  const handleSearch = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (searchTherapist.trim()) {
      current.set("therapistSearch", searchTherapist.trim());
    } else {
      current.delete("therapistSearch");
    }
    router.push(`${pathname}?${current.toString()}`);
    window.history.pushState(null, "", `${pathname}?${current.toString()}`);
  };

  // Calendar internal state
  const [date, setDate] = useState<Date | undefined>(
    selectedDate || new Date(),
  );

  // fetch specialisations
  const { data: specialisations } =
    api.searchSpecialization.searchSpecialization.useQuery();

  // converting specialisation from {id, specialisation} to {value, label}
  const formatSpecialisation = specialisations?.specializations.map((a) => ({
    value: a.id,
    label: a.specialization,
  }));

  const { data: languages } = api.searchLanguages.searchLanguage.useQuery();

  const handleClearFilters = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete("languageId");
    current.delete("specialisationId");
    current.delete("selectedDate");
    current.delete("therapistSearch");

    router.push(`${pathname}?${current.toString()}`);
    // window.history.pushState(null, "", `${pathname}?${current.toString()}`);
    // Reset local UI states
    onSelectSpecialisation("");
    setDate(new Date());
    setSearchTherapist("");
  };

  // getting today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const disabledDays = { before: today };
  return (
    <>
      <div className="w-full space-y-6 font-poppins">
        {/* Search Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:max-w-lg">
            <div className="relative flex w-full items-center gap-2">
              <input
                value={searchTherapist}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTherapist(e.target.value)
                }
                className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3 pl-12 text-sm font-medium text-[#333333] shadow-sm outline-none transition-all placeholder:text-[#999999] hover:border-[#00898F] focus:border-[#00898F] focus:ring-1 focus:ring-[#00898F]"
                placeholder="Search by therapist name..."
                type="text"
                name="therapist"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Button
                className="hidden rounded-xl bg-[#00898F] px-6 py-3 font-medium text-white hover:bg-[#007a80] md:flex"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>

          {/* Sort Section - kept clean */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[#666666]">Sort by:</span>
            <Select>
              <SelectTrigger className="w-[160px] rounded-xl border-gray-200 bg-white text-sm font-medium text-[#333333]">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-100 bg-white p-1 shadow-lg">
                <SelectItem
                  className="cursor-pointer rounded-lg px-2 py-1.5 hover:bg-gray-50"
                  value="asc"
                >
                  Low to High
                </SelectItem>
                <SelectItem
                  className="cursor-pointer rounded-lg px-2 py-1.5 hover:bg-gray-50"
                  value="desc"
                >
                  High to Low
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filter Bar - Pill Style matching Session Page */}
        <div className="flex w-full items-center justify-center">
          <div className="inline-flex w-full flex-wrap items-center gap-4 rounded-3xl bg-[#F5F5F5] px-6 py-3 md:w-auto">
            {/* Languages Filter */}
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-1 text-black hover:text-gray-600">
                    Languages
                    <ChevronDown size={14} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64 gap-4 bg-white">
                  {languages?.languages.map((item) => (
                    <div
                      key={item.id}
                      className="pointer-events-auto cursor-pointer rounded-lg hover:bg-gray-50"
                      onClick={() => {
                        languageIdArray.includes(item.id)
                          ? handleLanguageChange(false, item.id)
                          : handleLanguageChange(true, item.id);
                      }}
                    >
                      {languageIdArray.includes(item.id) ? "✓ " : ""}
                      {item.language}
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
            <div className="h-6 w-px bg-gray-300"></div>

            {/* Specialization Filter */}

            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-1 text-black hover:text-gray-600">
                  Specialization
                  <ChevronDown size={14} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 gap-4 bg-white">
                {formatSpecialisation?.map((item) => (
                  <div
                    key={item.value}
                    className="pointer-events-auto cursor-pointer rounded-lg hover:bg-gray-50"
                    onClick={() => {
                      getSpecialisationId === item.value
                        ? handleSpecialisationChange("")
                        : handleSpecialisationChange(item.value);
                    }}
                  >
                    {getSpecialisationId === item.value ? "✓ " : ""}
                    {item.label}
                  </div>
                ))}
              </PopoverContent>
            </Popover>
            <div className="h-6 w-px bg-gray-300"></div>

            {/* Date Filter */}
            <div className="flex items-center gap-2">
              <Dialog open={dateDialog} onOpenChange={setDateDialog}>
                <DialogTrigger className="flex items-center gap-1 text-sm font-medium text-[#333333] hover:text-[#00898F]">
                  <span>Date</span>
                </DialogTrigger>
                <DialogContent className="rounded-3xl border-none bg-white p-6 shadow-2xl">
                  <Calendar
                    disabled={disabledDays}
                    mode="single"
                    selected={date}
                    onSelect={(e) => {
                      setDate(e);
                      if (e) handleDateSelect(e);
                      setDateDialog(false);
                    }}
                    className="rounded-md border-none"
                  />
                </DialogContent>
              </Dialog>
              <ChevronDown size={14} className="text-[#666666]" />
            </div>

            <div className="h-6 w-px bg-gray-300"></div>

            {/* Clear Filters */}
            <button
              onClick={handleClearFilters}
              className="text-sm font-medium text-red-500 transition-colors hover:text-red-600"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default CounsellingFilter;
