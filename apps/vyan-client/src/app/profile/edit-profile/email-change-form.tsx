"use client";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Label } from "@repo/ui/src/@/components/label";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyOTP } from "./personal-info-actions";

import { signOut } from "next-auth/react";
import { toast } from "@repo/ui/src/@/components/use-toast";
import AddFormInput from "~/components/address-form-input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@repo/ui/src/@/components/input-otp";
import { useRouter } from "next/navigation";
export type IEmailChangeForm = {
  otp: string;
  email: string;
};
const infoFormSchema = z.object({
  otp: z.string({ required_error: "Please enter the otp" }),
  email: z
    .string({ required_error: "Please enter the email" })
    .email({ message: "Enter a valid Email address" })
    .regex(new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i), {
      message: "Invalid Email",
    }),
});
const EmailChangeForm = () => {
  const router = useRouter();
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof infoFormSchema>>({
    resolver: zodResolver(infoFormSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const onSubmit = (data: IEmailChangeForm) => {
  
    verifyOTP(data)
      .then((resp) => {
        if (resp?.message) {
          toast({
            title: resp?.message,
          });
          signOut({ redirect: false }).then(() => router.push("/"));
        }
        if (resp?.error) {
          return toast({
            title: resp.error,
          });
        }
      })
      .catch((err) => {
        return toast({
          title: "Error in changing the email",
          variant: "destructive",
        });
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div>
          <Label className="flex justify-start">Enter the new mail id</Label>
          <Controller
            control={control}
            name="email"
            render={({ field }) => {
              return (
                <>
                  <AddFormInput
                    type="email"
                    placeholder="eg. appleseed@gmail.com"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {errors && errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </>
              );
            }}
          />
        </div>

        <div>
          <Label className="flex justify-start">Verify the otp</Label>
          <Controller
            control={control}
            name="otp"
            render={({ field, fieldState }) => {
              return (
                <>
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  {errors && errors.otp && (
                    <p className="text-sm text-red-500">{errors.otp.message}</p>
                  )}
                </>
              );
            }}
          />
        </div>

        <button
          type="submit"
          className="flex w-fit justify-end rounded-md bg-primary p-2 text-white"
        >
          Verify OTP
        </button>
      </form>
    </>
  );
};

export default EmailChangeForm;
