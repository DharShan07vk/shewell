import { startOfDay } from "date-fns"

export const calculateDiscountedPrice=(priceInCents:number , discountInCents:number | null , discountInPercentage:number  | null, discountEndDate:Date | null)=>{
  if(discountEndDate && discountEndDate < startOfDay(new Date()))
    return priceInCents;
 else if(discountInCents)
 {
    return (priceInCents-discountInCents);
 }
 else if(discountInPercentage)
 {
    return (priceInCents-(priceInCents*discountInPercentage)/100);
 }
 else
  return priceInCents;
}

export const getDiscountString=(discountInCents:number | null , discountInPercentage:number | null , discountEndDate:Date | null)=>{
    if(discountEndDate && discountEndDate< startOfDay(new Date()))
        return "";
  if(discountInCents)
  {
    return `₹ ${discountInCents/100} off`
  }
  else if(discountInPercentage)
  {
    return `${discountInPercentage}% off`
  }
  else
  return "";
}