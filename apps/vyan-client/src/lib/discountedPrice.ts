import { startOfDay } from "date-fns";

export const calculateDiscountedPrice = (
  actualPrice: number,
  discountInCents: number | null,
  discountInPercentage: number | null,
  discountEndDate: Date | null,
) => {
  if (discountEndDate && discountEndDate < startOfDay(new Date())) {
    console.log("actual prices comes as discountEndDate is less so no discount will apply",actualPrice)
    return actualPrice;
  }
  if (discountInCents) {
    console.log("discountInCents will apply",actualPrice - discountInCents)

    return actualPrice - discountInCents;
  }
  if (discountInPercentage) {
    console.log("discountInPercentage will apply", actualPrice - (actualPrice * discountInPercentage) / 100)
    return actualPrice - (actualPrice * discountInPercentage) / 100;
  }
  return actualPrice;
};

export const getDiscountAmountInCents = (
  actualPrice: number,
  discountInCents: number | null,
  discountInPercentage: number | null,
  discountEndDate: Date | null,
) => {
  if (!discountEndDate || discountEndDate < startOfDay(new Date())) {
    return 0;
  }
  if (discountInCents) {
    return discountInCents;
  }

  if (discountInPercentage) {
    return (actualPrice * discountInPercentage) / 100.0;
  }
};

export const getDiscountString = (
  discountInCents: number | null,
  discountInPercentage: number | null,
  discountEndDate: Date | null,
) => {
  if (discountEndDate && discountEndDate < startOfDay(new Date())) {
    return "";
  }
  if (discountInCents) {
    return `₹ ${(discountInCents / 100.0).toFixed(2)} off`;
  }

  if (discountInPercentage) {
    return `${discountInPercentage}% off`;
  }
};
