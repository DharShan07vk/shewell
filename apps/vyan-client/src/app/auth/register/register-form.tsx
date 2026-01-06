"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import UIFormLabel from "@repo/ui/src/@/components//form/label";
import UIFormInput from "@repo/ui/src/@/components/form/input";
import UIFormPasswordInput from "@repo/ui/src/@/components/form/password-input";
import { Button } from "@repo/ui/src/@/components/button";
import RegisterUserAction from "./register-user-action";
import { Checkbox } from "@repo/ui/src/@/components/checkbox";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@repo/ui/src/@/components/use-toast";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { generateOtp } from "~/lib/utils";
import OTPDialog from "./otp-dialog";
import { useState } from "react";
import React from "react";

const zodValidation = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name is Required" }),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is Required" })
    .email({ message: "Please enter a valid Email address" })
    .regex(new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i), {
      message: "Invalid Email",
    }),
  age: z.literal(true, {
    errorMap: () => ({ message: "You must be above 18 years" }),
  }),
  password: z
    .string({ required_error: "Please enter the password" })
    .min(8, { message: "Password must have 8 characters" })
    .regex(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/i,
      ),
      {
        message:
          "Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character is required",
      },
    ),
  phoneNumber: z
    .string({ required_error: "Phone Number is required" })
    .min(1, { message: "Please Enter the Phone Number" })
    .max(10, { message: "Phone Number can have maximum 10 digits" })
    .regex(new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/), {
      message: "only Numeric Digits are allowed",
    }),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof zodValidation>>({
    resolver: zodResolver(zodValidation),
  });

  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openOTPDialog, setOpenOTPDialog] = useState<boolean>(false)
 

  const submitForm = async (data: z.infer<typeof zodValidation>) => {

    RegisterUserAction(data)
      .then(async(resp) => {
        const params = new URLSearchParams(searchParams);
        params.set("email", data.email);
        const loginResult = await signIn("CrendentialsVyanClient", {
          redirect: false,
          email: data.email,
          password: data.password,
        });
        if (!loginResult!.ok) {
          throw new Error("Failed to log in User");
        }
        toast({
          title: resp?.message,
          variant: "default",
        });

        router.push(`/auth/register-otp`);
    
        
        setOpenOTPDialog(true)
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
  };

  const onError = (error: unknown) => {
    console.log(error);
  };

  return (
    <>
      <div className=" mb-5 w-full text-center font-inter	text-[22px] font-semibold leading-[32px] md:mb-8 md:text-left xl:mb-9 2xl:mb-[50px] 2xl:text-3xl">
        Create your free account
      </div>
      <form
        onSubmit={handleSubmit(submitForm, onError)}
        noValidate={true}
        className="rounded-md border-2 border-primary p-4 md:p-6 "
      >
        <div className="flex flex-col gap-[18px] md:gap-5 xl:gap-6 ">

        <div>
            <UIFormLabel>Name*</UIFormLabel>
            <Controller
              name="name"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <UIFormInput
                      type="text"
                      {...field}
                      value={field.value}
                      placeholder="Enter your name"
                    />
                    {errors && errors.name && (
                      <p className="text-red-500">{errors.name.message}</p>
                    )}
                  </>
                );
              }}
            />
          </div>

          <div>
            <UIFormLabel>Email*</UIFormLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <UIFormInput
                      type="email"
                      {...field}
                      value={field.value}
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

          <div>
            <UIFormLabel>Phone Number*</UIFormLabel>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <UIFormInput
                      type="tel"
                      {...field}
                      value={field.value}
                      placeholder="Enter your phone number"
                    />
                    {errors && errors.phoneNumber && (
                      <p className="text-red-500">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </div>
          <div>
            <UIFormLabel>Password*</UIFormLabel>
            <Controller
              name="password"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <UIFormPasswordInput
                      {...field}
                      placeholder="Enter your password"
                    />
                    {errors && errors.password && (
                      <div className="text-red-500">
                        {errors.password.message}
                      </div>
                    )}
                  </>
                );
              }}
            />
          </div>

          <Controller
            name="age"
            control={control}
            render={({ field }) => {
              return (
                <>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <div className="font-inter text-sm font-normal text-inactive">
                      Are you above 18 years ?
                    </div>
                  </div>
                  {errors && errors.age && (
                    <p className="text-red-500">{errors.age.message}</p>
                  )}
                </>
              );
            }}
          />

          <Button
            type="submit"
            className="mx-auto w-full md:w-[324px]"
            variant="OTP"
          >
            {" "}
            Get OTP
          </Button>
          <div className="text-center font-inter text-base font-normal">
            Already have a account?{" "}
            <Link
              className="ml-4 font-poppins text-base  font-medium text-primary"
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
export default RegisterForm;
