export const calculateDiscountedPrice=(actualPrice:number,discountInCents:number | null,discountInPercentage:number | null)=>{
    let discountedPrice;
     if(discountInCents)
     {
       discountedPrice=actualPrice - discountInCents
     }
     else if(discountInPercentage){
   discountedPrice=actualPrice - ((actualPrice*discountInPercentage)/100);
     }
     return discountedPrice;
  }
  