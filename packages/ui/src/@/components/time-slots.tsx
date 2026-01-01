"use client";
// import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";

import React, { useState } from "react";

interface TimeSlotsMap {
  [key: string]: string[];
}

interface Props {
  timeSlotsMap: TimeSlotsMap;
}

function TimeSlotCarousel({ timeSlotsMap }: Props) {
  const firstKey = Object.keys(timeSlotsMap)[0];
  const [selectedTimeSlots, setSelectedTimeSlots] = useState(timeSlotsMap[firstKey]);

  const handleItemClick = (timeSlots: string[]) => {
    setSelectedTimeSlots(timeSlots);
  };

  return (
    <div className="w-full md:w-[350px] lg:w-[518px] 2xl:w-[646px]">
      <Carousel
        opts={{
          align: "start",
        }}
       
      >
        <CarouselContent>
          {Object.entries(timeSlotsMap).map(([label, timeSlots]) => (
            <CarouselItem
              className=" font-inter font-normal	 text-sm 2xl:text-base mt-[10px] mb-4 md:mb-[18px] cursor-pointer"
              key={label}
              onClick={() => handleItemClick(timeSlots)}
            >
              {label}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex gap-[18px]">
        {selectedTimeSlots && selectedTimeSlots.map((item, index) => (
          <div
            className="py-1 px-2 text-black border border-primary rounded-md hover:text-white hover:bg-primary"
            key={index}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimeSlotCarousel;
