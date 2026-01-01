"use client";
import * as React from "react";
import { Divide, TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/src/@/components/chart";
export const description = "A donut chart with text";
// const chartData = [
//   { browser: " Online Appointments", visitors: 275, fill: "#4338CA" },
//   { browser: "Offline Appointments", visitors: 200, fill: "#4338CA" },
//   // { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
//   // { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   // { browser: "other", visitors: 190, fill: "var(--color-other)" },
// ];
// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   chrome: {
//     label: "Chrome",
//     color: "hsl(var(--chart-1))",
//   },
//   safari: {
//     label: "Safari",
//     color: "hsl(var(--chart-2))",
//   },
//   // firefox: {
//   //   label: "Firefox",
//   //   color: "hsl(var(--chart-3))",
//   // },
//   // edge: {
//   //   label: "Edge",
//   //   color: "hsl(var(--chart-4))",
//   // },
//   // other: {
//   //   label: "Other",
//   //   color: "hsl(var(--chart-5))",
//   // },
// } satisfies ChartConfig;

const DashboardCard = ({
  title,
  number,
  change,
  percentage,
  bgColor,
  borderColor,
  // incrementInOnlineAppointment,
}: {
  title: string;
  number: number;
  change: number;
  percentage: number;
  bgColor: string;
  borderColor: string;
  // incrementInOnlineAppointment?: boolean;
}) => {
  // const totalVisitors = React.useMemo(() => {
  //   return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  // }, []);

  return (
    <div
      className={`flex w-full flex-col gap-8 rounded-xl border p-4 md:max-w-[270px] `}
      style={{ backgroundColor: bgColor, borderColor: borderColor }}
    >
      {/* line-1 */}
      <div className="flex w-full  items-center justify-between ">
        <div className="font-inter text-base font-semibold leading-6 text-[#181818]">
          {title}
        </div>
        {/* <div className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.66667 2C8.40267 2 9 2.59733 9 3.33333C9 4.06933 8.40267 4.66667 7.66667 4.66667C6.93067 4.66667 6.33333 4.06933 6.33333 3.33333C6.33333 2.59733 6.93067 2 7.66667 2ZM9 7.99935C9 7.26335 8.40267 6.66602 7.66667 6.66602C6.93067 6.66602 6.33333 7.26335 6.33333 7.99935C6.33333 8.73535 6.93067 9.33268 7.66667 9.33268C8.40267 9.33268 9 8.73535 9 7.99935ZM9 12.6673C9 11.9313 8.40267 11.334 7.66667 11.334C6.93067 11.334 6.33333 11.9313 6.33333 12.6673C6.33333 13.4033 6.93067 14.0007 7.66667 14.0007C8.40267 14.0007 9 13.4033 9 12.6673Z"
              fill="#4D4D4D"
            />
          </svg>
        </div> */}
      </div>
      {/* line-2 */}
      <div className="flex w-full  items-center  justify-between ">
        <div className="flex items-center gap-4">
          <div className="font-inter text-xl font-semibold">{number}</div>
          <div className="font-inter text-sm font-medium text-secondary">
            {/* {incrementInOnlineAppointment ? (
              <div className="text-secondary"> &#37;{change}+</div>
            ) : (
              <div className="text-red-400">&#37;{change}-</div>
            )} */}
          {change.toFixed(2)}  &#37;
          </div>
        </div>
        <div className="font-inter text-xs font-semibold text-active">
          {percentage.toFixed(2)}&#37;
        </div>
        {/* <div className="w-[60px] ">
       <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
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
       </div> */}
      </div>
    </div>
  );
};

export default DashboardCard;
