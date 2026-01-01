import { Button } from "@repo/ui/src/@/components/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@repo/ui/src/@/components/sheet";
import CartLayoverCard from "./cart-layover-card";

const CartLayover = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger className="w-full">
          <Button className="w-full rounded-md bg-black px-[70px] py-2 font-inter text-base font-medium text-white hover:bg-primary 2xl:text-lg ">
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
        </SheetTrigger>
        <SheetContent className="bg-white ">
          <SheetHeader>
            <SheetTitle className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span>
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
                </span>
                Cart
              </div>
              <div>
                <span>2</span>Item(s)
              </div>
            </SheetTitle>
            <SheetDescription >
             <div className=" border border-border-color rounded-md py-5 px-6 divide-y divide-border-color " >
                <CartLayoverCard/>
             </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};
export default CartLayover;
