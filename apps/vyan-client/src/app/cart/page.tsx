"use server";
import { db } from "~/server/db";
import CartDetail from "./cart-detail";

const Cart = async() => {
  const reviews=await db.review.findMany({
    select:{
      id:true,
      rating:true,
      review:true,
      createdAt:true,
      productId:true,
      approved:true,
      user:{
        select:{
          id:true,
          name:true,
          email:true,
        }
      }
    }
  })

  return (
    <>
      <CartDetail review={reviews}/>
    </>
  );
};
export default Cart;
