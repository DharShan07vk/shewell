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
  return (
    <>
      <div className="block font-poppins lg:hidden">
        <div className="relative flex flex-row items-center justify-between px-2">
          {/* Progress Line Background */}
          <div className="absolute left-0 top-[18px] -z-10 h-[2px] w-full bg-gray-100" />

          {/* Progress Line Active */}
          <div
            className="absolute left-0 top-[18px] -z-10 h-[2px] bg-[#00898F] transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />

          {steps.map((item, index) => {
            const isCompleted = currentStep > index + 1;
            const isActive = currentStep === index + 1;

            return (
              <div key={index} className="flex flex-col items-center gap-1">
                <div
                  onClick={() => {
                    if (index < currentStep - 1) {
                      setStep(index + 1);
                    }
                  }}
                  className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isCompleted
                      ? "border-[#00898F] bg-[#00898F] text-white"
                      : isActive
                        ? "border-[#00898F] bg-white text-[#00898F]"
                        : "border-gray-200 bg-white text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <span className="text-sm font-bold">&#10003;</span>
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pl-2 text-center text-lg font-semibold text-[#333333]">
          {steps[currentStep - 1]?.title}
        </div>
      </div>

      <div className="hidden font-poppins lg:block">
        <div className="relative flex flex-col gap-10">
          {steps.map((item, index) => {
            const isCompleted = currentStep > index + 1;
            const isActive = currentStep === index + 1;

            return (
              <div key={index} className="relative flex items-center gap-4">
                {/* Vertical Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute left-[18px] top-9 h-full w-[2px] -translate-x-1/2 rounded-full ${isCompleted ? "bg-[#00898F]" : "bg-gray-100"}`}
                    style={{ height: "40px" }}
                  />
                )}

                <div
                  className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isCompleted
                      ? "border-[#00898F] bg-[#00898F] text-white"
                      : isActive
                        ? "border-[#00898F] bg-[#F2F9F9] text-[#00898F] shadow-sm"
                        : "border-gray-200 bg-white text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <span className="text-sm font-bold">&#10003;</span>
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>

                <div
                  onClick={() => {
                    if (index < currentStep - 1) {
                      setStep(index + 1);
                    }
                  }}
                  className={`cursor-pointer text-base font-medium transition-colors ${
                    isActive
                      ? "font-semibold text-[#00898F]"
                      : isCompleted
                        ? "text-[#333333]"
                        : "cursor-not-allowed text-[#999999]"
                  }`}
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
