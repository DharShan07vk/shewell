"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { OrderStatus } from "@repo/database";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/ui/src/@/components/alert-dialog";
import { format } from "date-fns";
import { IOrderDetail } from "~/models/order.model";
import { useToast } from "@repo/ui/src/@/components/use-toast";
import { useCartStore } from "~/store/cart.store";
import { orderCancelAction } from "./order-actions";
import { Button } from "~/components/ui/button";
import { ITrackingData } from "@repo/shiprocket";
import { trackOrder } from "./order-actions";

const OrderedProductCard = ({ order }: { order: IOrderDetail }) => {
  const [showList, setShowList] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const [openT, setOpenT] = useState<boolean>(false);
  const [trackingData, setTrackingData] = useState<ITrackingData>();

  const { toast } = useToast();
  const { buyNow } = useCartStore((state) => {
    return {
      buyNow: state.buyNow,
    };
  });
  const handleCancel = () => {
    setOpen(false);
    orderCancelAction(order.id)
      .then((resp) => {
        if (resp.message) {
          return toast({
            title: resp.message,
          });
        }
        if (resp.error) {
          return toast({
            title: resp.error,
          });
        }
      })
      .catch((err) => {
        return toast({
          title: "Error in cancelling the order. Try Again!!",
          variant: "destructive",
        });
      });
  };
  const handleTrackOrder = async () => {
    setOpenT(true);
    return await trackOrder(order.id)
      .then((resp) => {
        if (resp?.error) {
          return toast({
            title: "Error in tracking the order",
            description: resp.error,
            variant: "destructive",
          });
        }
        if (resp?.message) {
          setTrackingData(resp.message);
        }
      })
      .catch((err) => {
        console.log("error in obtaining trck order details");
      });
  };
  const router = useRouter();
  return (
    <>
      <div className="relative grid gap-2 rounded-lg border border-[#2AA95233] lg:hidden">
        {order.lineItems.map((item) => (
          <div className="mb-3 flex gap-2 lg:hidden">
            <div className="relative flex  justify-center py-4 pl-1 pr-4">
              <div className="relative aspect-[1/1] h-20 xs:h-24 sm:h-28 md:h-24 lg:h-32 xl:h-[167px]">
                <Image
                  fill={true}
                  src={
                    item.productVariant.product?.media[0]?.media
                      ?.fileUrl || "/product-fallback.png"
                  }
                  alt={"product-img"}
                />
              </div>
            </div>
            {/* product name and buy again btn */}
            <div className="w-full p-2.5">
              <div className=" mb-[8px]">
                <div className="font-noto text-base font-semibold text-primary">
                  {
                    order.status === OrderStatus.PAYMENT_SUCCESSFUL &&
                    order.expectedDelivery
                      ? `Delivery on ${format(order.expectedDelivery, "dd MMM yyyy")}`
                      : order.status === OrderStatus.DELIVERED &&
                          order.expectedDelivery
                        ? `Delivered on ${format(order.expectedDelivery, "dd MMM yyyy")}`
                        : ""
                    // order.status === OrderStatus.CANCELLED && order.cancelledDate ? `Cancelled on  ${format(order?.cancelledDate, "dd MMM yyyy")}` : ''
                  }
                </div>
              </div>

              <h3 className="font-noto mb-2 w-[150px] truncate text-xs leading-[18px] text-black-300">
                {item.productVariant.product?.name}
              </h3>

              <Link className=" block flex-shrink-0" href={"/cart"}>
                <Button
                  className="px-2 py-1 text-sm"
                  onClick={() => {
                    router.push("/cart");
                    buyNow(
                      item.productVariant.product!,
                      1,
                      item.productVariant,
                    );
                  }}
                  variant="buyAgain"
                >
                  Buy Again
                </Button>
              </Link>
            </div>
          </div>
        ))}
        <div className="absolute right-1 top-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            onClick={() => setShowList((prev) => !prev)}
          >
            <path
              d="M9 15.25C9 14.9185 9.1317 14.6005 9.36612 14.3661C9.60054 14.1317 9.91848 14 10.25 14C10.5815 14 10.8995 14.1317 11.1339 14.3661C11.3683 14.6005 11.5 14.9185 11.5 15.25C11.5 15.5815 11.3683 15.8995 11.1339 16.1339C10.8995 16.3683 10.5815 16.5 10.25 16.5C9.91848 16.5 9.60054 16.3683 9.36612 16.1339C9.1317 15.8995 9 15.5815 9 15.25ZM9 10.25C9 9.91848 9.1317 9.60054 9.36612 9.36612C9.60054 9.1317 9.91848 9 10.25 9C10.5815 9 10.8995 9.1317 11.1339 9.36612C11.3683 9.60054 11.5 9.91848 11.5 10.25C11.5 10.5815 11.3683 10.8995 11.1339 11.1339C10.8995 11.3683 10.5815 11.5 10.25 11.5C9.91848 11.5 9.60054 11.3683 9.36612 11.1339C9.1317 10.8995 9 10.5815 9 10.25ZM9 5.25C9 4.91848 9.1317 4.60054 9.36612 4.36612C9.60054 4.1317 9.91848 4 10.25 4C10.5815 4 10.8995 4.1317 11.1339 4.36612C11.3683 4.60054 11.5 4.91848 11.5 5.25C11.5 5.58152 11.3683 5.89946 11.1339 6.13388C10.8995 6.3683 10.5815 6.5 10.25 6.5C9.91848 6.5 9.60054 6.3683 9.36612 6.13388C9.1317 5.89946 9 5.58152 9 5.25Z"
              fill="black"
            />
          </svg>
        </div>
        {showList && (
          <div
            id="drop-list"
            className=" absolute right-1 top-10  z-10 whitespace-nowrap rounded-lg bg-white"
          >
            <Link href={`orders/${order.id}`} className="w-full">
              <h4 className="addmi px-6 py-2 text-xs font-medium text-black hover:bg-primary hover:text-[#fefefe] ">
                Order Details
              </h4>
            </Link>

            {order.status === OrderStatus.PAYMENT_SUCCESSFUL && (
              <div className="w-full" onClick={handleTrackOrder}>
                <h4 className="addmi px-6 py-2 text-xs font-medium text-black hover:bg-primary hover:text-[#fefefe] ">
                  Track Order
                </h4>
              </div>
            )}

            <AlertDialog open={openT} onOpenChange={setOpenT}>
              <AlertDialogContent className="w-full sm:w-1/2">
                {trackingData ? (
                  <>
                    <div className="flex flex-col gap-2">
                      <div className="text-lg font-medium">
                        Estimated Delivery Date
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[16px] font-semibold">
                            {order.expectedDelivery &&
                              format(order.expectedDelivery, "eeee")}
                          </div>
                          <div className="text-[14px] font-bold text-primary">
                            {order.expectedDelivery &&
                              format(order.expectedDelivery, " LLLL dd yyyy ")}
                          </div>
                        </div>
                        <Button
                          variant="orderBtn"
                          onClick={() => router.push(trackingData.track_url)}
                        >
                          Track
                        </Button>
                      </div>
                      <div className="text-[14px] font-semibold">
                        Status :{" "}
                        <span>
                          {trackingData.shipment_track[0]?.current_status}
                        </span>
                      </div>
                      <div>
                        <div className="flex flex-col gap-4">
                          {trackingData.shipment_track_activities.map((i) => (
                            <>
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-[14px] font-bold">
                                    Activity:{" "}
                                    <span className="text-[14px] font-medium text-[#737373]">
                                      {i.activity}
                                    </span>
                                  </div>
                                  <div className="text-[14px] font-bold">
                                    Location:{" "}
                                    <span className="text-[14px] font-medium text-[#737373]">
                                      {i.location}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-[14px] font-bold">
                                  {format(i.date, "dd MMM yyyy")}
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-[14px] font-medium">
                      Wait for some time you have just placed the order.
                    </div>
                  </>
                )}

                <AlertDialogFooter>
                  <Button variant="buyAgain" onClick={() => setOpenT(false)}>
                    Cancel
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {(order.status === OrderStatus.PAYMENT_SUCCESSFUL ||
              order.status === OrderStatus.DELIVERED) && (
              <div className="w-full">
                <button
                  onClick={() => setOpen(true)}
                  className="addmi px-6 py-2 text-xs font-medium text-black hover:bg-primary hover:text-[#fefefe] "
                >
                  Cancel Order
                </button>
              </div>
            )}
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogContent className="w-full md:w-1/2 xl:w-1/3">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to cancel this order?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone..
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Button variant="buyAgain" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="orderBtn" onClick={handleCancel}>
                    Continue
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Link
              href={`/profile/orders/${order.id}/invoice`}
              className="w-full"
            >
              <h4 className="addmi px-6 py-2 text-xs font-medium text-black hover:bg-primary hover:text-[#fefefe]">
                Invoice
              </h4>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderedProductCard;
