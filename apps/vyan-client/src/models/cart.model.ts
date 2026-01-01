import { IAddress } from "./address.model";
import { ICoupon } from "./coupon.model";
import { IProduct } from "./product-model";

export type ICartLineItem = {
    product: IProduct;
    productVariantId: string;
    perUnitPriceInCent: number;
    quantity: number;
    subTotalInCent: number;
    discountInCent: number;
    totalInCent: number;
    // discountPrice: number
  };
  
  export type ICart = {
    lineItems: ICartLineItem[];
    coupon?: ICoupon;
    subTotalInCent: number;
    taxesInCent: number;
    deliveryFeesInCent: number;
    totalInCent: number;
    address?: IAddress;
    discountInCent:number;
  };
  