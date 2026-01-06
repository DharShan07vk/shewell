"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@repo/ui/src/@/components/sheet";
import { Button } from "@repo/ui/src/@/components/button";
import OverlayCartCard from "~/app/cart/overlay-cart-card";
// import { useCartOldStore } from "~/store/cart.store";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "~/store/cart.store";
import ApplyCoupon from "./shared/apply-coupon";
const CardSheet = () => {
  // const { sheetIsOpen, setSheetIsOpen } = useCartOldStore();
  const { cart, sheetIsOpen, setSheetIsOpen } = useCartStore((state) => {
    return {
      cart: state.cart,
      sheetIsOpen: state.sheetIsOpen,
      setSheetIsOpen: state.setSheetIsOpen,
    };
  });
  return (
    <>
      <Sheet open={sheetIsOpen} onOpenChange={(e: boolean) => setSheetIsOpen(e)}>
        <SheetContent side="signup" className="overflow-y-scroll   bg-white p-0 ">
          <SheetHeader>
            <SheetTitle>
              <div
                className="flex items-center justify-between border-b border-b-[#A1A1A1] px-[38px]
                 py-[30px] "
              >
                <div className="flex gap-6">
                  <SheetClose>
                    <svg
                      width="32"
                      height="33"
                      viewBox="0 0 32 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="16"
                        cy="16.5"
                        r="15.5094"
                        fill="white"
                        stroke="#E5E6E8"
                        stroke-width="0.981299"
                      />
                      <path
                        d="M18.8125 10.8752L13.1875 16.5002L18.8125 22.1252"
                        stroke="#4D4D4D"
                        stroke-width="1.57008"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </SheetClose>
                  <div className="font-poppins text-4xl font-semibold">
                    Cart
                  </div>
                </div>
                <div className="font-inter text-lg font-normal">
                  <span className="text-2xl font-medium">
                    {cart.lineItems.length}{" "}
                  </span>
                  Items(s)
                </div>
              </div>
            </SheetTitle>
            {cart.lineItems.length > 0 ? (
              <div className="mt-9 pb-0 ">
                <div className=" max-h-[400px] overflow-y-auto">
                  <div className="mb-10 px-[38px]">
                    <div className="rounded-md border border-[#E5E5E5]">
                      <OverlayCartCard />
                    </div>
                  </div>
                  {/* <div className="mb-6 px-[38px]">
                  <div className="flex items-center justify-between">
                    <div className="font-inter text-2xl font-semibold text-black-300">
                      Continue Shopping
                    </div>
                    <ViewAll />
                  </div>
                </div> */}
                  <div className="px-[38px] w-full">
                    <div className="mb-[18px] flex flex-col gap-3 lg:gap-2 xl:mb-5 2xl:mb-[28px] w-full">
                      <ApplyCoupon appliedCoupon={cart.coupon?.code} />
                     
                    </div>
                  </div>
                </div>
                <div className="flex  justify-center items-center  w-full">
                  <SheetFooter className="absolute bottom-0 w-full  shadow-[-2px_0px_12px_0px_rgba(89,89,89,0.15)]  bg-white">
                    <div className="px-[50px] py-5 justify-center max-w-full w-full">
                      <div className="mb-5 flex flex-col gap-8">
                        <div className="flex items-center justify-between gap-8">
                          <div className="font-inter text-2xl font-normal text-black-300">
                            Sub Total
                          </div>
                          <div className="textblack-200 font-inter text-2xl font-medium">
                            {`₹ ${cart.subTotalInCent / 100}`}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="font-inter text-2xl font-bold text-black-300">
                            Total
                          </div>
                          <div className="textblack-200 font-inter text-2xl font-medium">
                            {`₹ ${cart.totalInCent / 100}`}
                          </div>
                        </div>
                      </div>
                      <div className=" flex items-center justify-center">
                        <Link href="/checkout">
                          <Button
                            onClick={() => setSheetIsOpen(false)}
                            className="flex w-fit items-center justify-center bg-black font-inter text-base font-medium hover:bg-primary py-[17px] px-[100px] md:px-[156px]"
                          >
                            Go to Checkout
                            <svg
                              className="ml-1"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_1939_3209)">
                                <path
                                  d="M0.909061 9.09085H16.8962L13.9026 6.09727C13.5476 5.7423 13.5476 5.16667 13.9026 4.81164C14.2576 4.45667 14.8332 4.45667 15.1883 4.81164L19.7337 9.35709C20.0888 9.71206 20.0888 10.2877 19.7337 10.6427L15.1883 15.1882C15.0107 15.3657 14.7781 15.4545 14.5454 15.4545C14.3128 15.4545 14.0801 15.3657 13.9026 15.1882C13.5476 14.8332 13.5476 14.2576 13.9026 13.9025L16.8962 10.909H0.909061C0.407 10.909 -3.05176e-05 10.502 -3.05176e-05 9.99994C-3.05176e-05 9.49788 0.407 9.09085 0.909061 9.09085Z"
                                  fill="white"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1939_3209">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="matrix(-1 0 0 1 20 0)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </SheetFooter>
                </div>
              </div>
            ) : (
              <>
                <SheetDescription className="mt-9 flex flex-col items-center justify-center gap-[13px]">
                  <div className="relative ">
                    <Image
                      src="/shopping-bag.png"
                      width={48}
                      height={48}
                      className="aspect-square"
                      alt="shopping bag"
                    />
                  </div>
                  <div className="font-poppins text-lg font-normal text-[#4A4747]">
                    No item in your cart
                  </div>
                </SheetDescription>
              </>
            )}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};
export default CardSheet;
