"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  Controller,
  useFieldArray,
  FormProvider,
} from "react-hook-form";
import UIFormLabel from "@repo/ui/src/@/components/form/label";
import UIFormInput from "@repo/ui/src/@/components/form/input";
import { Button } from "@repo/ui/src/@/components/button";
import EditQualificationUserAction from "./qualification-user-action";
import { useToast } from "@repo/ui/src/@/components/use-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "~/app/components/loading-spinner";
import { useSession } from "next-auth/react";
import { getYear } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/src/@/components/select";
interface IDegree {
  degree: string;
}
interface IExperience {
  // years: string;
  startingYear: string;
  endingYear: string;
  department: string;
  position: string;
  location: string;
}
const formSchema = z.object({
  // degree: z.string({ required_error: "Please enter your degree" }),
  // otherDegree: z.string().optional(),
  experiences: z.array(
    z
      .object({
        // id: z.string().optional(),
        // years: z.string({
        //   required_error: "Please enter your experience",
        // }),
        startingYear: z
          .string({ required_error: "Please select the year" })
          .min(4, { message: "Please enter the four digits" }),
        endingYear: z
          .string({ required_error: "Please select the ending year" })
          .min(4, { message: "Please enter the four digits" }),
        position: z
          .string({
            required_error: "Please enter your position",
          })
          .min(1, { message: "Please enter your position" }),
        department: z
          .string({
            required_error: "Please enter your department",
          })
          .min(1, { message: "Please enter your department" }),
        location: z
          .string({
            required_error: "Please enter your hospital/clinic name",
          })
          .min(1, { message: "Please enter your location" }),
      })
      .refine(
        (data) => parseInt(data.startingYear) < parseInt(data.endingYear),
        {
          message: "Starting Year should be less than ending year",
          path: ["startingYear"],
        },
      ),
  ),
  degrees: z.array(
    z.object({
      // id: z.string().optional(),
      degree: z
        .string({ required_error: "Please enter your degree name" })
        .min(1, { message: "Please enter your degree name" }),
      // otherDegree: z.string({
      //   required_error: "Please enter your degree name",
      // }),
    }),
  ),
  education: z
    .string({
      required_error: "Please enter your education brief",
      invalid_type_error: "Please enter your education brief",
    })
    .min(1, { message: "Please enter your education qualifications" }),
});

const QualificationForm = ({
  aboutEducation,
  degrees,
  experiences,
}: {
  aboutEducation: string;
  degrees: IDegree[];
  experiences: IExperience[];
}) => {
  const router = useRouter();
  const { toast } = useToast();

  // Get the current year using date-fns
  const currentYear = getYear(new Date());
  // console.log("currentYear", currentYear);

  // Create an array of objects from 1900 to the current year
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => {
    const year = 1900 + i;
    return { value: year, label: year.toString() };
  });

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      education: aboutEducation,
      degrees: degrees.length > 0 ? degrees : [{ degree: "" }],
      experiences:
        experiences.length > 0
          ? experiences
          : [
              {
                startingYear: "",
                endingYear: "",
                department: "",
                location: "",
                position: "",
              },
            ],
    },
  });
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = methods;
  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experiences",
  });
  const {
    fields: degreeFields,
    append: appendDegree,
    remove: removeDegrees,
  } = useFieldArray({
    control,
    name: "degrees",
  });
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  params.set("step", "3");
  const submit = (data: z.infer<typeof formSchema>) => {
    setLoadingState(true);
    console.log("formData", data);
    EditQualificationUserAction(data)
      .then((resp) => {
        setLoadingState(false);
        toast({
          description: "Successfully edited the Qualifications",
          variant: "default",
        });
        console.log(resp.message);
        router.push(`/edit-profile/specialization?${params.toString()}`);
      })
      .catch((err) => {
        setLoadingState(false);
        toast({
          description: "Failed to edit the qualifications",
          variant: "destructive",
        });
        console.log(err.message);
      });
  };

  const errorHandler = (e: any) => {
    console.log("err", e);
  };

  useEffect(() => {
    params.set("step", "2");
    router.replace(`${pathname}?${params.toString()}`);
  }, []);
  const handleAddExperienceClick = () => {
    appendExperience({
      // id: undefined,
      // years: "",
      startingYear: "",
      endingYear: "",
      position: "",
      department: "",
      location: "",
    });
  };

  const handleAddDegreeClick = () => {
    appendDegree({ degree: "" });
  };

  return (
    <div className="w-full">
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-[18px] md:gap-6 xl:gap-7 2xl:gap-[30px]"
          onSubmit={handleSubmit(submit, errorHandler)}
          noValidate={true}
        >
          <div className="mb-6 font-inter text-lg font-semibold text-active md:leading-[30px] xl:mb-8 xl:text-2xl 2xl:text-[28px] 2xl:leading-[38px]">
            Qualificaiton
          </div>

          <div className="w-full">
            <UIFormLabel>Education Brief</UIFormLabel>
            <Controller
              control={control}
              name="education"
              render={({ field }) => (
                <>
                  <textarea
                    className="w-full rounded-md border border-solid py-3 pl-4 outline-primary placeholder:font-inter placeholder:text-sm placeholder:font-normal placeholder:text-placeholder-color"
                    placeholder="Enter brief about your education qualification"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {errors.education && (
                    <p className="text-red-500">{errors.education.message}</p>
                  )}
                </>
              )}
            />
          </div>

          {/* degree and other degree */}
          {degreeFields.map((field, index) => (
            <div
              key={field.id}
              className="flex w-full flex-col gap-[18px] xl:flex-row xl:gap-8"
            >
              <div className="w-full">
                <UIFormLabel>Degree {index + 1}</UIFormLabel>
                <Controller
                  control={control}
                  name={`degrees.${index}.degree`}
                  render={({ field }) => (
                    <>
                      <UIFormInput
                        type="text"
                        placeholder="Enter your Degree"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {errors.degrees?.[index]?.degree && (
                        <p className="text-red-500">
                          {errors?.degrees[index]?.degree?.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              {/* add/remove button */}
              <div className="self-end">
                {index === degreeFields.length - 1 ? (
                  <div className="flex gap-2 ">
                    {" "}
                    {index > 0 && (
                      <svg
                        onClick={() => removeDegrees(index)}
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="35"
                          height="35"
                          rx="5.5"
                          stroke="#CA0000"
                        />
                        <path
                          d="M10.5 13H12.1667H25.5"
                          stroke="#CA0000"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14.6719 13.0003V11.3337C14.6719 10.8916 14.8475 10.4677 15.16 10.1551C15.4726 9.84259 15.8965 9.66699 16.3385 9.66699H19.6719C20.1139 9.66699 20.5378 9.84259 20.8504 10.1551C21.1629 10.4677 21.3385 10.8916 21.3385 11.3337V13.0003M23.8385 13.0003V24.667C23.8385 25.109 23.6629 25.5329 23.3504 25.8455C23.0378 26.1581 22.6139 26.3337 22.1719 26.3337H13.8385C13.3965 26.3337 12.9726 26.1581 12.66 25.8455C12.3475 25.5329 12.1719 25.109 12.1719 24.667V13.0003H23.8385Z"
                          stroke="#CA0000"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16.3281 17.167V22.167"
                          stroke="#CA0000"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M19.6719 17.167V22.167"
                          stroke="#CA0000"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    )}
                    <svg
                      onClick={() =>
                        appendDegree({
                          degree: "",
                        })
                      }
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="cursor-pointer"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="35"
                        height="35"
                        rx="5.5"
                        stroke="#181818"
                      />
                      <path
                        d="M18 12.167V23.8337"
                        stroke="#121212"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.1641 18H23.8307"
                        stroke="#121212"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : (
                  <svg
                    onClick={() => removeDegrees(index)}
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="35"
                      height="35"
                      rx="5.5"
                      stroke="#CA0000"
                    />
                    <path
                      d="M10.5 13H12.1667H25.5"
                      stroke="#CA0000"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.6719 13.0003V11.3337C14.6719 10.8916 14.8475 10.4677 15.16 10.1551C15.4726 9.84259 15.8965 9.66699 16.3385 9.66699H19.6719C20.1139 9.66699 20.5378 9.84259 20.8504 10.1551C21.1629 10.4677 21.3385 10.8916 21.3385 11.3337V13.0003M23.8385 13.0003V24.667C23.8385 25.109 23.6629 25.5329 23.3504 25.8455C23.0378 26.1581 22.6139 26.3337 22.1719 26.3337H13.8385C13.3965 26.3337 12.9726 26.1581 12.66 25.8455C12.3475 25.5329 12.1719 25.109 12.1719 24.667V13.0003H23.8385Z"
                      stroke="#CA0000"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.3281 17.167V22.167"
                      stroke="#CA0000"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M19.6719 17.167V22.167"
                      stroke="#CA0000"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
              </div>

             
            </div>
          ))}
          

          <div className="mb-6 font-inter text-lg font-semibold text-active md:leading-[30px] xl:mb-8 xl:text-2xl 2xl:text-[28px] 2xl:leading-[38px]">
            Experience
          </div>
          {experienceFields.map((field, index) => (
            <div key={field.id} className="flex flex-col gap-[18px] ">
              <input
                type="hidden"
                // {...methods.register(`experiences.${index}.id`)}
              />
              <div className="flex flex-col gap-[18px] xl:flex-row  xl:gap-8">
                <div className="w-full">
                  <UIFormLabel>Experience</UIFormLabel>
                  <div className="flex items-center gap-2">
                    {/* <Controller
                      control={control}
                      name={`experiences.${index}.startingYear`}
                      rules={{
                        validate: (value) => {
                          if (!/^\d{0,4}$/.test(value)) {
                            return "Value must be a number up to 4 digits";
                          }
                          return true;
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <UIFormInput
                          className="pr-3"
                            type="text"
                            placeholder="Enter your Experience"
                            value={field.value}
                            // onChange={field.onChange}
                            onChange={(e) => {
                              const newValue = e.target.value;

                              if (/^\d{0,4}$/.test(newValue)) {
                                field.onChange(e);
                              }
                            }}
                          />
                          {errors.experiences?.[index]?.startingYear && (
                            <p className="text-red-500">
                              {
                                errors?.experiences[index]?.startingYear
                                  ?.message
                              }
                            </p>
                          )}
                        </>
                      )}
                    /> */}
                    <Controller
                      name={`experiences.${index}.startingYear`}
                      control={control}
                      render={({ field }) => {
                        return (
                          <>
                            <Select
                              value={field.value || ""}
                              onValueChange={field.onChange}
                              // defaultValue={gender || ""}
                            >
                              <SelectTrigger className="w-[120px]  rounded-md border border-solid border-[#e9e9e9] py-3  pl-4 font-inter text-base  font-normal  outline-primary  placeholder:font-inter placeholder:text-sm placeholder:font-normal placeholder:text-placeholder-color   ">
                                <SelectValue placeholder="e.g 2000" />
                              </SelectTrigger>
                              <SelectContent className="w-full bg-white">
                                <SelectGroup>
                                  {years.length &&
                                    years.map((year) => {
                                      return (
                                        <SelectItem
                                          value={year.value.toString()}
                                          key={year.value}
                                        >
                                          {year.label}
                                        </SelectItem>
                                      );
                                    })}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {errors &&
                              errors.experiences?.[index]?.startingYear && (
                                <p className="text-red-500">
                                  {" "}
                                  {
                                    errors.experiences?.[index]?.startingYear
                                      .message
                                  }
                                </p>
                              )}
                          </>
                        );
                      }}
                    />
                    <div>-</div>
                    {/* <Controller
                      control={control}
                      name={`experiences.${index}.endingYear`}
                      render={({ field }) => (
                        <>
                          <UIFormInput
                            type="text"
                             className="pr-3"
                            placeholder="Enter your Experience"
                            value={field.value}
                            // onChange={field.onChange}
                            onChange={(e) => {
                              const newValue = e.target.value;

                              if (/^\d{0,4}$/.test(newValue)) {
                                field.onChange(e);
                              }
                            }}
                          />
                          {errors.experiences?.[index]?.endingYear && (
                            <p className="text-red-500">
                              {errors?.experiences[index]?.endingYear?.message}
                            </p>
                          )}
                        </>
                      )}
                    /> */}
                    <Controller
                      name={`experiences.${index}.endingYear`}
                      control={control}
                      render={({ field }) => {
                        return (
                          <>
                            <Select
                              value={field.value || ""}
                              onValueChange={field.onChange}
                              // defaultValue={gender || ""}
                            >
                              <SelectTrigger className="w-[120px]  rounded-md border border-solid border-[#e9e9e9] py-3  pl-4 font-inter text-base  font-normal  outline-primary  placeholder:font-inter placeholder:text-sm placeholder:font-normal placeholder:text-placeholder-color  ">
                                <SelectValue placeholder="e.g 2000" />
                              </SelectTrigger>
                              <SelectContent className="w-full bg-white">
                                <SelectGroup>
                                  {years.length &&
                                    years.map((year) => {
                                      return (
                                        <SelectItem
                                          value={year.value.toString()}
                                          key={year.value}
                                        >
                                          {year.label}
                                        </SelectItem>
                                      );
                                    })}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {errors &&
                              errors.experiences?.[index]?.endingYear && (
                                <p className="text-red-500">
                                  {" "}
                                  {
                                    errors.experiences?.[index]?.endingYear
                                      .message
                                  }
                                </p>
                              )}
                          </>
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <UIFormLabel>Department</UIFormLabel>
                  <Controller
                    control={control}
                    name={`experiences.${index}.department`}
                    render={({ field }) => (
                      <>
                        <UIFormInput
                          type="text"
                          placeholder="Enter your department"
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {errors.experiences?.[index]?.department && (
                          <p className="text-red-500">
                            {errors?.experiences[index]?.department?.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[18px] xl:flex-row  xl:gap-8">
                <div className="w-full">
                  <UIFormLabel>Position</UIFormLabel>
                  <Controller
                    control={control}
                    name={`experiences.${index}.position`}
                    render={({ field }) => (
                      <>
                        <UIFormInput
                          type="text"
                          placeholder="Enter your position"
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {errors.experiences?.[index]?.position && (
                          <p className="text-red-500">
                            {errors?.experiences[index]?.position?.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>
                <div className="w-full">
                  <UIFormLabel>Location</UIFormLabel>
                  <Controller
                    control={control}
                    name={`experiences.${index}.location`}
                    render={({ field }) => (
                      <>
                        <UIFormInput
                          type="text"
                          placeholder="Enter the location"
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {errors.experiences?.[index]?.location && (
                          <p className="text-red-500">
                            {errors?.experiences[index]?.location?.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>

              {/* add/remove button */}
              <div className="self-end">
                {index === experienceFields.length - 1 ? (
                  <div className="flex gap-2">
                    {index > 0 && (
                      <svg
                        onClick={() => removeExperience(index)}
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="35"
                          height="35"
                          rx="5.5"
                          stroke="#CA0000"
                        />
                        <path
                          d="M10.5 13H12.1667H25.5"
                          stroke="#CA0000"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14.6719 13.0003V11.3337C14.6719 10.8916 14.8475 10.4677 15.16 10.1551C15.4726 9.84259 15.8965 9.66699 16.3385 9.66699H19.6719C20.1139 9.66699 20.5378 9.84259 20.8504 10.1551C21.1629 10.4677 21.3385 10.8916 21.3385 11.3337V13.0003M23.8385 13.0003V24.667C23.8385 25.109 23.6629 25.5329 23.3504 25.8455C23.0378 26.1581 22.6139 26.3337 22.1719 26.3337H13.8385C13.3965 26.3337 12.9726 26.1581 12.66 25.8455C12.3475 25.5329 12.1719 25.109 12.1719 24.667V13.0003H23.8385Z"
                          stroke="#CA0000"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16.3281 17.167V22.167"
                          stroke="#CA0000"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M19.6719 17.167V22.167"
                          stroke="#CA0000"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    )}
                    <svg
                      onClick={() =>
                        appendExperience({
                          // years: "",
                          startingYear: "",
                          endingYear: "",
                          department: "",
                          location: "",
                          position: "",
                        })
                      }
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="cursor-pointer"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="35"
                        height="35"
                        rx="5.5"
                        stroke="#181818"
                      />
                      <path
                        d="M18 12.167V23.8337"
                        stroke="#121212"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.1641 18H23.8307"
                        stroke="#121212"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : (
                  <svg
                    onClick={() => removeExperience(index)}
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="35"
                      height="35"
                      rx="5.5"
                      stroke="#CA0000"
                    />
                    <path
                      d="M10.5 13H12.1667H25.5"
                      stroke="#CA0000"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.6719 13.0003V11.3337C14.6719 10.8916 14.8475 10.4677 15.16 10.1551C15.4726 9.84259 15.8965 9.66699 16.3385 9.66699H19.6719C20.1139 9.66699 20.5378 9.84259 20.8504 10.1551C21.1629 10.4677 21.3385 10.8916 21.3385 11.3337V13.0003M23.8385 13.0003V24.667C23.8385 25.109 23.6629 25.5329 23.3504 25.8455C23.0378 26.1581 22.6139 26.3337 22.1719 26.3337H13.8385C13.3965 26.3337 12.9726 26.1581 12.66 25.8455C12.3475 25.5329 12.1719 25.109 12.1719 24.667V13.0003H23.8385Z"
                      stroke="#CA0000"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.3281 17.167V22.167"
                      stroke="#CA0000"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M19.6719 17.167V22.167"
                      stroke="#CA0000"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
          ))}
          {/* <Button
            type="button"
            onClick={handleAddExperienceClick}
            className="w-fit rounded-md border border-active bg-white px-4 py-[14px] font-inter font-normal text-active hover:bg-white"
          >
            <svg
              className="mr-1 inline"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3.9834V13.3167"
                stroke="#121212"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.33594 8.65039H12.6693"
                stroke="#121212"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Add Experience
          </Button> */}
          <div className="flex justify-end gap-[29px]">
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
      </FormProvider>
    </div>
  );
};

export default QualificationForm;
