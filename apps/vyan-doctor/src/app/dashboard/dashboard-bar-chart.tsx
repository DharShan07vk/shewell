"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend,ResponsiveContainer, LineChart,Line  } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/src/@/components/chart";
import Image from "next/image";

export const description = "A multiple bar chart";
const chartData = [
  { week: "Week 1", BookedSlots: 186, VacantSlots: 80 },
  { week: "Week 2", BookedSlots: 305, VacantSlots: 200 },
  { week: "Week 3", BookedSlots: 237, VacantSlots: 120 },
  { week: "Week 4", BookedSlots: 73, VacantSlots: 190 },
];
const chartConfig = {
  BookedSlots: {
    label: "Booked Slots",
    color: "hsla(153, 100%, 28%, 1)",
  },
  VacantSlots: {
    label: "Vacant Slots",
    color: "hsla(0, 0%, 56%, 1)",
  },
} satisfies ChartConfig;
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const DashboardBarChart = () => {
  return (
    <div className="mt-[12px] flex flex-col gap-2 md:flex-row md:items-center lg:mt-[29px] lg:gap-[14px] xl:gap-[12px] 2xl:gap-4">
      {/* bar-chart */}
      <div className="mb-9 w-full">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="BookedSlots"
              fill="var(--color-BookedSlots)"
              radius={4}
            />
            <Bar
              dataKey="VacantSlots"
              fill="var(--color-VacantSlots)"
              radius={4}
            />
            <Legend />
          </BarChart>
        </ChartContainer>
      </div>
      {/* increasing and decreasing chart */}
      <div className="flex flex-wrap items-center justify-center gap-8 ">
        <div className="flex flex-col items-center justify-center">
          {/* <div className="relative aspect-[136/42] w-[136px]">
            <Image
              src={"/images/Increasing-chart.png"}
              fill={true}
              className="object-cover"
              alt="increasing-chart"
            />
          </div> */}
          <ResponsiveContainer className="aspect-[136/42] w-full">
            <LineChart width={500} height={200} data={data}>
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#2AA852"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mb-[6px] mt-4 text-center font-inter text-xl font-semibold text-active">
            Morning Slot
          </div>
          <div className="font-inter text-lg font-normal text-[#434343]">
            Most Sold Slot
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          {/* <div className="relative aspect-[136/42] w-[136px]">
            <Image
              src={"/images/Decreasing-chart.png"}
              fill={true}
              className="object-cover"
              alt="increasing-chart"
            />
          </div> */}
           <ResponsiveContainer className="w-full aspect-[136/42]">
        <LineChart width={500} height={200} data={data}>
          <Line type="monotone" dataKey="pv" stroke="#CA0000" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
          <div className="mb-[6px] mt-4 text-center font-inter text-xl font-semibold text-active">
            Afternoon Slot
          </div>
          <div className="font-inter text-lg font-normal text-[#434343]">
            Least Sold Slot
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardBarChart;
