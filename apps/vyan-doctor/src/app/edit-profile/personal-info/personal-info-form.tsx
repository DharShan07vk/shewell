"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/src/@/components/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import UIFormLabel from "@repo/ui/src/@/components/form/label";
import UIFormInput from "@repo/ui/src/@/components/form/input";
import { Button } from "@repo/ui/src/@/components/button";
import { useSession } from "next-auth/react";
import PersonalInfoUserAction from "./personal-info-user-action";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@repo/ui/src/@/components/use-toast";
import { useEffect, useState } from "react";
import LoadingSpinner from "~/app/components/loading-spinner";
import React from "react";
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

const formSchema = z.object({
  fullName: z
    .string({ required_error: "Please Enter your full name" })
    .min(1, { message: "Please Enter your full name" }),
  email: z
    .string({ required_error: "Please enter the email id" })
    .email({ message: "Please enter a valid Email Address" })
    .regex(new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i), {
      message: "Invalid Email",
    })
    .optional(),
  phoneNumber: z
    .string({ required_error: "Please enter the phone number" })
    .min(10, { message: "Please enter the phone number" })
    .max(10, { message: "Phone Number can have maximum 10 digits" })
    .regex(new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/), {
      message: "only Numeric Digits are allowed",
    }),
  alternativePhoneNumber: z
    .string({ required_error: "Please enter the phone number" })
    .max(10, { message: "Phone Number can have maximum 10 digits" })
    .regex(new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/), {
      message: "only Numeric Digits are allowed",
    })
    .optional()
    .nullable(),
  displayQualificationId: z.string({
    required_error: "Please enter your qualificaiton to be dispalyed",
  }),
  bio: z
    .string({ required_error: "Please enter your bio" })
    .min(1, { message: "Please enter your bio" }),
  adImage: z.any({ required_error: "Please upload the image" }),
  // .refine(
  //   (files) => {
  //     return files?.[0]?.size <= MAX_FILE_SIZE;
  //   },
  //   { message: `Max image size is 5MB.` },
  // )
  // .refine((files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type), {
  //   message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
  // }),
});
interface ISpecialization {
  value: string;
  label: string;
}
const PersonalInfoForm = ({
  firstName,
  email,
  phoneNumber,
  displayQualificationId,
  aboutYou,
  specialisations,
}: {
  firstName: string;
  email: string;
  phoneNumber: string;
  displayQualificationId: string;
  aboutYou: string;
  specialisations: ISpecialization[];
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: firstName,
      email: email,
      phoneNumber: phoneNumber,
      bio: aboutYou,
      displayQualificationId: displayQualificationId,
    },
  });

  const router = useRouter();
  
  const { toast } = useToast();
  // const {replace} = useRouter();
  const pathname = usePathname()
  console.log("pathname",pathname)
 
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  params.set("step", "2")
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const submit = (data: z.infer<typeof formSchema>) => {
    setLoadingState(true);
    console.log("formData", data);
    PersonalInfoUserAction(data)
      .then((resp) => {
        setLoadingState(false);
        toast({
          description: "Successfully edited the Personal-Info",
          variant: "default",
        });
        console.log(resp.message);
        router.push(`/edit-profile/qualification?${params.toString()}`);
      })
      .catch((err) => {
        setLoadingState(false);
        toast({
          description: "Failed to edit the Personal-Info",
          variant: "destructive",
        });
        console.log(err.message);
      });
  };
  const errorHandler = (e: any) => {
    console.log("err", e);
  };

  return (
    <>
      <div className="w-full">
        <form
          className="flex flex-col gap-[18px] md:gap-6 xl:gap-7 2xl:gap-[30px]"
          onSubmit={handleSubmit(submit, errorHandler)}
          noValidate={true}
        >
         

          <div className="flex flex-col gap-[18px] xl:flex-row xl:gap-8">
            <div className="w-full">
              <UIFormLabel>Full Name </UIFormLabel>
              <Controller
                control={control}
                name="fullName"
                render={({ field }) => {
                  return (
                    <>
                      <UIFormInput
                        className="outline-primary "
                        type="text"
                        placeholder="eg. Mohit"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {errors && errors.fullName && (
                        <p className="text-red-500">
                          {errors.fullName?.message}
                        </p>
                      )}
                    </>
                  );
                }}
              />
            </div>
            <div className="w-full">
              <UIFormLabel>Email Id</UIFormLabel>
              <Controller
                control={control}
                name="email"
                render={({ field }) => {
                  return (
                    <>
                      <UIFormInput
                        className="w-full cursor-not-allowed rounded-md py-3 pl-4 text-inactive  opacity-60 outline-primary placeholder:font-inter placeholder:text-sm placeholder:font-normal   placeholder:text-placeholder-color"
                        type="email"
                        placeholder="eg. doctor@gmail.com"
                        value={field.value}
                        disabled={true}

                        // onChange={field.onChange}
                      />
                      {errors && errors.email && (
                        <p className="text-red-500">{errors.email?.message}</p>
                      )}
                    </>
                  );
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[18px] xl:flex-row xl:gap-8">
            <div className="w-full">
              <UIFormLabel>Phone Number</UIFormLabel>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field }) => {
                  return (
                    <>
                      <UIFormInput
                        type="tel"
                        className="outline-primary"
                        placeholder="+91 789 345 7891"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <span className="mt-1 font-inter text-xs font-normal text-primary">
                        To change the phone number you have to verify first
                      </span>
                      {errors && errors.phoneNumber && (
                        <p className="text-red-500">
                          {errors.phoneNumber?.message}
                        </p>
                      )}
                    </>
                  );
                }}
              />
            </div>
            <div className="w-full">
              <UIFormLabel>Alternative Number</UIFormLabel>
              <Controller
                control={control}
                name="alternativePhoneNumber"
                render={({ field }) => {
                  return (
                    <>
                      <UIFormInput
                        type="tel"
                        className="outline-primary"
                        placeholder="Enter your alternative number"
                        value={field.value!}
                        onChange={field.onChange}
                      />
                      {errors && errors.alternativePhoneNumber && (
                        <p className="text-red-500">
                          {errors.alternativePhoneNumber?.message}
                        </p>
                      )}
                    </>
                  );
                }}
              />
            </div>
          </div>
          

          <div>
            <UIFormLabel>Qualification to be displayed as</UIFormLabel>
            <Controller
              control={control}
              name="displayQualificationId"
              render={({ field }) => {
                return (
                  <>
                    
                    <Select
                      value={field.value || ""}
                      onValueChange={(e) => {
                        field.onChange(e);
                      }}
                    >
                      <SelectTrigger className=" rounded-md placeholder:text-placeholder-color placeholder:font-inter placeholder:font-normal placeholder:text-sm  w-full py-3 pl-4 outline-primary">
                        <SelectValue placeholder="Qualification to be displayed as" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          {specialisations &&
                            specialisations.map((item) => {
                              return (
                                <SelectItem value={item.value} key={item.value}>
                                  {item.label}
                                </SelectItem>
                              );
                            })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {errors && errors.displayQualificationId && (
                      <p className="text-red-500">
                        {" "}
                        {errors.displayQualificationId.message}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </div>
          <div className="w-full">
            <UIFormLabel>Your Bio</UIFormLabel>
            <Controller
              control={control}
              name="bio"
              render={({ field }) => {
                return (
                  <>
                    
                    <textarea
                      className="w-full rounded-md  border border-solid py-3 pl-4 outline-primary  placeholder:font-inter placeholder:text-sm placeholder:font-normal placeholder:text-placeholder-color "
                      placeholder="Enter brief about your education qualification"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {errors && errors.bio && (
                      <p className="text-red-500">{errors.bio?.message}</p>
                    )}
                  </>
                );
              }}
            />
          </div>
         
          {/* form-buttons */}
          <div className="flex justify-end gap-[29px]  ">
           
            <Button
              disabled={loadingState}
              type="submit"
              className="rounded-md border border-primary bg-primary px-4 py-2 font-inter text-base font-medium text-white"
            >
              {loadingState && <LoadingSpinner width="20" height="20" />}
              {loadingState ? "Loading..." : " Next"}
              {loadingState ? (
                ""
              ) : (
                <svg
                  className="ml-1 inline"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_4616_19548)">
                    <path
                      d="M0.909061 9.09134H16.8962L13.9026 6.09776C13.5476 5.74279 13.5476 5.16716 13.9026 4.81213C14.2576 4.45716 14.8332 4.45716 15.1883 4.81213L19.7337 9.35758C20.0888 9.71255 20.0888 10.2882 19.7337 10.6432L15.1883 15.1887C15.0107 15.3662 14.7781 15.455 14.5454 15.455C14.3128 15.455 14.0801 15.3662 13.9026 15.1887C13.5476 14.8337 13.5476 14.2581 13.9026 13.903L16.8962 10.9095H0.909061C0.407 10.9095 -3.05176e-05 10.5025 -3.05176e-05 10.0004C-3.05176e-05 9.49837 0.407 9.09134 0.909061 9.09134Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4616_19548">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="matrix(-1 0 0 1 20 0)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default PersonalInfoForm;
// md:mb-[28px] md:text-[20px] 2xl:mb-[40px]
