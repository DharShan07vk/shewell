"use client";

import { useCartStore } from "~/store/cart.store";
import CartCard from "./cart-card";
import OrderSummary from "~/components/order-summary";
import { IReview } from "~/models/review.model";
import { api } from "~/trpc/react";
import { useEffect } from "react";

const CartDetail = ({ review }: { review: IReview[] }) => {
  const { cart, updateCartLineItem } = useCartStore((state) => {
    return {
      cart: state.cart,
      updateCartLineItem: state.updateCartLineItem,
    };
  });

  const getUpdatedCartItems = api.cart.getUpdatedCartItems.useQuery(
    {
      cartLineItems: cart.lineItems.map((l) => ({
        productId: l.product.id,
        productVariantId: l.productVariantId,
      })),
      couponId: cart.coupon?.id,
    },
    {
      enabled: cart.lineItems.length > 0,
    },
  );

  useEffect(() => {
    if (!getUpdatedCartItems.data) {
      return;
    }

    const products = cart.lineItems
      .filter(
        (lineItem) =>
          !!getUpdatedCartItems.data.products.find(
            (p) => p.id === lineItem.product.id,
          ),
      )
      .map((lineItem) => {
        const product = getUpdatedCartItems.data.products.find(
          (p) => p.id === lineItem.product.id,
        );
        return {
          product: product!,
          productVariantId: lineItem.productVariantId,
        };
      });
    const updatedProducts = products.map((item) => ({
      ...item,
      product: {
        ...item.product,
        avgRating: item.product.avgRating.toString(),
      },
    }));
    updateCartLineItem(updatedProducts as any, getUpdatedCartItems.data.coupon as any);
  }, [getUpdatedCartItems.data]);
  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col gap-[40px] py-14 xl:flex-row">
          <div className="grid grid-cols-1 gap-4 xl:basis-[741px] 2xl:basis-[946px]">
            {cart.lineItems.map((item, index) => {
              return (
                <>
                  <CartCard item={item} wishlist={false} review={review} />
                </>
              );
            })}
          </div>

         {
          cart.lineItems.length > 0 &&  <div className="flex flex-col gap-5 rounded-md border border-border-color px-3 py-4 xl:basis-[499px] 2xl:basis-[546px] 2xl:gap-[28px] ">
          {/* div-1 */}
        {cart.lineItems.length > 0  && <OrderSummary text="Go to checkout" /> }
        </div>
         }
        </div>

      {
        cart.lineItems.length < 0 &&   <div className="flex items-center justify-center mb-10">
        There are no items in the cart
      </div>
      }
      </div>
    </>
  );
};

export default CartDetail;
