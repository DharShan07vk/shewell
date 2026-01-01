"use client";
import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Legend } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/src/@/components/chart";
export const description = "A donut chart with text";

interface ISpecializationParentCategory{
  name : string;
  percentage : string
  visitors : number
}
const chartData = [
  { issue: "Child issue", visitors: 275, fill: "#008F4E" },
  { issue: "Relationship Issues", visitors: 200, fill: "#2563EB" },
  { issue: "Tablet", visitors: 287, fill: "#67E8F9" },
  { issue: "Unknown", visitors: 173, fill: "#0EA5E9" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export const LegendPieChart = ({
  backgroundColor,
  issue,
  percentage
}: {
  backgroundColor: string;
  issue: string;
  percentage : string
}) => {
  return (
    <>
      <div className="flex items-center gap-[20px]">
        <div className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: backgroundColor,
            }}
          ></div>
          <div className="min-w-[85px] text-active font-inter font-normal text-xs 2xl:text-lg">{issue}</div>
        </div>
        <div className="text-active font-inter font-normal text-xs 2xl:text-lg">{percentage}%</div>
      </div>
    </>
  );
};

const DashboardPieChart = () => {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);
  return (
   <div className="w-full">
     <div className="w-full gap-10px flex flex-col items-center justify-center sm:flex-row">
      {/* chart */}
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px] w-full"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="visitors"
            nameKey="issue"
            innerRadius={60}
            strokeWidth={5}
          >
            <Legend />
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalVisitors.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Visitors
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      {/* profit and revenue */}
      <div className="flex flex-col gap-[18px]">
        {/* profit */}
        <div className="flex gap-[10px]">
          <div className="rounded-[4.653px] bg-[#EAFAF7] p-[9.31px]">
            <svg
              width="39"
              height="38"
              viewBox="0 0 39 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.867188"
                y="0.625"
                width="37.2261"
                height="37.2261"
                rx="4.65327"
                fill="#EAFAF7"
              />
              <g clip-path="url(#clip0_4471_111742)">
                <path
                  d="M27.2296 15.3594L20.6375 21.9515L16.7598 18.0738L11.7188 23.1148"
                  stroke="#008F4E"
                  stroke-width="1.55109"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22.5781 15.3594H27.2314V20.0126"
                  stroke="#008F4E"
                  stroke-width="1.55109"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_4471_111742">
                  <rect
                    width="18.6131"
                    height="18.6131"
                    fill="white"
                    transform="translate(10.1719 9.93164)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="text-xs font-normal text-[#434343]">
              Total Profit
            </div>
            <div className="text-xs font-semibold text-active">INR 38k</div>
          </div>
        </div>
        {/* revenue */}
        <div className="flex gap-[10px]">
          <div className="rounded-[4.653px] bg-[#EAFAF7] p-[9.31px]">
            <svg
              width="39"
              height="38"
              viewBox="0 0 39 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.867188"
                y="0.625"
                width="37.2261"
                height="37.2261"
                rx="4.65327"
                fill="#EAFAF7"
              />
              <g clip-path="url(#clip0_4471_111742)">
                <path
                  d="M27.2296 15.3594L20.6375 21.9515L16.7598 18.0738L11.7188 23.1148"
                  stroke="#008F4E"
                  stroke-width="1.55109"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22.5781 15.3594H27.2314V20.0126"
                  stroke="#008F4E"
                  stroke-width="1.55109"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_4471_111742">
                  <rect
                    width="18.6131"
                    height="18.6131"
                    fill="white"
                    transform="translate(10.1719 9.93164)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="text-xs font-normal text-[#434343]">
              Total Revenue
            </div>
            <div className="text-xs font-semibold text-active">INR 38k</div>
          </div>
        </div>
      </div>

     
    </div>
    {/* Legends */}
    <div className="flex items-center justify-center">
    <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-center gap-2 sm:gap-[40px] lg:mt-[22px] xl:mt-6 2xl:mt-8">
     <div className="flex flex-col gap-2">
         <LegendPieChart backgroundColor="#008F4E" issue="Child Issue" percentage="65"/>
         <LegendPieChart backgroundColor="#67E8F9" issue="Relationship Issue" percentage="45"/>
     </div>
     <div className="flex flex-col gap-2">
     <LegendPieChart backgroundColor="#2563EB" issue="Tablet" percentage="34"/>
     <LegendPieChart backgroundColor="#0EA5E9" issue="Unknown" percentage="12"/>
     </div>
   </div>
    </div>
   </div>
  );
};

export default DashboardPieChart;
