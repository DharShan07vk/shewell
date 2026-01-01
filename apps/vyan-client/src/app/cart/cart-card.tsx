"use client";
import Image from "next/image";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@repo/ui/src/@/components/button";
import Link from "next/link";
import { ICartLineItem } from "~/models/cart.model";
import { useCartStore } from "~/store/cart.store";
import CountUpdate from "~/components/count-update";
import { currencyFormatter } from "~/lib/currency";
import { calculateDiscountedPrice, getDiscountString } from "~/lib/discountPrice";
import { startOfDay } from "date-fns";
import { IReview } from "~/models/review.model";
const CartCard = ({
  item,
  wishlist,
  cartEditable,
  review
}: {
  item: ICartLineItem;
  wishlist: boolean;
  cartEditable?: boolean;
  review:IReview[];
}) => {
  const StarDrawing = (
    <path d="M15.1533 1.24496C14.6395 0.359428 13.3607 0.359425 12.8468 1.24496L9.2281 7.48137C8.97427 7.91882 8.53553 8.21734 8.03545 8.29287L1.2537 9.31717C0.114654 9.48921 -0.284892 10.9274 0.602182 11.6623L5.6543 15.8479C6.12196 16.2354 6.34185 16.8465 6.22825 17.4431L4.90669 24.3833C4.69778 25.4804 5.8495 26.3328 6.8377 25.8125L13.2236 22.4501C13.7096 22.1941 14.2905 22.1941 14.7766 22.4501L21.1625 25.8125C22.1507 26.3328 23.3024 25.4804 23.0935 24.3833L21.7719 17.4431C21.6583 16.8465 21.8782 16.2354 22.3459 15.8479L27.398 11.6623C28.285 10.9274 27.8855 9.48921 26.7465 9.31717L19.9647 8.29287C19.4646 8.21734 19.0259 7.91882 18.7721 7.48137L15.1533 1.24496Z" />
  );
  const customStyles = {
    itemShapes: StarDrawing,
    activeFillColor: "#00898F",
    inactiveFillColor:"#B5B5B5",
  };

  const { removeFormCart } = useCartStore((state) => {
    return {
      removeFormCart: state.removeFromCart,
    };
  });

  let productRatings:IReview[]=[];
  productRatings=review.filter((i)=>i.productId === item.product.id)

  const totalRating=productRatings.reduce((total,item)=>{
      return total+ Number(item.rating)
  },0);

  const avgRating=totalRating ? (totalRating/productRatings.length).toFixed(2):0;

  const productVariant=item.product.productVariants.find((p)=>p.id === item.productVariantId)
  return (
    <>
      {item && (
        <div className="flex gap-4 px-2 py-3 shadow-[0px_2px_6px_0px_rgba(77,77,77,0.15)] md:gap-5">
          {/* 1st div */}
          <div className="">
            <div className="w-[100px] md:w-[180px]">
              <div className="relative aspect-square w-full">
                <Image
                  src={item.product.media[0]?.media.fileUrl || "/product-fallback.png"}
                  alt="prod-img"
                  fill={true}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          {/* 2nd div */}
          <div className="flex flex-col gap-[6px]">
            <div className="font-inter text-base font-semibold text-inactive md:text-lg">
              {item.product.name}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center border-r border-black-500 pr-2 md:text-base ">
                <Rating
                  readOnly={true}
                  style={{ maxWidth: 95 }}
                  value={parseFloat(avgRating.toString())}
                  itemStyles={customStyles}
                />
                <span className="ml-1 font-inter text-base font-medium text-black-500">
                  {avgRating}

                </span>
              </div>
              <div className="font-inter text-sm font-normal text-inactive md:text-base">
                {productRatings.length} reviews
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="font-inter text-lg font-medium text-black-500">
                {`₹ ${productVariant && calculateDiscountedPrice(productVariant.priceInCents,productVariant.discountInCents,productVariant.discountInPercentage,productVariant.discountEndDate)/100}`}
              </div>

              {productVariant && ((productVariant.discountEndDate && productVariant.discountEndDate>=startOfDay(new Date())) || !productVariant.discountEndDate) && (productVariant.discountInCents || productVariant.discountInPercentage) && (
 <div className="font-inter font-semibold text-sm md:text-base 2xl:font-normal text-gray-300 flex items-center line-through decoration-gray-300">
 {`₹ ${productVariant.priceInCents/100}`}
</div>
              )}


              <div className="font-inter text-lg font-semibold text-primary">
              {`${productVariant && getDiscountString(productVariant.discountInCents,productVariant.discountInPercentage,productVariant.discountEndDate)}`}
              </div>
            </div>

            <CountUpdate item={item} />

            <div className="flex items-center gap-[6px]">
              <Link
                className=" border-r border-black-500 pr-1 font-inter text-sm font-normal text-inactive md:text-base"
                href={""}
              >
                Save for later
              </Link>
              <div
                className="cursor-pointer"
                onClick={() => {
                  removeFormCart(item.product, item.productVariantId);
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 5H4.16667H17.5"
                    stroke="#CA0000"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.66797 5.00008V3.33341C6.66797 2.89139 6.84356 2.46746 7.15612 2.1549C7.46868 1.84234 7.89261 1.66675 8.33464 1.66675H11.668C12.11 1.66675 12.5339 1.84234 12.8465 2.1549C13.159 2.46746 13.3346 2.89139 13.3346 3.33341V5.00008M15.8346 5.00008V16.6667C15.8346 17.1088 15.659 17.5327 15.3465 17.8453C15.0339 18.1578 14.61 18.3334 14.168 18.3334H5.83464C5.39261 18.3334 4.96868 18.1578 4.65612 17.8453C4.34356 17.5327 4.16797 17.1088 4.16797 16.6667V5.00008H15.8346Z"
                    stroke="#CA0000"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.33203 9.16675V14.1667"
                    stroke="#CA0000"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.668 9.16675V14.1667"
                    stroke="#CA0000"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default CartCard;
