import { ICoupon } from "./coupon.model";
import { IProduct } from "./product-model";
export type IOrderDetail = {
    id: string;
    userId: string;
    status: string;
    discountInCent:number|null;
    cancelledDate : Date | null;
    orderPlaced:Date | null;
      expectedDelivery:Date | null;
    subTotalInCent: number;
    taxesInCent: number;
    deliveryFeesInCent: number;
    totalInCent: number;
    addressId: string;
    lineItems: IActiveLineItem[];
    address: IActiveAddress;
    couponId: null | string;
   coupon:{
      id:string;
      isPercent:boolean
      code:string;
      amount:number
   } | null
  };

  export type IActiveLineItem = {
    id: string;
    orderId: string;
    productVariantId: string;
    perUnitPriceInCent: number;
    quantity: number;
    subTotalInCent: number;
    discountInCent: number;
    totalInCent: number;
    productVariant: {
      id: string;
      name: string;
      productId: string;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
      discountEndDate:Date | null;
      priceInCents:number;
      discountInCents:number | null;
      discountInPercentage:number | null;
      product: IProduct | null ;
      productVariantInventory: {
        id: string;
        available: number;
        productVariantId: string;
      } | null;

    };
  };

  export type IActiveAddress = {
    id: string;
    name: string;
    houseNo:string;
    mobile: string;
    area: string;
    city: string;
    countryId: string;
    stateId: string;
    landmark: string;
    pincode: string;
    addressType: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    userId: string;
  };
