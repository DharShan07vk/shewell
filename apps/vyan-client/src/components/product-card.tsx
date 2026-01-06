"use client";
import { Button } from "@repo/ui/src/@/components/button";
import Image from "next/image";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

import { useRouter } from "next/navigation";
import WishlistBtn from "./shared/wishlist-btn";
import { IProduct } from "~/models/product-model";

import { useCartStore } from "~/store/cart.store";
import { currencyFormatter } from "~/lib/currency";
import {
  calculateDiscountedPrice,
  getDiscountString,
} from "~/lib/discountPrice";
import { startOfDay } from "date-fns";
import { IReview } from "~/models/review.model";
interface IProductProps {
  productCard: IProduct;
}

const ProductCard = ({ productCard }: IProductProps) => {
  const router = useRouter();
  const StarDrawing = (
    <path d="M15.1533 1.24496C14.6395 0.359428 13.3607 0.359425 12.8468 1.24496L9.2281 7.48137C8.97427 7.91882 8.53553 8.21734 8.03545 8.29287L1.2537 9.31717C0.114654 9.48921 -0.284892 10.9274 0.602182 11.6623L5.6543 15.8479C6.12196 16.2354 6.34185 16.8465 6.22825 17.4431L4.90669 24.3833C4.69778 25.4804 5.8495 26.3328 6.8377 25.8125L13.2236 22.4501C13.7096 22.1941 14.2905 22.1941 14.7766 22.4501L21.1625 25.8125C22.1507 26.3328 23.3024 25.4804 23.0935 24.3833L21.7719 17.4431C21.6583 16.8465 21.8782 16.2354 22.3459 15.8479L27.398 11.6623C28.285 10.9274 27.8855 9.48921 26.7465 9.31717L19.9647 8.29287C19.4646 8.21734 19.0259 7.91882 18.7721 7.48137L15.1533 1.24496Z" />
  );
  const customStyles = {
    itemShapes: StarDrawing,
    activeFillColor: "#00898F",
    inactiveFillColor: "#B5B5B5",
  };
  const { addToCart, setSheetIsOpen } = useCartStore((state) => {
    return {
      addToCart: state.addToCart,
      setSheetIsOpen: state.setSheetIsOpen,
    };
  });
  const variant = productCard.productVariants[0];
 

  //whether the product is availble is not
  const isProductAvailable =
    variant?.productVariantInventory !== null &&
    Number(variant?.productVariantInventory?.available) > 0;

 
  let productRatings: IReview[] = [];

  const totalRating = productRatings.reduce((total, item) => {
    return total + Number(item.rating);
  }, 0);
  const avgRating = totalRating
    ? (totalRating / productRatings.length).toFixed(2)
    : 0;
  return (
    <>
      {productCard && (
        <div
          className="cursor-pointer"
          onClick={() => router.push(`/products/${productCard.slug}`)}
        >
          <div className="flex flex-col gap-4 rounded-md border-[2px] border-[#ECECEC] p-[18px]">
            {/* <div className="w-[355px] md:w-[300px] lg:w-[250px] 2xl:w-[280px]"> */}
            <div className="relative aspect-square w-full">
              <Image
                src={
                  productCard.media[0]?.media.fileUrl ||
                  "/product-fallback.png"
                }
                fill={true}
                alt="product-card"
                className="rounded-md object-cover"
              />
              <div className="absolute right-[10px] top-[10px]">
                <WishlistBtn product={productCard} />
              </div>
            </div>
            {/* </div> */}

            <div className="flex flex-col gap-[6px]">
              <div className="font-inter text-base line-clamp-1	font-medium text-inactive 2xl:text-lg">
                {productCard.name}
              </div>

              <div className="flex gap-4">
                <div className="font-inter text-lg font-semibold	text-active">
                  {`₹ ${variant && calculateDiscountedPrice(variant.priceInCents, variant.discountInCents, variant.discountInPercentage, variant.discountEndDate) / 100}`}
                </div>

                {variant &&
                  ((variant.discountEndDate &&
                    variant.discountEndDate >= startOfDay(new Date())) ||
                    !variant.discountEndDate) &&
                  (variant.discountInCents || variant.discountInPercentage) && (
                    <div className="flex items-center font-inter text-sm font-semibold text-gray-300 line-through decoration-gray-300 2xl:text-base 2xl:font-normal">
                      {`₹ ${variant && variant?.priceInCents / 100}`}
                    </div>
                  )}

                <div className="inline">
                  {variant &&
                    getDiscountString(
                      variant.discountInCents,
                      variant.discountInPercentage,
                      variant.discountEndDate,
                    )}
                </div>
              </div>

              <div className="flex items-center gap-2 font-inter text-sm font-medium text-black-400 2xl:text-base	">
                <div className="inline">
                  <Rating
                    readOnly={true}
                    style={{ maxWidth: 95 }}
                    value={parseFloat(avgRating.toString())}
                    itemStyles={customStyles}
                  />
                </div>
                <div>{avgRating}</div>
                <div className="text-primary">|</div>
                <div>{`${productRatings.length} reviews`}</div>
              </div>
            </div>

            {/* <AddToCart /> */}
            {isProductAvailable ? (
              <>
                <div className="flex items-center justify-between">
                  <Button
                    className="rounded-md bg-black px-[70px] py-2 font-inter text-base font-medium text-white hover:bg-primary 2xl:text-lg "
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      setSheetIsOpen(true);
                      addToCart(
                        productCard,
                        1,
                        productCard.productVariants[0]!,
                      );
                    }}
                  >
                    <svg
                      className="mr-[10px]"
                      width="19"
                      height="20"
                      viewBox="0 0 19 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.37 6.03703C18.1392 5.68469 17.7658 5.46455 17.3456 5.4332L3.52114 4.40046L3.21527 2.89761C3.16478 2.64944 2.94658 2.47119 2.69328 2.47119H0.94185C0.647633 2.47119 0.40918 2.70964 0.40918 3.00386C0.40918 3.29808 0.647633 3.53653 0.94185 3.53653H2.25813L4.08779 12.5277L3.67178 13.4245C3.47758 13.843 3.5099 14.325 3.7582 14.714C3.85586 14.867 3.98098 14.9952 4.12455 15.0951C3.93077 15.3497 3.81536 15.6673 3.81536 16.0113C3.81536 16.8472 4.49534 17.5272 5.33125 17.5272C6.16715 17.5272 6.84714 16.8472 6.84714 16.0113C6.84714 15.7684 6.78943 15.5387 6.68734 15.335H11.8356C11.7337 15.5388 11.676 15.7684 11.676 16.0113C11.676 16.8472 12.356 17.5272 13.1917 17.5272C14.0276 17.5272 14.7078 16.8472 14.7078 16.0113C14.7078 15.7684 14.6499 15.5387 14.548 15.335H14.761C15.0553 15.335 15.2937 15.0964 15.2937 14.8024C15.2937 14.5082 15.0553 14.2697 14.761 14.2697H4.89152C4.75336 14.2697 4.68081 14.1795 4.65612 14.1407C4.63128 14.1019 4.5801 13.9982 4.63822 13.873L4.98487 13.1257H15.4964C16.0673 13.1257 16.5774 12.7635 16.7656 12.2246L18.5148 7.21737C18.6537 6.81967 18.601 6.38937 18.37 6.03703ZM5.33125 16.4618C5.08281 16.4618 4.8807 16.2597 4.8807 16.0113C4.8807 15.7628 5.08281 15.5606 5.33125 15.5606C5.57969 15.5606 5.7818 15.7628 5.7818 16.0113C5.7818 16.2597 5.57969 16.4618 5.33125 16.4618ZM13.1917 16.4618C12.9433 16.4618 12.7412 16.2597 12.7412 16.0113C12.7412 15.7628 12.9433 15.5606 13.1917 15.5606C13.4402 15.5606 13.6424 15.7628 13.6424 16.0113C13.6424 16.2597 13.4402 16.4618 13.1917 16.4618ZM17.5091 6.866L15.7599 11.8732C15.7208 11.9852 15.6148 12.0604 15.4964 12.0604H5.07989L3.74184 5.48536L17.2663 6.49549C17.3857 6.5045 17.4509 6.57789 17.479 6.62089C17.5072 6.66389 17.5487 6.75295 17.5091 6.866Z"
                        fill="white"
                      />
                    </svg>
                    Add to Cart
                  </Button>
                </div>
              </>
            ) : (
              <>
                <button className="flex py-2 w-full cursor-auto items-center justify-center gap-3 rounded-lg border border-red-700 bg-transparent font-inter  text-base font-medium text-red-700   lg:gap-4">
                  Out of stock
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
