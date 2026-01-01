import { IOrder } from "./order.model";
import { IProductVariant } from "./product.model";

export interface ILineItem {
  id: string;
  order: IOrder;
  orderId: string;
  productVariant: IProductVariant;
  productVariantId: string;
  perUnitPriceInCent: number;
  quantity: number;
  subTotal: number;
  discount: number;
  total: number;
}