"use client";
import Link from "next/link";
import { Button } from "@repo/ui/src/@/components/button";
import { centsToRupee, currencyFormatter } from "~/lib/currency";
import { useCartStore } from "~/store/cart.store";
import Razorpay from "razorpay";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "@repo/ui/src/@/components/use-toast";
import {
  startBuyingProducts,
  updateProductStatus,
} from "~/lib/payment-actions";
import { initializeRazorpay } from "~/lib/razorpay-payment";
import ApplyCoupon from "./shared/apply-coupon";
import { ToastAction } from "@repo/ui/src/@/components/toast";
const OrderSummary = ({ text }: { text: string }) => {
  const session = useSession();
  const { toast } = useToast();
  const { cart, emptyCart } = useCartStore((state) => {

    return {
      cart: state.cart,
      emptyCart: state.emptyCart,
    };
  });
 

  const router = useRouter();
  const handleClick = async () => {
    if (text === "Pay Now") {
      if (!session.data) {
        return toast({
          title: "Please login to buy products",
        });
      } else if (!cart.address) {
        return toast({
          title: "Please select or Create a new Address",
        });
      }
      const { error, razorpay } = await startBuyingProducts(cart);
      if (error) {
         return toast({
          title: "Error in buying the products.",
          variant: "destructive",
          action: (
            <ToastAction onClick={()=>router.push("/cart")} altText="Goto cart">Cart</ToastAction>
          ),
        });
      }

      if (!razorpay) {
      
        return toast({
          title: "Something went wrong.",
          variant:"destructive"
        });
      }

      var options = {
        key: process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        name: razorpay.user.name,
        currency: razorpay.currency,
        amount: razorpay.amount,
        order_id: razorpay.razorpayOrderId,
        description: razorpay.description,
        handler: async function (response: any) {
       
          const verifyPayment = await updateProductStatus({
            razorpay_order_id: razorpay.razorpayOrderId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
      
          if (verifyPayment?.message === "Payment is verified") {
            toast({
              title: "Order placed Successfully ",
            });
            router.push("/profile/orders");
            emptyCart();
          } else {
            toast({
              title: "Error",
              description: verifyPayment?.message,
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: razorpay.user.name,
          email: razorpay.user.email,
        },
      };

      const res = await initializeRazorpay();

      if (!res) {
        alert("Razorpay SDK Failed to load");
        return;
      }

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } else {
      router.push("/checkout");
    }
  };
  return (
    <>
      {cart && (
        <div className="flex flex-col gap-5 xl:basis-1/2">
          {/* div1 */}
          <div className="flex flex-col gap-4 md:gap-[18px] xl:gap-[20px] 2xl:gap-[24px]">
            <h3 className="xl:text-6 mb-[18px] font-inter text-[20px] font-semibold leading-[30px] md:mb-5 xl:leading-[30px] 2xl:mb-[28px] 2xl:text-[28px] 2xl:leading-[38px]">
              Order Summary
            </h3>
            <div className="flex justify-between">
              <div className="font-inter text-base font-normal text-[#828282] md:text-lg xl:text-[20px] xl:leading-6 2xl:leading-[32px]">
                Subtotal
              </div>
              <div
                className="font-inter text-base font-semibold text-black-400 md:text-lg xl:text-[20px] xl:leading-6
            2xl:leading-[32px]"
              >
                {`₹ ${cart.subTotalInCent / 100}`}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="font-inter text-base font-normal text-[#828282] md:text-lg xl:text-[20px] xl:leading-6 2xl:leading-[32px]">
                {`Discount ${
                  cart.discountInCent > 0
                    ? cart.coupon?.isPercent
                      ? `(-${cart.coupon?.amount}%)`
                      : `(${cart.coupon?.amount} off)`
                    : ""
                }`}
              </div>
              <div className="font-inter text-base font-semibold text-[#FF3333] md:text-lg xl:text-[20px] xl:leading-6 2xl:leading-[32px]">
                {"- ₹ " + centsToRupee(cart.discountInCent)}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="font-inter text-base font-normal text-[#828282] md:text-lg xl:text-[20px] xl:leading-6 2xl:leading-[32px]">
                Delivery Fee
              </div>
              <div className="font-inter text-base font-semibold text-black-400 md:text-lg xl:text-[20px] xl:leading-6 2xl:leading-[32px]">
                ₹ 0
              </div>
            </div>
            <div className="flex justify-between border-t border-border-color pt-4 md:pt-[18px] xl:pt-5 2xl:pt-6">
              <div className="font-inter text-base font-normal md:text-lg xl:text-[20px] xl:leading-6 2xl:leading-[32px]">
                Total
              </div>
              <div className="font-mediun xl:text-[24px]text-active font-inter text-lg md:text-[20px] md:leading-[32px] 2xl:text-[22px] 2xl:leading-[34px]">
                {`₹ ${cart.totalInCent / 100}`}
              </div>
            </div>
          </div>
          {/* div2 */}
          <div className="flex flex-col gap-3 2xl:gap-5">
            {/* <div className="flex items-center gap-3">
              <div className="relative w-full">
                <input
                  type="text"
                  className="w-full rounded-md border border-border-color py-3 pl-[52px] placeholder:font-inter placeholder:text-base placeholder:font-normal placeholder:text-[#8F8F8F] hover:border-primary"
                  placeholder="Add Promo Code"
                />
                <div className="absolute left-4 top-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.0766 12.4856L13.7653 3.17438C13.5917 2.99963 13.3851 2.86109 13.1576 2.76679C12.93 2.67248 12.686 2.62429 12.4397 2.62501H3.75001C3.45164 2.62501 3.16549 2.74353 2.95451 2.95451C2.74353 3.16549 2.62501 3.45164 2.62501 3.75001V12.4397C2.62429 12.686 2.67248 12.93 2.76679 13.1576C2.86109 13.3851 2.99963 13.5917 3.17438 13.7653L12.4856 23.0766C12.8372 23.4281 13.3141 23.6255 13.8113 23.6255C14.3084 23.6255 14.7853 23.4281 15.1369 23.0766L23.0766 15.1369C23.4281 14.7853 23.6255 14.3084 23.6255 13.8113C23.6255 13.3141 23.4281 12.8372 23.0766 12.4856ZM13.8113 21.2203L4.87501 12.2813V4.87501H12.2813L21.2175 13.8113L13.8113 21.2203ZM9.37501 7.87501C9.37501 8.17168 9.28703 8.46169 9.12221 8.70836C8.95739 8.95504 8.72312 9.1473 8.44903 9.26083C8.17494 9.37436 7.87334 9.40406 7.58237 9.34619C7.2914 9.28831 7.02413 9.14545 6.81435 8.93567C6.60457 8.72589 6.46171 8.45861 6.40383 8.16764C6.34595 7.87667 6.37566 7.57507 6.48919 7.30098C6.60272 7.02689 6.79498 6.79263 7.04165 6.6278C7.28833 6.46298 7.57834 6.37501 7.87501 6.37501C8.27283 6.37501 8.65436 6.53304 8.93567 6.81435C9.21697 7.09565 9.37501 7.47718 9.37501 7.87501Z"
                      fill="#8F8F8F"
                    />
                  </svg>
                </div>
              </div>
              <Button className="w-[119px] bg-primary py-6 text-base text-white hover:bg-secondary">
                Apply
              </Button>
            </div> */}
            <ApplyCoupon appliedCoupon={cart.coupon?.code} />
            <Link href={""} className="flex items-center justify-between">
              {/* <div className="font-inter text-base font-medium text-inactive">
                <svg
                  className="mr-4 inline"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_2891_159731)">
                    <path
                      d="M28.0037 15.3887C27.883 15.1417 27.883 14.8585 28.0037 14.6115L29.1226 12.3226C29.7456 11.0481 29.252 9.5291 27.9989 8.86424L25.7483 7.6701C25.5055 7.54131 25.339 7.3121 25.2915 7.04145L24.8514 4.53196C24.6063 3.13474 23.3138 2.19584 21.9095 2.39453L19.3869 2.75136C19.1146 2.7898 18.8454 2.70226 18.6478 2.51119L16.8167 0.739793C15.7972 -0.246568 14.1999 -0.246627 13.1804 0.739793L11.3492 2.51136C11.1516 2.7025 10.8824 2.78986 10.6102 2.75154L8.08755 2.39471C6.68278 2.1959 5.39079 3.13492 5.1457 4.53213L4.70554 7.04151C4.65802 7.31221 4.49156 7.54137 4.24881 7.67022L1.99823 8.86435C0.745156 9.52915 0.251565 11.0483 0.87453 12.3228L1.99337 14.6117C2.11407 14.8586 2.11407 15.1419 1.99337 15.3888L0.874471 17.6777C0.251506 18.9521 0.745097 20.4712 1.99818 21.136L4.24875 22.3302C4.49156 22.459 4.65802 22.6882 4.70554 22.9588L5.1457 25.4683C5.36882 26.7403 6.45948 27.6323 7.71297 27.6322C7.83642 27.6322 7.9617 27.6235 8.08761 27.6057L10.6102 27.2489C10.8823 27.2102 11.1517 27.298 11.3493 27.489L13.1804 29.2604C13.6903 29.7537 14.3443 30.0002 14.9985 30.0002C15.6526 30.0001 16.307 29.7535 16.8167 29.2604L18.6478 27.489C18.8454 27.298 19.1147 27.2106 19.3869 27.2489L21.9095 27.6057C23.3145 27.8044 24.6063 26.8655 24.8514 25.4683L25.2916 22.9589C25.3391 22.6882 25.5056 22.459 25.7483 22.3302L27.9989 21.136C29.252 20.4712 29.7456 18.9521 29.1226 17.6776L28.0037 15.3887ZM27.1879 19.6075L24.9373 20.8016C24.2198 21.1824 23.7277 21.8597 23.5873 22.6598L23.1472 25.1693C23.0643 25.642 22.6272 25.9595 22.1518 25.8924L19.6292 25.5356C18.8247 25.4216 18.0287 25.6805 17.4448 26.2453L15.6136 28.0167C15.2688 28.3503 14.7284 28.3503 14.3834 28.0167L12.5523 26.2453C12.0588 25.7679 11.4137 25.5092 10.7402 25.5092C10.6168 25.5092 10.4924 25.5179 10.3678 25.5355L7.84521 25.8924C7.37025 25.9595 6.93285 25.6419 6.84989 25.1692L6.40967 22.6597C6.26928 21.8595 5.77722 21.1823 5.05962 20.8016L2.80905 19.6075C2.38507 19.3825 2.21808 18.8686 2.42884 18.4374L3.54774 16.1485C3.90445 15.4186 3.90445 14.5815 3.54774 13.8517L2.42884 11.5628C2.21808 11.1316 2.38507 10.6176 2.80905 10.3927L5.05962 9.19857C5.77716 8.81777 6.26928 8.14055 6.40962 7.3404L6.84977 4.83096C6.93274 4.35823 7.36973 4.04065 7.84509 4.1078L10.3677 4.46463C11.1719 4.57848 11.9683 4.31967 12.5521 3.75489L14.3833 1.9835C14.7282 1.64987 15.2686 1.64987 15.6136 1.9835L17.4447 3.75489C18.0286 4.31973 18.8248 4.57848 19.6291 4.46463L22.1517 4.1078C22.6267 4.04059 23.0641 4.35823 23.1471 4.83096L23.5872 7.34046C23.7276 8.14061 24.2197 8.81789 24.9373 9.19857L27.1878 10.3927C27.6118 10.6176 27.7788 11.1316 27.568 11.5628L26.4491 13.8516C26.0924 14.5814 26.0924 15.4186 26.4491 16.1484L27.568 18.4373C27.7789 18.8686 27.6119 19.3826 27.1879 19.6075Z"
                      fill="#4D4D4D"
                    />
                    <path
                      d="M21.3219 8.67795C20.9841 8.3401 20.4362 8.3401 20.0984 8.67795L8.67917 20.0972C8.34132 20.4351 8.34132 20.9829 8.67917 21.3207C8.84809 21.4896 9.06952 21.5741 9.29088 21.5741C9.51225 21.5741 9.73373 21.4897 9.9026 21.3207L21.3218 9.9015C21.6598 9.56359 21.6598 9.01586 21.3219 8.67795Z"
                      fill="#4D4D4D"
                    />
                    <path
                      d="M11.5394 7.21362C9.79025 7.21362 8.36719 8.63668 8.36719 10.3858C8.36719 12.1349 9.79025 13.558 11.5394 13.558C13.2885 13.558 14.7116 12.1349 14.7116 10.3858C14.7116 8.63668 13.2885 7.21362 11.5394 7.21362ZM11.5394 11.8277C10.7443 11.8277 10.0975 11.1809 10.0975 10.3858C10.0975 9.5907 10.7443 8.94389 11.5394 8.94389C12.3344 8.94389 12.9813 9.5907 12.9813 10.3858C12.9812 11.1809 12.3344 11.8277 11.5394 11.8277Z"
                      fill="#4D4D4D"
                    />
                    <path
                      d="M18.4573 16.4421C16.7082 16.4421 15.2852 17.8652 15.2852 19.6143C15.2852 21.3635 16.7082 22.7865 18.4573 22.7865C20.2065 22.7865 21.6295 21.3635 21.6295 19.6143C21.6295 17.8652 20.2065 16.4421 18.4573 16.4421ZM18.4573 21.0562C17.6623 21.0562 17.0154 20.4094 17.0154 19.6143C17.0154 18.8193 17.6622 18.1725 18.4573 18.1725C19.2524 18.1725 19.8992 18.8193 19.8992 19.6143C19.8992 20.4094 19.2524 21.0562 18.4573 21.0562Z"
                      fill="#4D4D4D"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2891_159731">
                      <rect width="30" height="30" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Apply Coupon
              </div> */}
              {/* <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5 5.00098L15.5 12.001L8.5 19.001"
                    stroke="#00898F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div> */}
            </Link>
          </div>
          {/* div3 */}
          <div className="flex flex-col gap-[18px]">
            <Button
              onClick={handleClick}
              className="w-full bg-black font-inter text-base font-medium hover:bg-primary"
            >
              {text}
              <svg
                className="ml-4"
                width="15"
                height="8"
                viewBox="0 0 15 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.13634 3.36357L12.3273 3.36357L10.2318 1.26807C9.98332 1.01959 9.98332 0.616643 10.2318 0.368122C10.4803 0.119643 10.8833 0.119643 11.1318 0.368122L14.3136 3.54994C14.5621 3.79842 14.5621 4.20136 14.3136 4.44989L11.1318 7.6317C11.0075 7.75596 10.8447 7.81812 10.6818 7.81812C10.5189 7.81812 10.3561 7.75596 10.2318 7.6317C9.98332 7.38322 9.98332 6.98028 10.2318 6.73176L12.3273 4.6363L1.13634 4.6363C0.7849 4.6363 0.499979 4.35138 0.499979 3.99993C0.499979 3.64849 0.7849 3.36357 1.13634 3.36357Z"
                  fill="#ffffff"
                />
              </svg>
            </Button>

            <div className="font-inter text-sm font-normal text-inactive xl:text-base">
              Your total amount is {`₹ ${cart.totalInCent / 100}`}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default OrderSummary;
