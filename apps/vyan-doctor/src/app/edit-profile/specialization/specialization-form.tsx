"use client";
import { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@repo/ui/src/@/components/button";
import SpecializationUserAction from "./specialization-user-action";
import { useToast } from "@repo/ui/src/@/components/use-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "~/app/components/loading-spinner";
import Multiselect from "multiselect-react-dropdown";
import React from "react";
interface ISpecialization {
  value: string;
  label: string;
}

interface ISpecializationForm {
  specializations: ISpecialization[];
}

const schema = z.object({
  specializations: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .nonempty("Please select at least one specialization."),
});

const SpecializationForm = ({
  preSpecialisations,
  specializations,
}: {
  preSpecialisations: ISpecialization[] | undefined;
  specializations: ISpecialization[];
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISpecializationForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      specializations: preSpecialisations,
    },
  });
  const [animal, setAnimal] = useState(null);
  const router = useRouter();
  const { toast } = useToast();
  const [loadingState, setLoadingState] = useState<boolean>(false);


  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  params.set("step", "4");
  const onSubmit = (data: { specializations: ISpecialization[] }) => {
    console.log("Form data:", data);
    SpecializationUserAction(data)
      .then((resp) => {
        toast({
          description: "Successfully added the specializations",
          variant: "default",
        });
        console.log(resp?.message);
        router.push(`/edit-profile/prices?${params.toString()}`);
      })
      .catch((err) => {
        toast({
          description: "Failed to add the specializations",
          variant: "destructive",
        });
        console.log(err.message);
      });
  };

  //   const handleChange = (value) => {
  //     console.log("value:", value);
  //     setAnimal(value);
  //   };
  // console.log("specialisations", specializations);

  useEffect(() => {
    params.set("step", "3");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  },[]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 font-inter text-lg font-semibold text-active md:leading-[30px] xl:mb-8 xl:text-2xl 2xl:text-[28px] 2xl:leading-[38px]">
        Specialization
      </div>
      <Controller
        control={control}
        name="specializations"
        render={({ field }) => {
          return (
            <>
              {/* <Select
                {...field}
                primaryColor=""
                isSearchable={true}
                // value={animal}
                value={field.value}
                // onChange={field.onChange}

                onChange={(value) => {
                  field.onChange(value);
                  console.log(value);
                  // setAnimal(value);
                }}
                isMultiple={true}
                placeholder="Add Your Speciality"
                options={specializations}
                classNames={{
                  searchBox: "bg-white w-full pl-10",
                  searchIcon: "absolute w-5 h-5 mt-1 pb-0.5 ml-2 text-gray-500",
                  tagItemIconContainer: "bg-black",
                  // menuButton: ({ isDisabled }) =>
                  //   `flex text-sm bg-white-500 text-gray-500 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                  //     isDisabled
                  //       ? "bg-white"
                  //       : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                  //   }`,
                  menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                  listItem: ({ isSelected }: any) =>
                    `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                      isSelected
                        ? `text-white bg-blue-500`
                        : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                    }`,
                }}
              /> */}

              <Multiselect
                placeholder="Select"
                className=" text-black"
                options={specializations} // Options to display in the dropdown
                selectedValues={field.value} // Preselected value to persist in dropdown
                onSelect={(selectedList, selectedItem) =>
                  field.onChange(selectedList)
                } // Update form state on select
                onRemove={(selectedList, removedItem) =>
                  field.onChange(selectedList)
                } // Update form state on remove
                displayValue="label" // Property name to display in the dropdown options
              />
              {errors && errors.specializations && (
                <p className="text-red-500">{errors.specializations.message}</p>
              )}
            </>
          );
        }}
      />
      {/* <Button
        type="submit"
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Save

        
      </Button> */}

      <div className="flex justify-end gap-[29px] ">
        <Button
          disabled={loadingState}
          type="submit"
          className="mt-4 rounded-md border border-primary bg-primary px-4 py-2 font-inter text-base font-medium text-white"
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
  );
};

export default SpecializationForm;
