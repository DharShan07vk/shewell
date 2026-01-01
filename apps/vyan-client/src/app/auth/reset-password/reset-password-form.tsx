"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import resetPasswordAction from "./reset-password-action";
import { useSearchParams } from "next/navigation";
import { toast } from "@repo/ui/src/@/components/use-toast";
import UIFormLabel from "@repo/ui/src/@/components/form/label";
import UIFormPasswordInput from "@repo/ui/src/@/components/form/password-input";
import { Button } from "@repo/ui/src/@/components/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface IResetPasswordForm {
  token: string;
  password: string;
  confirmPassword: string;
}
const formSchema = z
.object({
  password:  z.string({ required_error: "New password is required" })
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
  confirmPassword: z.string()
  .min(1,{
    message:"Password confirmation is required"
  }),
  token:z.string()
})
.refine((data)=>data.password===data.confirmPassword,{
  message:"Passwords don't match",
  path:['confirmPassword']
})
const ResetPasswordForm = () => {
  const params=useSearchParams();
  const toke=params.get('resetPasswordToken');


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: toke || "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = ({
    token,
    password,
    confirmPassword,
  }: IResetPasswordForm) => {
   
    resetPasswordAction({ token, password, confirmPassword }).then((resp) => {
      toast({
        title: resp.message,
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
        <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <UIFormLabel>Password</UIFormLabel>
            <Controller
              control={control}
              name="password"
              rules={{
                required: {
                  value: true,
                  message: "Password is required",
                },
              }}
              render={({ field }) => {
                return (
                  <UIFormPasswordInput
                    placeholder="Enter your new password"
                    {...field}
                  />
                );
              }}
            />
            {errors && errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="">
            <UIFormLabel>Password Confirmation</UIFormLabel>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: {
                  value: true,
                  message: "Password confirmation is required",
                },
              }}
              render={({ field }) => {
                return (
                  <UIFormPasswordInput
                    placeholder="Enter your new password"
                    {...field}
                  />
                );
              }}
            />
            {errors && errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <p className="my-4 font-noto text-xs font-medium text-secondary lg:text-sm">
            Already remember password?{" "}
            <Link href="/auth/login" className="text-primary">
              Sign In
            </Link>
          </p>
          <Button className="w-full bg-primary py-3 font-medium leading-6 text-[#fefefe] lg:text-lg lg:leading-7" >Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
