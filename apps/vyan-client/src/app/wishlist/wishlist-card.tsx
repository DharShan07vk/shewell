"use client";
import { Button } from "@repo/ui/src/@/components/button";
import Image from "next/image";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

import addtoWishlist from "~/components/shared/product-card-action";
import AddToCart from "~/components/add-to-cart";
import { IProduct } from "~/models/product-model";
import { IReview } from "~/models/review.model";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import addToCart from "~/components/add-to-cart";
import { useCartStore } from "~/store/cart.store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/src/@/components/alert-dialog";
import {
  calculateDiscountedPrice,
  getDiscountString,
} from "~/lib/discountPrice";
import { startOfDay } from "date-fns";
import { useToast } from "@repo/ui/src/@/components/use-toast";
import { Trash2 } from 'lucide-react';
const WishlistCard = ({
  item,
  reviews,
}: {
  item: IProduct;
  reviews: IReview[];
}) => {
  const { toast } = useToast();
  const StarDrawing = (
    <path d="M15.1533 1.24496C14.6395 0.359428 13.3607 0.359425 12.8468 1.24496L9.2281 7.48137C8.97427 7.91882 8.53553 8.21734 8.03545 8.29287L1.2537 9.31717C0.114654 9.48921 -0.284892 10.9274 0.602182 11.6623L5.6543 15.8479C6.12196 16.2354 6.34185 16.8465 6.22825 17.4431L4.90669 24.3833C4.69778 25.4804 5.8495 26.3328 6.8377 25.8125L13.2236 22.4501C13.7096 22.1941 14.2905 22.1941 14.7766 22.4501L21.1625 25.8125C22.1507 26.3328 23.3024 25.4804 23.0935 24.3833L21.7719 17.4431C21.6583 16.8465 21.8782 16.2354 22.3459 15.8479L27.398 11.6623C28.285 10.9274 27.8855 9.48921 26.7465 9.31717L19.9647 8.29287C19.4646 8.21734 19.0259 7.91882 18.7721 7.48137L15.1533 1.24496Z" />
  );
  const { addToCart } = useCartStore((state) => {
    return {
      addToCart: state.addToCart,
    };
  });
  const customStyles = {
    itemShapes: StarDrawing,
    activeFillColor: "#00898F",
    inactiveFillColor: "#B5B5B5",
  };
  function handleWishlisting({
    id,
    slug,
  }: {
    id: string | undefined;
    slug: string | undefined;
  }) {
    addtoWishlist({ id, slug }).finally(() => {});
  }
  const router = useRouter();
  let productRatings: IReview[] = [];
  productRatings = reviews.filter((i) => i.productId === item.id);

  const totalRating = productRatings.reduce((total, item) => {
    return total + Number(item.rating);
  }, 0);
  const avgRating = totalRating
    ? (totalRating / productRatings.length).toFixed(2)
    : 0;

  const [selectedVariant, setSelectedVarient] = useState(
    item.productVariants && item.productVariants[0]?.id,
  );
  const [isProductAvailable, setIsProductAvailable] = useState<boolean>(false);
  const varients = item.productVariants?.find(
    (varient) => varient.id === selectedVariant,
  );
  // if (!varients) {
  //   toast({
  //     variant: "destructive",
  //     title: "There are no variants for this product",
  //   });
  //   router.push("/");
  // }
  useEffect(() => {
    if (varients) {
      const available =
        varients.productVariantInventory != null &&
        Number(varients.productVariantInventory.available) > 0;

      setIsProductAvailable(available);
    }
  }, [varients]);
  return (
    <>
      <div className="flex flex-col gap-4 rounded-md border-[2px] border-[#ECECEC] p-[18px]">
        <div className="">
          <div className="relative aspect-square w-full">
            <Image
              src={
                item.media[0]?.media.fileUrl ||
                "/product-fallback.png"
              }
              fill={true}
              alt="product-card"
              className={`rounded-md object-cover ${true ? "" : "opacity-50"}`}
            />
            <div className="absolute right-2 top-2">
              <button
                className=""
                onClick={() => {
                  handleWishlisting({ id: item.id, slug: item.slug });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-trash-2 "
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
              </button>
            </div>

          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <div className="font-inter text-base line-clamp-1	font-medium text-inactive 2xl:text-lg">
            {item.name}
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
            <div>{productRatings.length} Reviews</div>
          </div>
          <>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="rounded-md bg-black px-[70px] py-2 font-inter text-base font-medium text-white hover:bg-primary 2xl:text-lg ">
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
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full rounded-md md:w-1/2 xl:w-1/4">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex justify-start">
                    Select Product Variant
                  </AlertDialogTitle>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    {item.productVariants.map((varient) => (
                      <>
                        <button
                          className={`${selectedVariant === varient.id ? "bg-black text-white" : "bg-[#FEFEFE] text-black"} font-noto rounded-lg border border-[#9b9b9bd1] px-2 py-1 text-xs font-medium md:text-base lg:px-2.5 lg:py-1.5 lg:text-[18px]`}
                          key={varient.id}
                          onClick={() => setSelectedVarient(varient.id)}
                        >
                          {varient.name}
                        </button>
                      </>
                    ))}
                  </div>
                  {!isProductAvailable && (
                    <div className="text-sm text-red-500">
                      Not available right now
                    </div>
                  )}
                  <div className="flex flex-row items-center gap-2">
                    {/* Actual price after applying discount starts */}
                    <div className="flex items-center text-base font-semibold text-black-400">
                      {`₹ ${varients && calculateDiscountedPrice(varients.priceInCents, varients.discountInCents, varients.discountInPercentage, varients.discountEndDate) / 100}`}
                    </div>
                    {/* Actual price after applying discount ends */}

                    {/* Price without discount starts*/}

                    {varients &&
                      ((varients.discountEndDate &&
                        varients.discountEndDate >= startOfDay(new Date())) ||
                        !varients.discountEndDate) &&
                      (varients.discountInCents ||
                        varients.discountInPercentage) && (
                        <div className="flex  items-center text-sm font-semibold text-gray-300 line-through decoration-gray-300 2xl:text-base 2xl:font-normal">
                          {`₹ ${varients && varients?.priceInCents / 100}`}
                        </div>
                      )}

                    {/* Price without discount ends*/}

                    {/* discount in percentage starts*/}
                    {
                      <div className="text-sm font-semibold text-primary 2xl:text-base 2xl:font-normal">
                        {varients &&
                          getDiscountString(
                            varients.discountInCents,
                            varients.discountInPercentage,
                            varients.discountEndDate,
                          )}
                      </div>
                    }

                    {/* discount in percentage ends */}
                  </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  {isProductAvailable && (
                    <AlertDialogAction
                      className="flex items-center justify-center"
                      onClick={() => addToCart(item, 1, varients!)}
                    >
                      Done
                    </AlertDialogAction>
                  )}
                  {!isProductAvailable && (
                    <>
                      <AlertDialogAction className="disabled flex cursor-auto items-center justify-center opacity-75">
                        Done
                      </AlertDialogAction>
                    </>
                  )}
                  <AlertDialogCancel className="absolute right-4 top-4">
                    <svg
                      className="size-[12px]"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.0612 18.9387C21.343 19.2205 21.5013 19.6027 21.5013 20.0012C21.5013 20.3997 21.343 20.7819 21.0612 21.0637C20.7794 21.3455 20.3972 21.5038 19.9987 21.5038C19.6002 21.5038 19.218 21.3455 18.9362 21.0637L10.9999 13.125L3.0612 21.0612C2.7794 21.343 2.39721 21.5013 1.9987 21.5013C1.60018 21.5013 1.21799 21.343 0.936196 21.0612C0.654403 20.7794 0.496094 20.3972 0.496094 19.9987C0.496094 19.6002 0.654403 19.218 0.936196 18.9362L8.87494 11L0.938695 3.06122C0.656903 2.77943 0.498594 2.39724 0.498594 1.99872C0.498594 1.60021 0.656903 1.21802 0.938695 0.936225C1.22049 0.654432 1.60268 0.496123 2.0012 0.496123C2.39971 0.496123 2.7819 0.654432 3.0637 0.936225L10.9999 8.87497L18.9387 0.934975C19.2205 0.653182 19.6027 0.494873 20.0012 0.494873C20.3997 0.494873 20.7819 0.653182 21.0637 0.934975C21.3455 1.21677 21.5038 1.59896 21.5038 1.99747C21.5038 2.39599 21.3455 2.77818 21.0637 3.05997L13.1249 11L21.0612 18.9387Z"
                        fill="black"
                        fill-opacity="0.4"
                      />
                    </svg>
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        </div>
      </div>
    </>
  );
};

export default WishlistCard;

// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import AddToCart from "~/components/add-to-cart";
// // import BuyNowBtn from "../cart/shared/buy-now-btn";
// import addtoWishlist from "~/components/shared/product-card-action";
// import { IProductMedia } from "~/models/product-model";
// import { useRouter } from "next/navigation";
// import { calculateDiscountedPrice, getDiscountString } from "~/lib/discountedPrice";

// function WishlistCard({
//   item,
// }: {
//   item: {
//     id: string;
//     name: string;
//     slug: string;
//     media: IProductMedia[];
//     productVariants: {
//       id: string;
//       name: string;
//       priceInCents: number;
//       discountEndDate:Date | null;
//       discountInCents: number | null;
//       discountInPercentage: number | null;
//       productVariantInventory?: {
//         id: string;
//         available: number;
//         productVariantId: string;
//       } | null;
//     }[];
//   };
// }) {
//   const router=useRouter();
//   const [selectedVariant, setSelectedVarient] = useState(
//     item.productVariants && item.productVariants[0]?.id,
//   );
//   const [isProductAvailable, setIsProductAvailable] = useState<boolean>(false);
//   const varients = item.productVariants?.find(
//     (varient) => varient.id === selectedVariant,
//   );
// if(!varients)
// {
//   router.push('/');
// }
// useEffect(()=>{
//   if(varients)
//   {
//     const available =
//     varients.productVariantInventory != null &&
//     Number(varients.productVariantInventory.available) > 0;

//   setIsProductAvailable(available);
//   }

// },[varients])
//   function handleWishlisting({
//     id,
//     slug,
//   }: {
//     id: string | undefined;
//     slug: string | undefined;
//   }) {
//     addtoWishlist({ id, slug }).finally(() => {});
//   }

//   return (
//     <div className="w-full">
//       <div className="mb-3 flex w-full rounded-lg border border-[#2AA95233]">
//         <div className="relative border-r border-[#2AA95233] py-4 pl-1 pr-4 lg:p-10">
//           <div className="xs:h-24 relative aspect-[1/1] h-20 sm:h-[113px] md:h-40 lg:h-[125px] xl:h-[167px]">
//             <Image
//               fill={true}
//               src={
//                 item?.media[0]?.media.fileUrl ||
//                 "/images/products/product-fallback.png"
//               }
//               alt="product"
//             />
//           </div>
//         </div>
//         <div className="flex w-full flex-col justify-between p-2.5 lg:px-6 lg:py-5">
//           <div className="flex items-center justify-between">
//             {/*<div className="cursor-pointer rounded-sm bg-primary px-[5.5px] py-[2.5px] font-archivo text-[10px] font-medium leading-[12.46px] text-white xl:px-[10px] xl:py-[8px] xl:text-base">*/}
//             {/*  Buy 1 Get 1 Free*/}
//             {/*</div>*/}
//             <div></div>

//             <button
//               onClick={() => {
//                 handleWishlisting({ id: item.id, slug: item.slug });
//               }}
//             >
//               <svg
//                 width="25"
//                 height="25"
//                 viewBox="0 0 19 18"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   clipRule="evenodd"
//                   d="M7.80965 1.6875H10.3446C10.5074 1.6875 10.6491 1.6875 10.7826 1.7085C11.0427 1.75016 11.2894 1.8521 11.5029 2.00616C11.7165 2.16023 11.8911 2.36214 12.0126 2.59575C12.0756 2.71575 12.1199 2.85 12.1716 3.00375L12.2549 3.255C12.3123 3.45912 12.4373 3.63774 12.6093 3.7617C12.7814 3.88566 12.9903 3.94763 13.2021 3.9375H15.4521C15.6013 3.9375 15.7444 3.99676 15.8499 4.10225C15.9554 4.20774 16.0146 4.35082 16.0146 4.5C16.0146 4.64918 15.9554 4.79226 15.8499 4.89775C15.7444 5.00324 15.6013 5.0625 15.4521 5.0625H2.70215C2.55296 5.0625 2.40989 5.00324 2.3044 4.89775C2.19891 4.79226 2.13965 4.64918 2.13965 4.5C2.13965 4.35082 2.19891 4.20774 2.3044 4.10225C2.40989 3.99676 2.55296 3.9375 2.70215 3.9375H5.01965C5.21998 3.9327 5.41349 3.86383 5.57182 3.741C5.73015 3.61817 5.84495 3.44785 5.8994 3.255L5.9834 3.00375C6.0344 2.85 6.07865 2.71575 6.1409 2.59575C6.26254 2.36205 6.43722 2.16008 6.65094 2.00601C6.86466 1.85194 7.11148 1.75005 7.37165 1.7085C7.50515 1.6875 7.6469 1.6875 7.8089 1.6875H7.80965ZM6.83315 3.9375C6.88581 3.83436 6.92971 3.72699 6.9644 3.6165L7.0394 3.3915C7.10765 3.18675 7.1234 3.1455 7.13915 3.1155C7.17964 3.03751 7.23784 2.97008 7.30908 2.91864C7.38032 2.86719 7.46263 2.83315 7.5494 2.81925C7.64717 2.81099 7.74535 2.80874 7.8434 2.8125H10.3109C10.5269 2.8125 10.5719 2.814 10.6049 2.82C10.6916 2.83382 10.7739 2.86775 10.8451 2.91906C10.9163 2.97037 10.9746 3.03765 11.0151 3.1155C11.0309 3.1455 11.0466 3.18675 11.1149 3.39225L11.1899 3.61725L11.2191 3.70125C11.2484 3.78375 11.2829 3.86175 11.3211 3.9375H6.83315Z"
//                   fill="#CA0000"
//                 />
//                 <path
//                   d="M4.51365 6.33763C4.5037 6.18874 4.43502 6.0499 4.32271 5.95166C4.2104 5.85341 4.06366 5.80381 3.91478 5.81375C3.76589 5.8237 3.62705 5.89238 3.52881 6.00469C3.43056 6.117 3.38095 6.26374 3.3909 6.41263L3.7389 11.6266C3.80265 12.5881 3.8544 13.3651 3.9759 13.9756C4.10265 14.6094 4.31715 15.1389 4.76115 15.5536C5.2044 15.9691 5.7474 16.1484 6.38865 16.2316C7.00515 16.3126 7.78365 16.3126 8.74815 16.3126H9.4074C10.3712 16.3126 11.1504 16.3126 11.7669 16.2316C12.4074 16.1484 12.9504 15.9691 13.3944 15.5536C13.8377 15.1389 14.0522 14.6086 14.1789 13.9756C14.3004 13.3659 14.3514 12.5881 14.4159 11.6266L14.7639 6.41263C14.7738 6.26374 14.7242 6.117 14.626 6.00469C14.5277 5.89238 14.3889 5.8237 14.24 5.81375C14.0911 5.80381 13.9444 5.85341 13.8321 5.95166C13.7198 6.0499 13.6511 6.18874 13.6412 6.33763L13.2962 11.5126C13.2287 12.5229 13.1807 13.2264 13.0757 13.7551C12.9729 14.2689 12.8304 14.5404 12.6257 14.7324C12.4202 14.9244 12.1397 15.0489 11.6207 15.1164C11.0859 15.1861 10.3809 15.1876 9.36765 15.1876H8.78715C7.77465 15.1876 7.06965 15.1861 6.53415 15.1164C6.01515 15.0489 5.73465 14.9244 5.52915 14.7324C5.3244 14.5404 5.1819 14.2689 5.07915 13.7559C4.97415 13.2264 4.92615 12.5229 4.85865 11.5119L4.51365 6.33763Z"
//                   fill="#CA0000"
//                 />
//                 <path
//                   d="M7.14619 7.69031C7.29457 7.67544 7.44278 7.72009 7.55825 7.81446C7.67371 7.90883 7.74698 8.04519 7.76194 8.19356L8.13694 11.9436C8.14793 12.0899 8.10131 12.2347 8.00703 12.3471C7.91275 12.4595 7.77828 12.5307 7.63229 12.5453C7.4863 12.56 7.34036 12.5171 7.22559 12.4257C7.11081 12.3343 7.0363 12.2016 7.01794 12.0561L6.64294 8.30606C6.62807 8.15768 6.67273 8.00946 6.7671 7.894C6.86147 7.77854 6.99782 7.70527 7.14619 7.69031ZM11.0087 7.69031C11.1569 7.70527 11.2932 7.77844 11.3875 7.89373C11.4818 8.00903 11.5266 8.15705 11.5119 8.30531L11.1369 12.0553C11.1183 12.2006 11.0438 12.3329 10.9292 12.4241C10.8145 12.5153 10.6689 12.5582 10.5231 12.5436C10.3773 12.529 10.243 12.4582 10.1487 12.3462C10.0543 12.2341 10.0074 12.0897 10.0179 11.9436L10.3929 8.19356C10.4079 8.04533 10.4811 7.9091 10.5964 7.81475C10.7117 7.7204 10.8604 7.67565 11.0087 7.69031Z"
//                   fill="#CA0000"
//                 />
//               </svg>
//             </button>
//           </div>

//           <h3 className="mb-2 font-noto text-xs leading-[18px] text-secondary lg:mb-3.5 lg:text-base lg:leading-7 xl:text-lg 3xl:text-2xl">
//             {item.name}
//           </h3>
//           <div className=" flex flex-col ">
//             <div className=" flex items-center gap-2 sm:gap-4">

//                 <div className="flex items-center gap-[2px] lg:gap-[3px]">
//                   <h6 className="font-noto text-sm font-semibold leading-[18px] lg:text-2xl 3xl:text-4xl">
//                     {`₹ ${(varients && calculateDiscountedPrice(varients.priceInCents,varients.discountInCents,varients.discountInPercentage,varients.discountEndDate) || 0)/100}`}
//                   </h6>
//                 </div>

//                 {varients && (varients.discountInCents || varients.discountInPercentage) &&
//                 <div className="flex items-center gap-[2px] text-[#b8b8b8] line-through">
//                 <h6 className="text-[#9b9b9b] font-noto text-sm font-semibold leading-[18px] md:text-lg">
//                   {`₹${varients.priceInCents/100}`}
//                 </h6>
//               </div>
//               }
//               {varients && (varients.discountInCents || varients.discountInPercentage) && (
//                 <h6 className="font-archivo text-xs font-semibold leading-4 text-primary lg:text-lg 3xl:text-xl">
//                   {getDiscountString(varients.discountInCents,varients.discountInPercentage,varients.discountEndDate)}
//                 </h6>
//               )}

//             </div>
//             <div className="flex flex-wrap gap-1 py-3 lg:gap-3 lg:pb-4">
//               {item.productVariants.map((varient) => (
//                 <button
//                   className={`${selectedVariant === varient.id ? "bg-secondary text-white" : "bg-[#FEFEFE] text-secondary"} rounded-lg border border-[#9b9b9bd1] bg-[#FEFEFE] px-2 py-1 font-noto text-xs font-medium  hover:bg-secondary hover:text-white md:text-base lg:px-2.5 lg:py-1.5 lg:text-[18px]`}
//                   key={varient.id}
//                   onClick={() => setSelectedVarient(varient.id)}
//                 >
//                   {varient.name}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {isProductAvailable ? (
//             <>
//               <div className="flex flex-col items-start justify-between gap-2 sm:flex-row">
//                 <Link href="/cart">
//                   {" "}
//                   <AddToCart
//                     // TODO: fix ts-ignore
//                     // @ts-ignore
//                     product={item}
//                     selectedVariant={
//                       item.productVariants.find(
//                         (p) => p.id === selectedVariant,
//                       )!
//                     }
//                   />
//                 </Link>
//                 {/* {item.productVariants.find((p) => p.id === selectedVariant)
//                   ?.id && (
//                   <BuyNowBtn
//                     // TODO: fix ts-ignore
//                     // @ts-ignore
//                     product={item}
//                     selectedVariant={
//                       item.productVariants.find(
//                         (p) => p.id === selectedVariant,
//                       )!
//                     }
//                   />
//                 )} */}
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="flex w-fit justify-start ">
//                 <button className="flex cursor-auto items-center justify-center gap-3 rounded-lg border border-red-700 bg-transparent px-2 py-1 sm:px-2.5 sm:py-2 font-archivo text-xs sm:text-sm font-medium text-red-700  md:text-base lg:gap-4">
//                   Out of stock
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WishlistCard;
