"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Label } from "../../../components/ui/label";
import AddFormInput from "../../../components/address-form-input";
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

  console.log("states before fetching", states)
  useEffect(() => {
    fetchStates(selectedCountry).then((resp) => setStates(resp?.states));
    console.log("fetch states", states)
  }, [selectedCountry]);
  useEffect(() => {
    setValue("stateId", initialValues.stateId.toString());
    setValue("countryId", initialValues.countryId.toString());
    fetchStates(initialValues.countryId).then((resp) =>
      setStates(resp?.states),
    );
  }, [initialValues]);

  console.log('states after fetching', states)
  return (
    <>
      <form onSubmit={handleSubmit(submitForm, errorHandler)}>
        <div className="flex flex-col gap-3 md:gap-6">
          {/* div-1 */}
          <div>
            <Label>Country/ Region</Label>
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
                      <SelectTrigger className="w-full">
                        <SelectValue
                          className="tex-sm font-inter font-normal text-[#777777]"
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
                      <p className="text-sm text-red-500">
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
              <Label>State</Label>
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
                        <SelectTrigger className="w-full">
                          <SelectValue
                            className="tex-sm font-inter font-normal text-[#777777]"
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
                        <p className="text-sm text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  );
                }}
              />
            </div>

            <div className="w-full">
              <Label>City</Label>
              <Controller
                name="city"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <AddFormInput
                        type="city"
                        placeholder="Enter your city"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {fieldState.error && (
                        <p className="text-sm text-red-500">
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
              <Label>Name </Label>
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <AddFormInput
                        type="text"
                        placeholder="Enter your name"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {fieldState.error && (
                        <p className="text-sm text-red-500">
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
              <Label>Phone Number </Label>
              <Controller
                control={control}
                name="mobile"
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <AddFormInput
                        type="text"
                        placeholder="Enter your phone number"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {fieldState.error && (
                        <p className="text-sm text-red-500">
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
            <Label>House No. </Label>
            <Controller
              control={control}
              name="houseNo"
              render={({ field, fieldState }) => {
                return (
                  <>
                    <AddFormInput
                      type="text"
                      placeholder="Flat,House no.,Building,Company"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {fieldState.error && (
                      <p className="text-sm text-red-500">
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
              <Label>Landmark</Label>
              <Controller
                control={control}
                name="landmark"
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <AddFormInput
                        className="w-full rounded-md border border-[#E9E9E9] py-[11px] pl-[14px] font-inter text-sm font-normal text-active outline-primary placeholder:font-inter placeholder:text-sm placeholder:font-normal placeholder:text-[#777777]"
                        placeholder="Enter your landmark"
                        value={field.value}
                        onChange={field.onChange}
                      ></AddFormInput>
                      {fieldState.error && (
                        <p className="text-sm text-red-500">
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
              <Label>Pin code </Label>
              <Controller
                control={control}
                name="pincode"
                render={({ field, fieldState }) => {
                  console.log("fieldState", fieldState);
                  console.log("fieldState.error", fieldState.error);
                  return (
                    <>
                      <AddFormInput
                        type="text"
                        placeholder="Enter the pincode"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {fieldState.error && (
                        <p className="text-sm text-red-500">
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
            <Label>Locality</Label>
            <Controller
              control={control}
              name="area"
              render={({ field, fieldState }) => {
                return (
                  <>
                    <AddFormInput
                      type="text"
                      placeholder="Add your locality"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {fieldState.error && (
                      <p className="text-sm text-red-500">
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
            <Label>Save Address as</Label>
            <Controller
              control={control}
              name="addressType"
              defaultValue={initialValues.addressType}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <div className="flex flex-wrap gap-3 rounded-md border border-[#E9E9E9] py-[13px] pl-[14px] ">
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
              className=" bg-primary px-[51px] py-2 font-inter text-[14px] font-medium leading-6 shadow-[2px_2px_4px_0px_rgb(64,64,64,0.25)] "
            >
              Save Address
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
