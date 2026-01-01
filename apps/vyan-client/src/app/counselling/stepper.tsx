// import { useState } from "react";

// // interface IText {
// //   text: string[];
// //   setStep: (step: number) => void;
// // }
// interface IStepperProps {
//   steps: { title: string }[];
//   currentStep: number;
//   setStep: (step: number) => void;
// }
// const Stepper = ({ steps, currentStep, setStep }: IStepperProps) => {
//   return (
//     <>
//       <div className="flex flex-col gap-[47px] ">
//         {steps.map((item, index) => {
//           return (
//             <>
//               <div className="flex items-center gap-1">
//                 <div
//                   className={`relative z-10 flex items-center justify-center rounded-[50%] bg-primary px-2 text-white
//                   `}
//                 >
//                   <div className="progress-bar absolute  w-full bg-primary">
//                     <div className="progress"></div>
//                   </div>
//                   {currentStep > index + 1 ? <span>&#10003;</span> : index + 1}
//                 </div>
//                 <div
//                   onClick={() => setStep(index + 1)}
//                   key={index}
//                   className="cursor-pointer font-poppins text-base font-medium text-[#656D78]"
//                 >
//                   {item.title}
//                 </div>
//               </div>
//             </>
//           );
//         })}
//       </div>
//     </>
//   );
// };
// export default Stepper;

import { useState } from "react";

interface IStepperProps {
  steps: { title: string }[];
  currentStep: number;
  setStep: (step: number) => void;
}

const Stepper = ({ steps, currentStep, setStep }: IStepperProps) => {
  const stepPercentage = 100 / steps.length;

  return (
    <>
      <div className="block lg:hidden">
        <div className="relative flex flex-row gap-[33px] pl-2">
          {steps.map((item, index) => {
            return (
              <>
                <div key={index} className="flex items-center gap-1">
                  <div
                    onClick={() => {
                      if (index < currentStep - 1) {
                        setStep(index + 1);
                      }
                    }}
                    className={`relative z-10 ${index < steps.length - 1 && "after:absolute  after:-right-[35px] after:top-[10px] after:w-9  after:border"} flex items-center justify-center rounded-[50%] border  border-gray-200 
              text-gray-500 ${currentStep > index + 1 ? " border-primary bg-primary px-[6px] text-white after:border-primary" : "] bg-white px-2 "}`}
                  >
                    {currentStep > index + 1 ? (
                      <span className="font-xs">&#10003;</span>
                    ) : (
                      index + 1
                    )}
                  </div>

                  {/* <div
                  onClick={() => {
                    if (index < currentStep - 1) {
                      setStep(index + 1);
                    }
                  }}
                  className={`cursor-pointer font-poppins text-base font-medium text-[#656D78] ${index < currentStep - 1 ? "" : "cursor-not-allowed"}`}
                >
                  {item.title}
                </div> */}
                </div>
              </>
            );
          })}
        </div>
        <div  className=" my-4 text-[16px] font-medium leading-[24px] text-active pl-2">
          {currentStep === 1 && "Select Service Mode"}
          {currentStep === 2 && "Select Expert"}
          {currentStep === 3 && "Select Date & Time"}
          {currentStep === 4 && "Patient Information"}
          {currentStep === 5 && "Appointment Approved"}
        </div>
      </div>
      <div className="hidden lg:block">
        <div className="relative flex flex-col gap-[47px]">
          {steps.map((item, index) => {
            return (
              <div key={index} className="flex items-center gap-1">
                <div
                  className={`relative z-10 ${index < steps.length - 1 && "after:absolute after:-bottom-6 after:-right-2 after:w-11 after:rotate-90 after:border"} flex items-center justify-center rounded-[50%] border  border-gray-200 
              text-gray-500 ${currentStep > index + 1 ? " border-primary bg-primary px-[6px] text-white after:border-primary" : "] bg-white px-2 "} ${currentStep === index + 1 ? 'border-primary bg-[#F2F9F9]':''}`}
                >
                  {currentStep > index + 1 ? (
                    <span className="font-xs">&#10003;</span>
                  ) : (
                   currentStep === index +1 ? <div className=" text-primary ">{index + 1}</div> : index +1
                  )}
                </div>
                <div
                  onClick={() => {
                    if (index < currentStep - 1) {
                      setStep(index + 1);
                    }
                  }}
                  className={`cursor-pointer font-poppins text-base font-medium text-[#656D78] ${index < currentStep - 1 ? "" : "cursor-not-allowed"}`}
                >
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Stepper;
