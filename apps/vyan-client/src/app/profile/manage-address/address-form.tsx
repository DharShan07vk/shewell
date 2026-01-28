"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import UIFormInput from "@repo/ui/src/@/components/form/input";
import UIFormLabel from "@repo/ui/src/@/components/form/label";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/src/@/components/select";
import { Badge } from "@repo/ui/src/@/components/badge";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { toast } from "@repo/ui/src/@/components/use-toast";
import { IAddressForm } from "~/models/address.model";
import {
  CreateUserAddress,
  fetchStates,
  UpdateUserAddress,
} from "./address-actions";

const addressFormSchema = z.object({
  countryId: z.string({ required_error: "Please select the city" }),
  city: z.string().min(1, "City is required"),
  stateId: z.string({ required_error: "Please select the state" }),
  name: z.string().min(1, "Please enter the name"),
  mobile: z
    .string()
    .length(10, "Invalid phone number")
    .regex(/^[789]\d{9}$/, "Invalid phone number"),
  landmark: z.string().min(1, "Landmark is required"),
  pincode: z
    .string()
    .min(1, "Pin code is required")
    .regex(/^\d{6}$/, "Invalid pincode"),
  area: z.string().min(1, "Locality is required"),
  houseNo: z.string().min(1, "This field is required"),
  addressType: z.string(),
});
export default function AddressForm({
  countries,
  initialValues,
  onAddressCreated,
}: {
  initialValues: IAddressForm;
  countries: { id: string; name: string }[];
  onAddressCreated: () => void;
}) {
  const [badge, setBadge] = useState<string>("Work");
  const {
    handleSubmit,
    control,
    setValue,
    // formState: { errors },
  } = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: initialValues,
  });
  const errorHandler = (err: unknown) => {
    console.log("err", err);
  };
  const callServerAction = (data: IAddressForm) => {
    if (initialValues.id) {
      return UpdateUserAddress({ ...data, id: initialValues.id });
    } else return CreateUserAddress(data);
  };
  const submitForm = (data: IAddressForm) => {
    return callServerAction(data)
      .then((resp) => {
        if (resp?.message) {
          toast({
            title: resp?.message,
            variant: "default",
          });
          onAddressCreated();
          console.log(resp?.message);
        }
        if (resp?.error) {
          toast({
            title: resp?.error,
            variant: "destructive",
          });
          console.log(resp?.error);
        }
      })
      .catch((err) => {
        toast({
          title: err.message,
          variant: "destructive",
        });
        console.log(err);
      })
      .finally(() => {});
  };

  const handleBadgeClick = (type: string) => {
    setBadge(type);
    setValue("addressType", type);
  };
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState<
    | null
    | undefined
    | {
        id: string;
        name: string;
        stateCode: string;
        createdAt: Date;
        updatedAt: Date;
        countryId: string;
      }[]
  >([]);

  useEffect(() => {
    setValue("stateId", initialValues.stateId.toString());
    setValue("countryId", initialValues.countryId.toString());
  }, [initialValues]);

  console.log("states before fetching", states);
  useEffect(() => {
    fetchStates(selectedCountry).then((resp) => setStates(resp?.states));
    console.log("fetch states", states);
  }, [selectedCountry]);
  useEffect(() => {
    setValue("stateId", initialValues.stateId.toString());
    setValue("countryId", initialValues.countryId.toString());
    fetchStates(initialValues.countryId).then((resp) =>
      setStates(resp?.states),
    );
  }, [initialValues]);

  console.log("states after fetching", states);
  return (
    <>
      <form onSubmit={handleSubmit(submitForm, errorHandler)}>
        <div className="flex flex-col gap-6">
          {/* div-1 */}
          <div>
            <UIFormLabel className="font-poppins text-sm font-medium text-[#333333]">
              Country/ Region
            </UIFormLabel>
            <Controller
              name="countryId"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <Select
                      defaultValue={initialValues.countryId}
                      onValueChange={(e: string) => {
                        field.onChange(e);
                        setSelectedCountry(e);
                      }}
                    >
                      <SelectTrigger className="w-full rounded-xl border-gray-200 bg-gray-50 font-inter focus:border-[#00898F] focus:bg-white">
                        <SelectValue
                          className="font-inter text-sm font-normal text-[#777777]"
                          placeholder="Select Country"
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          {countries.map((country) => {
                            return (
                              <SelectItem value={country.id} key={country.id}>
                                {country.name}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.error && (
                      <p className="mt-1 text-xs text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:gap-6">
            <div className="w-full">
              <UIFormLabel className="font-poppins text-sm font-medium text-[#333333]">
                State
              </UIFormLabel>
              <Controller
                name="stateId"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <Select
                        defaultValue={initialValues.stateId}
                        onValueChange={(e: string) => {
                          field.onChange(e);
                        }}
                      >
                        <SelectTrigger className="w-full rounded-xl border-gray-200 bg-gray-50 font-inter focus:border-[#00898F] focus:bg-white">
                          <SelectValue
                            className="font-inter text-sm font-normal text-[#777777]"
                            placeholder="Select state"
                          />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectGroup>
                            {states &&
                              states.map((state) => {
                                return (
                                  <SelectItem value={state.id} key={state.id}>
                                    {state.name}
                                  </SelectItem>
                                );
                              })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {fieldState.error && (
                        <p className="mt-1 text-xs text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  );
                }}
              />
            </div>

            <div className="w-full">
              <UIFormLabel className="font-poppins text-sm font-medium text-[#333333]">
                City
              </UIFormLabel>
              <Controller
                name="city"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <UIFormInput
                        type="text"
                        placeholder="Enter your city"
                        value={field.value}
                        onChange={field.onChange}
                        className="rounded-xl border-gray-200 bg-gray-50 font-inter focus:border-[#00898F] focus:bg-white"
                      />
                      {fieldState.error && (
                        <p className="mt-1 text-xs text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  );
                }}
              />
            </div>
          </div>

          {/* div-2 */}

          <div className="flex flex-col gap-3 md:flex-row md:gap-6">
            {/* div-2-a */}
            <div className="w-full">
              <UIFormLabel className="font-poppins text-sm font-medium text-[#333333]">
                Name
              </UIFormLabel>
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <UIFormInput
                        type="text"
                        placeholder="Enter your name"
                        value={field.value}
                        onChange={field.onChange}
                        className="rounded-xl border-gray-200 bg-gray-50 font-inter focus:border-[#00898F] focus:bg-white"
                      />
                      {fieldState.error && (
                        <p className="mt-1 text-xs text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  );
                }}
              />
            </div>
            {/* div-2-b */}
            <div className="w-full">
              <UIFormLabel className="font-poppins text-sm font-medium text-[#333333]">
                Phone Number
              </UIFormLabel>
              <Controller
                control={control}
                name="mobile"
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <UIFormInput
                        type="text"
                        placeholder="Enter your phone number"
                        value={field.value}
                        onChange={field.onChange}
                        className="rounded-xl border-gray-200 bg-gray-50 font-inter focus:border-[#00898F] focus:bg-white"
                      />
                      {fieldState.error && (
                        <p className="mt-1 text-xs text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  );
                }}
              />
            </div>
          </div>
          <div className="w-full">
            <UIFormLabel className="font-poppins text-sm font-medium text-[#333333]">
              House No.
            </UIFormLabel>
            <Controller
              control={control}
              name="houseNo"
              render={({ field, fieldState }) => {
                return (
                  <>
                    <UIFormInput
                      type="text"
                      placeholder="Flat,House no.,Building,Company"
                      value={field.value}
                      onChange={field.onChange}
                      className="rounded-xl border-gray-200 bg-gray-50 font-inter focus:border-[#00898F] focus:bg-white"
                    />
                    {fieldState.error && (
                      <p className="mt-1 text-xs text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </div>
          {/* div-3 */}
          <div className="flex flex-col gap-3 md:flex-row md:gap-6">
            {/* div-3-a */}
            <div className="w-full">
              <UIFormLabel className="font-poppins text-sm font-medium text-[#333333]">
                Landmark
              </UIFormLabel>
              <Controller
                control={control}
                name="landmark"
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <UIFormInput
                        className="rounded-xl border-gray-200 bg-gray-50 font-inter focus:border-[#00898F] focus:bg-white"
                        placeholder="Enter your landmark"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {fieldState.error && (
                        <p className="mt-1 text-xs text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  );
                }}
              />
            </div>
            {/* div-3-b */}
            <div className="w-full">
              <UIFormLabel className="font-poppins text-sm font-medium text-[#333333]">
                Pin code
              </UIFormLabel>
              <Controller
                control={control}
                name="pincode"
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <UIFormInput
                        type="text"
                        placeholder="Enter the pincode"
                        value={field.value}
                        onChange={field.onChange}
                        className="rounded-xl border-gray-200 bg-gray-50 font-inter focus:border-[#00898F] focus:bg-white"
                      />
                      {fieldState.error && (
                        <p className="mt-1 text-xs text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  );
                }}
              />
            </div>
          </div>

          {/* div-4 */}
          <div>
            <UIFormLabel className="font-poppins text-sm font-medium text-[#333333]">
              Locality
            </UIFormLabel>
            <Controller
              control={control}
              name="area"
              render={({ field, fieldState }) => {
                return (
                  <>
                    <UIFormInput
                      type="text"
                      placeholder="Add your locality"
                      value={field.value}
                      onChange={field.onChange}
                      className="rounded-xl border-gray-200 bg-gray-50 font-inter focus:border-[#00898F] focus:bg-white"
                    />
                    {fieldState.error && (
                      <p className="mt-1 text-xs text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </div>

          {/* div-5 */}
          <div>
            <UIFormLabel className="font-poppins text-sm font-medium text-[#333333]">
              Save Address as
            </UIFormLabel>
            <Controller
              control={control}
              name="addressType"
              defaultValue={initialValues.addressType}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <div className="flex flex-wrap gap-3 rounded-xl border border-gray-200 bg-white p-3">
                      <Badge
                        className="cursor-pointer"
                        onClick={() => handleBadgeClick("Work")}
                        variant={
                          badge === "Work" ? "selectedAddress" : "address"
                        }
                      >
                        Work
                      </Badge>
                      <Badge
                        className="cursor-pointer"
                        onClick={() => handleBadgeClick("Home")}
                        variant={
                          badge === "Home" ? "selectedAddress" : "address"
                        }
                      >
                        Home
                      </Badge>
                      <Badge
                        className="cursor-pointer"
                        onClick={() => handleBadgeClick("College")}
                        variant={
                          badge === "College" ? "selectedAddress" : "address"
                        }
                      >
                        College
                      </Badge>
                      <Badge
                        className="cursor-pointer"
                        onClick={() => handleBadgeClick("Others")}
                        variant={
                          badge === "Others" ? "selectedAddress" : "address"
                        }
                      >
                        Others
                      </Badge>
                    </div>
                  </>
                );
              }}
            />
          </div>
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              className="w-full rounded-xl bg-[#00898F] py-6 font-poppins text-base font-semibold shadow-[0_4px_14px_rgba(0,137,143,0.3)] hover:bg-[#007b80] hover:shadow-[0_6px_20px_rgba(0,137,143,0.4)] md:w-auto md:px-[60px]"
            >
              Save Address
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
