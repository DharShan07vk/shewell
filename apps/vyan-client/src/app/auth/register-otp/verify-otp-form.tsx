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
    console.log("otp", data.otp);
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

  const [timer, setTimer] = React.useState(30);
  const [canResend, setCanResend] = React.useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOTP = () => {
    if (!canResend) return;
    setCanResend(false);
    setTimer(30);
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
        className="flex flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] md:px-[50px] md:py-10 2xl:px-[97px]"
      >
        <div className="font-poppins text-xl font-semibold text-[#333333]">
          Enter OTP*
        </div>
        <div className="my-6">
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
                    <InputOTPGroup className="mx-auto gap-2">
                      <InputOTPSlot
                        index={0}
                        className="rounded-lg border-gray-200 bg-gray-50 font-poppins text-lg transition-all focus:border-[#00898F] focus:bg-white"
                      />
                      <InputOTPSlot
                        index={1}
                        className="rounded-lg border-gray-200 bg-gray-50 font-poppins text-lg transition-all focus:border-[#00898F] focus:bg-white"
                      />
                      <InputOTPSlot
                        index={2}
                        className="rounded-lg border-gray-200 bg-gray-50 font-poppins text-lg transition-all focus:border-[#00898F] focus:bg-white"
                      />
                      <InputOTPSlot
                        index={3}
                        className="rounded-lg border-gray-200 bg-gray-50 font-poppins text-lg transition-all focus:border-[#00898F] focus:bg-white"
                      />
                      <InputOTPSlot
                        index={4}
                        className="rounded-lg border-gray-200 bg-gray-50 font-poppins text-lg transition-all focus:border-[#00898F] focus:bg-white"
                      />
                      <InputOTPSlot
                        index={5}
                        className="rounded-lg border-gray-200 bg-gray-50 font-poppins text-lg transition-all focus:border-[#00898F] focus:bg-white"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                  {errors && errors.otp && (
                    <p className="mt-2 text-center text-sm text-red-500">
                      {errors.otp.message}
                    </p>
                  )}
                </>
              );
            }}
          />
        </div>
        <div className="text-center">
          <button
            type="button"
            disabled={!canResend}
            className={`font-poppins text-sm font-medium ${
              canResend
                ? "cursor-pointer text-[#00898F] hover:underline"
                : "cursor-not-allowed text-[#00898F]"
            }`}
            onClick={handleResendOTP}
          >
            {canResend ? "Resend OTP" : `Resend OTP in ${timer}s`}
          </button>
        </div>

        <Button
          //   onClick={() => router.push("/auth/login")}
          className="my-6 w-full rounded-xl py-6 font-poppins text-base font-semibold md:w-[324px]"
          variant="OTP"
          type="submit"
        >
          Verify
        </Button>
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
