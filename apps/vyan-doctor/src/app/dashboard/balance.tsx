"use client";
import * as React from "react";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";
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
const Balance = ({balance} :{balance : number}) => {
  return (
    <div className="rounded-[9.37px] border border-[#DFE7EF] p-4 sm:p-6 xl:p-5 2xl:p-[26px] w-full">
      {/* balance and horizontal-ellipsis */}
      <div className="mb-[12px] flex justify-between 2xl:mb-6">
        <div className="font-inter text-sm font-medium text-active lg:text-lg 2xl:text-2xl">
          Balance
        </div>
        {/* <div className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3 12.5312C3 11.4273 3.896 10.5312 5 10.5312C6.104 10.5312 7 11.4273 7 12.5312C7 13.6353 6.104 14.5312 5 14.5312C3.896 14.5312 3 13.6353 3 12.5312ZM12 10.5312C10.896 10.5312 10 11.4273 10 12.5312C10 13.6353 10.896 14.5312 12 14.5312C13.104 14.5312 14 13.6353 14 12.5312C14 11.4273 13.104 10.5312 12 10.5312ZM19 10.5312C17.896 10.5312 17 11.4273 17 12.5312C17 13.6353 17.896 14.5312 19 14.5312C20.104 14.5312 21 13.6353 21 12.5312C21 11.4273 20.104 10.5312 19 10.5312Z"
              fill="black"
            />
          </svg>
        </div> */}
      </div>
      {/* chart */}
     <div className="flex flex-col gap-3 2xl:gap-[18px]">
     <div className="flex flex-col items-center justify-center">
      <ResponsiveContainer className="w-full aspect-[229/71]">
        <LineChart width={500} height={200} data={data}>
          <Line type="monotone" dataKey="pv" stroke="#2AA852" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <div className="text-black font-inter text-2xl font-semibold mt-3 mb-[3px]">INR {balance/100}</div>
      <div className="text-inactive text-center font-inter text-sm font-normal">Payment received from platform from active time </div>
      </div>
      {/* <div className="flex flex-col items-center justify-center">
      <ResponsiveContainer className="w-full aspect-[229/71]">
        <LineChart width={500} height={200} data={data}>
          <Line type="monotone" dataKey="pv" stroke="#CA0000" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <div className="text-red-500 font-inter text-2xl font-semibold mt-3 mb-[3px]">INR 90,000</div>
      <div className="text-inactive text-center font-inter text-sm font-normal">Deduction from total balance for appointment cancellation </div>
      </div> */}
     </div>
    </div>
  );
};

export default Balance;
