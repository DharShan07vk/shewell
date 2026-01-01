import { ICategory } from './category.model';
import { IOrder } from './order.model';
import { IProduct } from './product.model';
import { IUser } from './user.model';

export type ICoupon = {
  id: string;
  code: string;
  amount: number;
  isPercent: boolean;
  description: string;
  newUser: boolean;
  createdAt: Date;
  expiresAt: Date;
  updatedAt: Date;
  numberOfTime: number;
  categoryIds: string[] | null;
  categories:
    | {
        id: string;
        name: string;
      }[]
    | null;
  productIds: string[] | null;
  products:
    | {
        id: string;
        name: string;
      }[]
    | null;
  users?:
    | {
        id: string;
        firstName: string;
        lastName: string | null;
      }[]
    | null;
  order?: {
    id: string;
    userId: string;
  } | null;
  orderId?: string | null;
  active: boolean;
};
