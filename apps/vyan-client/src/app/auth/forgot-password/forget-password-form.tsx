"use client";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import forgetPasswordAction from "./forget-password-action";
import { useState } from "react";
import { toast } from "@repo/ui/src/@/components/use-toast";
import UIFormLabel from "@repo/ui/src/@/components/form/label";
import UIFormInput from "@repo/ui/src/@/components/form/input";
import { Button } from "~/components/ui/button";

const ForgetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = ({ email }: { email: string }) => {
    setIsLoading(true);
    forgetPasswordAction({
      email,
    })
      .then((resp) => {
        setIsLoading(false);
        toast({
          title: resp.message,
        });
      })
      .catch((err) => {
        setIsLoading(false);
      
        toast({
          title: err,
        });
      });
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full">
        <h1 className="mb-1 font-archivo text-2xl font-semibold leading-8 text-[#000000E5]">
          Forgot Password?
        </h1>
        <p className="mb-7 font-noto text-xs text-[#000000CC] lg:mb-10 lg:text-sm ">
          Enter your email address to send the verification code for password
          reset
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <UIFormLabel>Email</UIFormLabel>
            <Controller
              name="email"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Email is required",
                },
              }}
              render={({ field }) => {
                return (
                  <UIFormInput
                    type="email"
                    placeholder="Enter your email id"
                    {...field}
                  />
                );
              }}
            />
            {errors && errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <p className="my-4 font-noto text-xs font-medium text-secondary lg:text-sm">
            Already have an account?
            <Link href="/auth/login" className="ml-1 text-primary">
              Sign In
            </Link>
          </p>
          <Button className="w-full bg-primary py-3 font-medium leading-6 text-[#fefefe] lg:text-lg lg:leading-7" disabled={isLoading}>Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
