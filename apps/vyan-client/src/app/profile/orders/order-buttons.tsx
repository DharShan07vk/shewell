"use client";
import { useRouter, usePathname } from "next/navigation";
import { OrderStatus } from "@repo/database";
import Link from "next/link";
import React, { useState } from "react";
import { orderCancelAction, updateOrderStatusDelivered } from "./order-actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/src/@/components/alert-dialog";
import { format } from "date-fns";
import { IOrderDetail } from "~/models/order.model";
import { toast } from "@repo/ui/src/@/components/use-toast";
import { Button } from "~/components/ui/button";
import { ITrackingData } from "@repo/shiprocket";
import { trackOrder } from "./order-actions";
type IOrderActions = {
  order: IOrderDetail;
};
const OrderButtons = ({ order }: IOrderActions) => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const [openC, setOpenC] = useState<boolean>(false);

  const [trackingData, setTrackingData] = useState<ITrackingData>();

  const handleInvoice = () => {
    router.push(`/profile/orders/${order.id}/invoice`);
  };

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
    setOpen(true);
    return await trackOrder(order.id)
      .then(async (resp) => {
        if (resp?.error) {
          return toast({
            title: "Error in tracking the order",
            description: resp.error,
            variant: "destructive",
          });
        }
        if (resp?.message) {
          setTrackingData(resp.message);
          if (
            resp.message.shipment_track_activities[0]?.activity === "Delivered"
          ) {
            await updateOrderStatusDelivered(order.id);
          }
        }
      })
      .catch((err) => {
        console.log("error in obtaining trck order details");
      });
  };
  return (
    <>
      {order.status === OrderStatus.PAYMENT_SUCCESSFUL && (
        <>
          <Button
            onClick={handleTrackOrder}
            variant="buyAgain"
            className=" flex items-center justify-center hover:border hover:border-transparent hover:bg-primary hover:text-white"
            size="large"
          >
            Track Order
          </Button>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="w-full sm:w-1/2">
              {trackingData ? (
                <>
                  <div className="flex flex-col gap-2">
                    {trackingData.shipment_track_activities[0]?.activity ===
                      "DELIVERED" && (
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
                                format(
                                  order.expectedDelivery,
                                  " LLLL dd yyyy ",
                                )}
                            </div>
                          </div>
                          <Button
                            variant="orderBtn"
                            onClick={() => router.push(trackingData.track_url)}
                          >
                            Track
                          </Button>
                        </div>
                      </div>
                    )}
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
                <Button variant="buyAgain" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}

      {(order.status == OrderStatus.PAYMENT_SUCCESSFUL 
      // ||
        // order.status == OrderStatus.DELIVERED
       ) && (
        <Button
          variant="buyAgain"
          onClick={() => setOpenC(true)}
          className=" flex items-center justify-center hover:border hover:border-transparent hover:bg-primary hover:text-white"
          size="large"
        >
          Cancel Order
        </Button>
      )}
      <AlertDialog open={openC} onOpenChange={setOpenC}>
        <AlertDialogContent className="w-full md:w-1/2 xl:w-1/3">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to cancel this order?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="buyAgain" onClick={() => setOpenC(false)}>
              Cancel
            </Button>
            <Button variant="orderBtn" onClick={handleCancel}>
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {pathname == "/profile/orders" && (
        <>
          <Link href={`/profile/orders/${order.id}`}>
            <Button
              variant="buyAgain"
              className=" flex items-center justify-center hover:border hover:border-transparent hover:bg-primary hover:text-white"
              size="large"
            >
              Order Details
            </Button>
          </Link>
        </>
      )}

      <Button
        onClick={handleInvoice}
        variant="buyAgain"
        className=" flex items-center justify-center hover:border hover:border-transparent hover:bg-primary hover:text-white"
        size="large"
      >
        Invoice
      </Button>
    </>
  );
};

export default OrderButtons;
