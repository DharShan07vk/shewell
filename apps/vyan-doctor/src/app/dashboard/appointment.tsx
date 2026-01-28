import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/src/@/components/select";
import { Progress } from "@repo/ui/src/@/components/progress";
export const AppointmentCard = ({
  title,
  noOfAppointments,
  value,
  color,
  mainColor,
  backgroundColor
}: {
  title: string;
  noOfAppointments: string | undefined;
  value: number;
  color : string;
  mainColor: string;
  backgroundColor : string
}) => {

   
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="font-inter text-sm font-normal text-active sm:text-lg xl:text-base 2xl:text-xl">
            {title}
          </div>
         
          <div className={`font-inter text-sm font-normal  sm:text-lg xl:text-base 2xl:text-xl text-[${color}]`}>
            {noOfAppointments}
          </div>
        </div>
       
        <Progress className={mainColor} parentClass={backgroundColor} value={value} />
      </div>
    </>
  );
};

const appointments = [
    {
        title : "Total Appointments",
        noOfAppointments : "165,736",
        value: 80,
        mainColor : "bg-[#F59E0B]",
        backgroundColor : "bg-[#FEF3C7]"
    },
    {
        title : "Offline Appointments",
        noOfAppointments : "12,109",
        value: 30,
        mainColor : "bg-[#2563EB]",
         backgroundColor : "bg-[#BFDBFE]"
    },
    {
        title : "Online Appointments",
        noOfAppointments : "132,645",
        value: 69 ,
        mainColor : "bg-[#059669]",
         backgroundColor : "bg-[#A7F3D0]"
    },
    {
        title : "Completed Appointments",
        noOfAppointments : "145,109",
        value: 80,
        mainColor : "bg-[#4338CA]",
         backgroundColor : "bg-[#E0E7FF]"
    },
    {
        title : "Cancelled Appointments",
        noOfAppointments : "29",
        value: 10,
        mainColor : "bg-[#E11D48]",
         backgroundColor : "bg-[#FECDD3]"
    }
]
interface IAppointment {
  title : string;
  noOfAppointments : string | undefined;
  value : number;
  color : string;
  mainColor : string;
  backgroundColor : string
}
const Appointment = ({appointments}:{appointments : IAppointment[]}) => {
  return (
    <div className="rounded-2xl border border-gray-100 p-4 sm:p-6 xl:p-5 2xl:p-[26px] shadow-sm hover:shadow-md transition-shadow">
      {/* appointment and dropdown */}
      <div className="mb-[17px] flex items-center justify-between 2xl:mb-5 ">
        {/* appointment */}
        <div className="font-inter text-sm font-medium text-active lg:text-lg xl:text-[22px] 2xl:text-2xl">
          Appointment
        </div>
        {/* dropdown
        <div className="">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue className="text-[14px]" placeholder="Theme" />
            </SelectTrigger>
            <SelectContent className="bg-white ">
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </div>
      {/* appointment with progress */}
      <div className="flex flex-col gap-[17px] xl:gap-4 2xl:gap-5" >
        {
            appointments.map((item,index) => {
                return(
                    <>
                    <AppointmentCard backgroundColor={item.backgroundColor} mainColor={item.mainColor} noOfAppointments={item.noOfAppointments} title={item.title} value={item.value} color={item.color}/>
                    </>
                )
            })
        }
        
      </div>
    </div>
  );
};

export default Appointment;
