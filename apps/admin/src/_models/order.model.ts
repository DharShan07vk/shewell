import { ICoupon } from "./coupon.model"
import { ILineItem } from "./line-item.model"
import { IUser } from "./user.model"

export type IOrder={
    id:string,
    user: IUser,
    userId:string,
    status: OrderStatus,
    subTotalInCent: number,
    taxes:number,
    delivery_fees:number,
    total:number,
    coupan: ICoupon,
    lineItems: ILineItem[]
}
export enum OrderStatus {
    CART = 'CART',
    PAYMENT_SUCCESSFUL = 'PAYMENT_SUCCESSFUL',
    PAYMENT_PENDING = 'PAYMENT_PENDING',
    PAYMENT_FAILED = 'PAYMENT_FAILED',
    OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
    CANCELLED = 'CANCELLED',
    RETURNED = 'RETURNED',
  }
