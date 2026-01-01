"use client";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import Image from "next/image";
import CountUpdate from "~/components/count-update";
import { ICartLineItem } from "~/models/cart.model";
import { useCartStore } from "~/store/cart.store";
import { currencyFormatter } from "~/lib/currency";
import { calculateDiscountedPrice } from "~/lib/discountPrice";
export default function OverlayCartCard() {
  const { cart, removeFromCart } = useCartStore((state) => {
    return {
      cart: state.cart,
      removeFromCart: state.removeFromCart,
    };
  });

  return (
    <>
      {cart.lineItems.length > 0 &&
        cart.lineItems.map((item, index) => {
          const variant=item.product.productVariants[0];
          return (
            <div
              key={index}
              className="flex items-center gap-4 p-6 md:p-1 lg:p-6 "
            >
              <div className="sm:min-w-[100px] min-w-[150px] max-w-[150px] w-full">
                <div className="relative aspect-square w-full">
                  <Image
                    src={item.product.media[0]?.media.fileUrl || "/product-fallback.png"}
                    alt="Product image"
                    fill={true}
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col items-start gap-0.5">
                    <div className="text-black-200 mb-[.3125rem] xs:max-w-[150px] md:max-w-[200px] lg:max-w-[230px] truncate  text-ellipsis text-lg font-semibold ">
                      {item.product.name}
                    </div>
                    <div className=" font-inter text-sm text-black">
                      Units:{" "}
                      <span className="text-[#666666]">
                        {variant?.name}
                      </span>
                    </div>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      removeFromCart(item.product, item.productVariantId);
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 6H5H21"
                        stroke="#CA0000"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                        stroke="#CA0000"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10 11V17"
                        stroke="#CA0000"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14 11V17"
                        stroke="#CA0000"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-base font-semibold text-black-400">
                    {`₹ ${variant && calculateDiscountedPrice(variant.priceInCents,variant.discountInCents,variant.discountInPercentage,variant.discountEndDate)/100}`}
                  </div>
                  <CountUpdate item={item}  />
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
