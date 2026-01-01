

"use client";
import UIFormInput from "@repo/ui/src/@/components/form/input";
import UIFormLabel from "@repo/ui/src/@/components/form/label";
import UIFormPasswordInput from "@repo/ui/src/@/components/form/password-input";
import { Controller, Form, useForm } from "react-hook-form";
import { Button } from "@repo/ui/src/@/components/button";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

import * as z from "zod";
import { Toaster } from "@repo/ui/src/@/components/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@repo/ui/src/@/components/use-toast";
import {
  ToastAction,
  ToastProvider,
  ToastViewport,
} from "@repo/ui/src/@/components/toast";
import { Toast } from "@repo/ui/src/@/components/toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/src/@/components/dialog";
import { useState } from "react";
import React from "react";
import { env } from "~/env";

const zodValidation = z.object({
  email: z
    .string({ required_error: "Please enter the email address" })
    .email({ message: "Please enter a valid Email Address" })
    .regex(new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i), {
      message: "Invalid Email",
    }),
  password: z
    .string({ required_error: "Please enter the password" })
    .min(8, { message: "Password must have 8 characters" }),
});

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof zodValidation>>({
    resolver: zodResolver(zodValidation),
  });
  const router = useRouter();
  const session = useSession();
  const { update } = session;
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");
  const { toast } = useToast();

  let errorMessage: string | undefined;
  if (error && error === "CredentialsSignin") {
    errorMessage = "Invalid email or password";
  }

  const USER = env.NEXT_PUBLIC_USER;
  const PROFESSIONAL = env.NEXT_PUBLIC_PROFESSIONAL

  const loginHandler = async ({
    email,
    password,
  }: z.infer<typeof zodValidation>) => {
    // "username-login" matches the id for the credential
    const signInData = await signIn("CrendentialsVyanClient", {
      email,
      password,
      redirect: false,
    });

    

    if (signInData?.ok) {
      toast({
        title: "login Successfully",
        variant: "default",
      });
      update().then(() => {
        router.push("/");
      });
    } else {
      toast({
        title: "something went wrong",
        variant: "destructive",
      });
    }
  };

  const loginErrorHandler = (e: any) => {
    console.log("loginErrorHandler", e),
      (errorMessage = "Invalid Email or Password");
  };

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  return (
    <>
      {errorMessage && (
        <div
          className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}

      <div className="mb-6 text-center font-inter text-2xl font-semibold md:mb-8 md:text-left xl:mb-9 2xl:mb-[50px] 2xl:text-3xl">
        Login into your account
      </div>
      <form
        className="rounded-md border-2 border-primary p-4 md:p-6"
        onSubmit={handleSubmit(loginHandler, loginErrorHandler)}
      >
        <div className="flex flex-col gap-6">
          <div>
            <UIFormLabel className="">Email*</UIFormLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <UIFormInput
                      type="email"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter your email id"
                    />
                    {errors && errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </>
                );
              }}
            />
          </div>
          <div className="">
            <UIFormLabel>Password*</UIFormLabel>
            <Controller
              name="password"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <UIFormPasswordInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter your password"
                    />
                    {errors && errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </>
                );
              }}
            />
          </div>
          <Button
            className="mx-auto w-full md:w-[324px]"
            variant="OTP"
            type="submit"
          >
            Login
          </Button>

          <div className="text-center font-inter text-base font-normal">
            Don't have SheWellCare account
          <Link href="/auth/register">
          <div
            //  onClick={() => handleOpenDialog()} 
            className="ml-4 mt-2  block font-poppins text-base font-medium text-primary md:mt-0 md:inline cursor-pointer" >
              Create Account
              <svg
                className="ml-1 inline"
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
            </div>
          </Link>
          </div>
        </div>
      </form>

      <div className="mt-[45px] hidden md:block">
        <div className="mb-1 font-inter text-sm font-normal 2xl:text-base">
          By proceeding, you agree to the{" "}
          <Link
            href="/terms" target="_blank"
            className="font-inter text-sm font-normal text-primary 2xl:text-base"
          >
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="/" target="_blank"
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
            href="/terms" target="_blank"
          >
            Terms
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

