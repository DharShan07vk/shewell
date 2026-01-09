"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/src/@/components/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/src/@/components/button";
import UIFormLabel from "@repo/ui/src/@/components/form/label";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import UIFormInput from "@repo/ui/src/@/components/form/input";
import { Checkbox } from "@repo/ui/src/@/components/checkbox";
// import SetPriceUserAction from "./setPrices-user-action";
import { useToast } from "@repo/ui/src/@/components/use-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SetPriceUserAction from "./setPrices-user-action";
import { useEffect } from "react";
import { env } from "~/env";
interface IPrices {
  // coupleSession: boolean;
  time: number;
  priceInCentsForSingle: number;
  priceInCentsForCouple: number;
}
const PricesForm = ({ prices }: { prices: IPrices[] | null }) => {
  const schema = z.object({
    sessions: z.array(
      z.object({
        time: z.number({ required_error: "Please select the time" }),
        priceInCentsForSingle: z
          .number({ required_error: "Please add the charges" })
          .min(1, { message: "Please add the charges" }),
        priceInCentsForCouple: z
          .number({ required_error: "Please add the charges" })
          .min(1, { message: "Please add the charges" }),
      }),
    ),
  });

  const updatedPrices =
    prices?.map((item) => ({
      ...item,
      priceInCentsForSingle: item.priceInCentsForSingle! / 100,
      priceInCentsForCouple: item.priceInCentsForCouple! / 100,
    })) || [];

  const defaultValues =
    prices?.length! > 0
      ? updatedPrices
      : [{ time: 30, priceInCentsForSingle: 0, priceInCentsForCouple: 0 }];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      sessions: defaultValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sessions",
  });

  const { toast } = useToast();
  const router = useRouter();
  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("data", data);
    SetPriceUserAction({ appointmentPrice: data.sessions as IPrices[] })
      .then((resp) => {
        toast({
          description: "Prices are set",
          variant: "default",
        });
        console.log(resp?.message);
        router.push("/appointment");
        router.refresh();
      })
      .catch((err) => {
        toast({
          description: "Failed to set the prices",
          variant: "destructive",
        });
        console.log(err.message);
      });
  };

  
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  useEffect(() => {
    params.set("step", "4");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col  gap-8">
        {fields &&
          fields.map((field, index) => (
            <div
              key={field.id}
              className="mb-2 flex flex-col gap-5 lg:flex-row xl:gap-8 2xl:gap-9"
            >
              
              {/* time and charges */}
              <div className="flex flex-wrap gap-5 xl:gap-8 2xl:gap-9">
                {/* add-time */}
                <div className="md:w-[103px] xl:w-[136px]">
                  <UIFormLabel className="font-inter text-sm font-medium text-active 2xl:text-base">
                    Add Time
                  </UIFormLabel>
                  <Controller
                    control={control}
                    name={`sessions.${index}.time`}
                    render={({ field }) => (
                      <>
                        <Select
                          // {...field}
                          value={field.value.toString()}
                          onValueChange={(e) => field.onChange(Number(e))}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              className="placeholder:font-inter placeholder:text-xs placeholder:font-normal placeholder:text-inactive 2xl:placeholder:text-sm"
                              placeholder={"e.g 30min"}
                            />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="30">30 min</SelectItem>
                            <SelectItem value="60">60 min</SelectItem>
                            <SelectItem value="90">90 min</SelectItem>
                            <SelectItem value="120">120 min</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.sessions && errors.sessions[index]?.time && (
                          <p className="text-red-500">
                            {errors.sessions[index]?.time?.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>
                {/* add-charges */}
                <div className="md:w-[200px] xl:w-[310px] 2xl:w-[405px]">
                  <UIFormLabel className="font-inter text-sm font-medium text-active 2xl:text-base">
                    Charges For Single Patient
                  </UIFormLabel>
                  <Controller
                    control={control}
                    name={`sessions.${index}.priceInCentsForSingle`}
                    render={({ field }) => (
                      <>
                        <UIFormInput
                          type="number"
                          className="rounded-md py-2 pl-3 outline-primary placeholder:font-inter placeholder:text-sm placeholder:font-normal placeholder:text-placeholder-color"
                          {...field}
                          value={field.value}
                          onChange={(e) => {
                            const parsedNum = e.target.value
                              ? Number(e.target.value)
                              : null;
                            console.log("dddd", parsedNum);

                            if (parsedNum === null) {
                              field.onChange(parsedNum);
                            } else if (!isNaN(parsedNum)) {
                              field.onChange(parsedNum);
                            }
                          }}
                          placeholder="e.g 500"
                        />
                        {errors.sessions &&
                          errors.sessions[index]?.priceInCentsForSingle && (
                            <p className="text-red-500">
                              {
                                errors.sessions[index]?.priceInCentsForSingle
                                  ?.message
                              }
                            </p>
                          )}
                      </>
                    )}
                  />
                </div>

                <div className="md:w-[200px] xl:w-[310px] 2xl:w-[405px]">
                  <UIFormLabel className="font-inter text-sm font-medium text-active 2xl:text-base">
                    Charges For Couple
                  </UIFormLabel>
                  <Controller
                    control={control}
                    name={`sessions.${index}.priceInCentsForCouple`}
                    render={({ field }) => (
                      <>
                        <UIFormInput
                          type="number"
                          className="rounded-md py-2 pl-3 outline-primary placeholder:font-inter placeholder:text-sm placeholder:font-normal placeholder:text-placeholder-color"
                          {...field}
                          value={field.value}
                          onChange={(e) => {
                            const parsedNum = e.target.value
                              ? Number(e.target.value)
                              : null;
                            console.log("dddd", parsedNum);

                            if (parsedNum === null) {
                              field.onChange(parsedNum);
                            } else if (!isNaN(parsedNum)) {
                              field.onChange(parsedNum);
                            }
                          }}
                          
                          placeholder="e.g 1000"
                        />
                        {errors.sessions &&
                          errors.sessions[index]?.priceInCentsForCouple && (
                            <p className="text-red-500">
                              {
                                errors.sessions[index]?.priceInCentsForCouple
                                  ?.message
                              }
                            </p>
                          )}
                      </>
                    )}
                  />
                </div>

                {/* add/remove button */}
                <div className="self-end">
                  {index === fields.length - 1 ? (
                    <div className="flex gap-2">
                      {index > 0 && (
                        <svg
                          onClick={() => remove(index)}
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
                          append({
                            time: 30,
                            priceInCentsForSingle: 0,
                            priceInCentsForCouple: 0,
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
                      onClick={() => remove(index)}
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
            </div>
          ))}
      </div>
      <div className="font-inter text-xs font-normal text-primary">
        The platform fee will be {env.NEXT_PUBLIC_PLATFORM_FEE}% of the fee you charge for the session.
      </div>

      <div className="mt-5 flex justify-end gap-[29px] md:mt-[30px] xl:mt-8 2xl:mt-10">
        <Button
          type="submit"
          className="rounded-md border border-primary bg-primary px-4 py-2 font-inter text-base font-medium text-white hover:bg-secondary"
        >
          Update Profile
        </Button>
      </div>
    </form>
  );
};
export default PricesForm;
