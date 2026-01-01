"use client";

import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import TestimonialCarousel from "../logo-swiper";
import { useSession } from "next-auth/react";

import { useState } from "react";

// import SignUpStepper from "../components/stepper";
// import StepperComponent from "../components/stepper";

const steps = [
 { title : 'Personal Information'},
  {title : 'Qualifications'},
  {title : 'Modes'},
  {title : 'Uploads'}
]
const LoginLayout = ({ children }: { children: React.ReactNode }) => {
 const [step, setStep] = useState<number>(1)
  return (
    <>
      <div className="w-full">
        <div className="mb-[50px]">{/* <Header /> */}</div>
        <div className="container mx-auto ">
          {/* 1-s */}

          {/* 2-s */}

          <div className=" mt-5 flex flex-col gap-5 md:gap-[53px]  lg:flex-row xl:gap-[60px] 2xl:gap-[198px]">
            {/* form */}

            <div className="lg:basis-1/2 lg:self-center">
              {/* <StepperComponent/> */}
              {/* <Suspense>
                <SessionProvider>{children}</SessionProvider>
              </Suspense> */}
              {/* <Stepper  setStep={setStep} steps={steps}/> */}
            {children}
            </div>

            {/* text + image */}
            <div className="flex flex-col items-center lg:self-center  lg:order-first lg:basis-1/2 ">
              <div className="mb-[7px] text-center	font-poppins text-[21.46px]  font-bold  leading-[27.9px] md:text-[24px] md:leading-8 xl:mb-3 xl:text-[40px] xl:leading-[52px] 2xl:text-[41px] 2xl:leading-[54px]">
                Provide wellness virtuality{" "}
              </div>
              <div className="text-center font-poppins text-xs font-normal md:px-[80px] md:text-sm xl:text-2xl 2xl:px-[150px]">
                Provide best services to your client with SheWellCare
              </div>

              <TestimonialCarousel />

              <div className=" hidden md:block">
                <div className="mb-1 mt-[50px] font-inter text-sm font-normal 2xl:text-base">
                  By proceeding, you agree to the{" "}
                  <Link href="/terms" target="_blank" className="text-primary">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" target="_blank" className="text-primary">
                    Privacy Policy
                  </Link>
                </div>
                <div className="flex justify-center gap-6">
                  <Link href={""}>Help</Link>
                  <Link href={""}>Privacy</Link>
                  <Link href={""}>Terms</Link>
                </div>
              </div>
            </div>
          </div>

          {/* 3-s */}

          <div className=" md:hidden ">
            <div className="mb-1 mt-[50px] font-inter text-sm font-normal 2xl:text-base">
              By proceeding, you agree to the{" "}
              <Link href="#" className="text-primary">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-primary">
                Privacy Policy
              </Link>
            </div>
            <div className="flex justify-center gap-6">
              <Link href={""}>Help</Link>
              <Link href={""}>Privacy</Link>
              <Link href={""}>Terms</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[50px]">{/* <Footer /> */}</div>
    </>
  );
};

export default LoginLayout;
