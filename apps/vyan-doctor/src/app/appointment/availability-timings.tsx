"use client";

import {
  UseFormSetValue,
  UseFormWatch,
  Control,
  useFieldArray,
  Controller,
  UseFormGetValues,
  FieldError,
} from "react-hook-form";

import { Time } from "@internationalized/date";

import {
  TimeField,
  Label,
  DateInput,
  DateSegment,
} from "react-aria-components";
import { IAvailability } from "~/models/availability.model";

interface IAvailabilityError {
  availability?: {
    [index: number]: {
      availableTimings?: {
        [slotIndex: number]: {
          startingTime?: FieldError;
          endingTime?: FieldError;
        };
      };
    };
  };
}
const AvailabilityTimings = ({
  watch,
  index,
  control,
  setValue,
  getValues,
  errors,
}: {
  watch: UseFormWatch<IAvailability>;
  index: number;
  control: Control<IAvailability>;
  setValue: UseFormSetValue<IAvailability>;
  getValues: UseFormGetValues<IAvailability>;
  errors?: IAvailabilityError;
}) => {
  const { fields } = useFieldArray({
    control,
    name: `availability.${index}.availableTimings`,
  });

  const addTiming = (dayIndex: number) => {
    const updatedAvailability = getValues("availability");
    updatedAvailability[dayIndex]?.availableTimings.push({
      startingTime: new Time(15, 0), 
      endingTime: new Time(16, 0),  
    });
    setValue("availability", updatedAvailability);
  };

  const removeTiming = (dayIndex: number, slotIndex: number) => {
    const updatedAvailability = getValues("availability");
    updatedAvailability[dayIndex]?.availableTimings.splice(slotIndex, 1);
    setValue("availability", updatedAvailability);
  };

  return (
    <div className="flex flex-col gap-2">
      {fields.map((field, slotIndex) => (
        <div key={field.id} className="flex items-center gap-2">
          <Controller
            name={`availability.${index}.availableTimings.${slotIndex}.startingTime`}
            control={control}
            render={({ field }) => (
              <>
                <TimeField
                  hourCycle={12}
                  defaultValue={new Time(9, 0)}
                  value={new Time(field.value?.hour, field.value?.minute)}
                  onChange={field.onChange}
                >
                  <DateInput className="flex rounded-[6px] border px-4 py-2 ">
                    {(segment) => <DateSegment segment={segment} />}
                  </DateInput>
                  
                </TimeField>
              </>
            )}
          />
          {/* <input aria-label="Time" type="time" /> */}
          <div>-</div>
          <Controller
            name={`availability.${index}.availableTimings.${slotIndex}.endingTime`}
            control={control}
            render={({ field }) => (
              <TimeField
                hourCycle={12}
                defaultValue={new Time(10, 0)}
                value={new Time(field.value?.hour, field.value?.minute)}
                onChange={field.onChange}
              >
                <DateInput className="flex rounded-[6px] border px-4 py-2 ">
                  {(segment) => <DateSegment segment={segment} />}
                </DateInput>
              </TimeField>
            )}
          />
          {errors?.availability?.[index]?.availableTimings?.[slotIndex]
            ?.startingTime && (
            <span className="text-red-600">
              Starting time must be less than ending time.
            </span>
          )}
          {slotIndex + 1 === fields.length ? (
            <div className="flex gap-2">
              {slotIndex > 0 && (
                <svg
                  className="cursor-pointer"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => removeTiming(index, slotIndex)}
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
                className="cursor-pointer"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => addTiming(index)}
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
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.1641 18H23.8307"
                  stroke="#121212"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          ) : (
            <svg
              className="cursor-pointer"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => removeTiming(index, slotIndex)}
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
      ))}
    </div>
  );
};

export default AvailabilityTimings;
