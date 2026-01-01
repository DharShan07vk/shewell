"use client";
import { Button } from "@repo/ui/src/@/components/button";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useSearchParams } from "next/navigation";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@repo/ui/src/@/components/input-otp";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import verifyOtpAction from "./verify-otp-action";
import { useToast } from "@repo/ui/src/@/components/use-toast";

import resendOTP from "./resend-otp-action";
import React from "react";

const formSchema = z.object({
  otp: z
    .string({ required_error: "Please enter your otp" })
    .min(6, { message: "Please enter the 6 digit otp" }),
});

interface IFormSchema {
  otp: string;
}

const VerifyOTPForm = ({ verifiedAt }: { verifiedAt: Date }) => {
  // const form = useForm<IFormSchema>();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { toast } = useToast();
  const session = useSession();
  const router = useRouter();
  // console.log("session", session)

  if (verifiedAt) {
    redirect("/");
  }
  if (session.status === "unauthenticated") {
    redirect("/auth/login");
  }
  const onSubmit = (data: IFormSchema) => {
    console.log("otp",data.otp);
    const verifyData = {
      // email: email!,
      otp: data.otp,
    };

    verifyOtpAction(verifyData)
      .then((resp) => {
        toast({
          title: resp?.message,
          variant: "default",
        });
        console.log("", resp?.message);
        router.push(`/`);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
  };

  const handleResendOTP = () => {
    resendOTP()
      .then(async (resp) => {
        toast({
          title: resp?.message,
          variant: "default",
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
  };
  console.log("email", session);
  return (
    <>
      <Button
        onClick={() => router.back()}
        className="mb-[50px] rounded-md bg-[#ECECEC80] p-[10px] text-black hover:bg-[#ECECEC80]"
      >
        <svg
          className="mr-1"
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 13L1 7L7 1"
            stroke="#121212"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Back
      </Button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center rounded-md border-2 border-primary p-4 md:px-[50px] md:py-6 2xl:px-[97px] "
      >
        <div className="font-poppins text-base font-normal">Enter OTP*</div>
        <div className="my-2">
          <Controller
            control={control}
            name="otp"
            render={({ field }) => {
              return (
                <>
                  {" "}
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <InputOTPGroup className="mx-auto">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  {errors && errors.otp && (
                    <p className="text-red-500">{errors.otp.message}</p>
                  )}
                </>
              );
            }}
          />
        </div>
        <div className="text-center">
          <div
            className="cursor-pointer font-poppins text-sm font-medium text-primary"
            onClick={() => handleResendOTP()}
          >
            {" "}
            Resend OTP
          </div>
        </div>

        <Button
          //   onClick={() => router.push("/auth/login")}
          className="mb-4 mt-6 w-[240px] md:my-8"
          variant="OTP"
          type="submit"
        >
          Verify
        </Button>

        <div className="text-center font-inter text-base font-normal">
          Already have a account
          <Link
            className="ml-4 mt-2 block font-poppins text-base font-medium text-primary md:mt-0 md:inline"
            href="/auth/login"
          >
            Login{" "}
            <svg
              className="inline"
              width="15"
              height="8"
              viewBox="0 0 15 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.13634 3.36357L12.3273 3.36357L10.2318 1.26807C9.98332 1.01959 9.98332 0.616643 10.2318 0.368122C10.4803 0.119643 10.8833 0.119643 11.1318 0.368122L14.3136 3.54994C14.5621 3.79842 14.5621 4.20136 14.3136 4.44989L11.1318 7.6317C11.0075 7.75596 10.8447 7.81812 10.6818 7.81812C10.5189 7.81812 10.3561 7.75596 10.2318 7.6317C9.98332 7.38322 9.98332 6.98028 10.2318 6.73176L12.3273 4.6363L1.13634 4.6363C0.7849 4.6363 0.499979 4.35138 0.499979 3.99993C0.499979 3.64849 0.7849 3.36357 1.13634 3.36357Z"
                fill="#00898F"
              />
            </svg>
          </Link>
        </div>
      </form>
      <div className="mt-[45px] hidden md:block">
        <div className="mb-1 font-inter text-sm font-normal 2xl:text-base">
          By proceeding, you agree to the{" "}
          <Link
            href="#"
            className="font-inter text-sm font-normal text-primary 2xl:text-base"
          >
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="font-inter text-sm font-normal text-primary 2xl:text-base"
          >
            Privacy Policy
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link
            className="font-inter text-sm font-normal 2xl:text-base"
            href={""}
          >
            Help
          </Link>
          <Link
            className="font-inter text-sm font-normal 2xl:text-base"
            href={""}
          >
            Privacy
          </Link>
          <Link
            className="font-inter text-sm font-normal 2xl:text-base"
            href={""}
          >
            Terms
          </Link>
        </div>
      </div>
    </>
  );
};
export default VerifyOTPForm;
