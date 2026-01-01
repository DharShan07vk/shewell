"use client";
import Link from "next/link";
import Image from "next/image";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@repo/ui/src/@/components/dialog";

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import { useCartStore } from "~/store/cart.store";
import { IOrderDetail } from "~/models/order.model";
import { IReview } from "~/models/review.model";
import { useToast } from "@repo/ui/src/@/components/use-toast";
import { format } from "date-fns";
import { Button } from "~/components/ui/button";
import { OrderStatus } from "@repo/database";
import { createProductReviews } from "./product-reviews-actions";
import OrderButtons from "./order-buttons";
export type ReviewProps = {
  id: string;
  rating: number;
  review: string;
  approved: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
};
const RelatedOrderCard = ({
  order,
  reviews,
}: {
  order: IOrderDetail;
  reviews: IReview[];
}) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const { buyNow } = useCartStore((state) => {
    return {
      buyNow: state.buyNow,
    };
  });

  const { control, handleSubmit } = useForm<ReviewProps>({
    defaultValues: {
      review: "",
      rating: 5,
      productId: "",
      userId: "",
    },
  });

  const { toast } = useToast();
  const session = useSession();
  const errorHandler = (err: any) => {
    console.log("error is", err);
  };
  const loginSubmit = (data: ReviewProps, productId: string) => {

    return createProductReviews(data, productId)
      .then((resp) => {
        if (resp.error) {
          toast({
            title: "Error in uploading review",
          });
        }
        if (resp.message) {
          toast({
            title: "Product review uploaded",
          });
          setOpen(false);
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
        // console.log("error is", err);
      });
  };
  const StarDrawing = (
    <path d="M15.1533 1.24496C14.6395 0.359428 13.3607 0.359425 12.8468 1.24496L9.2281 7.48137C8.97427 7.91882 8.53553 8.21734 8.03545 8.29287L1.2537 9.31717C0.114654 9.48921 -0.284892 10.9274 0.602182 11.6623L5.6543 15.8479C6.12196 16.2354 6.34185 16.8465 6.22825 17.4431L4.90669 24.3833C4.69778 25.4804 5.8495 26.3328 6.8377 25.8125L13.2236 22.4501C13.7096 22.1941 14.2905 22.1941 14.7766 22.4501L21.1625 25.8125C22.1507 26.3328 23.3024 25.4804 23.0935 24.3833L21.7719 17.4431C21.6583 16.8465 21.8782 16.2354 22.3459 15.8479L27.398 11.6623C28.285 10.9274 27.8855 9.48921 26.7465 9.31717L19.9647 8.29287C19.4646 8.21734 19.0259 7.91882 18.7721 7.48137L15.1533 1.24496Z" />
  );
  const customStyles = {
    itemShapes: StarDrawing,
    activeFillColor: "#008F4E",
    inactiveFillColor: "#B5B5B5",
  };

  return (
    <div className="order-place hidden overflow-hidden lg:block">
      {/* top grey-area of cards */}
      <div className="flex  items-center justify-between  bg-[#F0F7F8] px-8 py-6 2xl:px-10">
        <div className="">
          <h4 className="font-archivo text-center text-lg font-semibold leading-7 text-[#00000099]">
            Order Placed
          </h4>
          <h5 className="font-noto mt-[3px] text-center font-medium leading-6 text-[#8F8F8F]">
            {order.orderPlaced && format(order.orderPlaced, "dd MMM yyyy")}
          </h5>
        </div>
        <div className="">
          <h4 className="font-archivo text-center text-lg font-semibold leading-7 text-[#00000099]">
            Total{" "}
          </h4>
          <div className="flex items-center justify-center">
            <h5 className="font-noto mt-[3px] text-center font-medium leading-6 text-primary">
              {`₹ ${order.totalInCent / 100}`}
            </h5>
          </div>
        </div>

        <div>
          <h4 className="font-archivo text-center text-lg font-semibold leading-7 text-[#00000099]">
            Ship To{" "}
          </h4>
          <h5 className="font-noto mt-[3px] text-center font-medium capitalize leading-6 text-primary">
            {order.address.name}
          </h5>
        </div>
        <p className="font-archivo text-center text-lg font-semibold leading-7 text-primary">
          Order Id:{" "}
          <span className="font-noto font-normal text-black-300">
            {" "}
            # {order.id}
          </span>
        </p>
      </div>

      {/* white area of card starts here   */}
      <div className="flex justify-between px-9 py-6">
        <div className="flex flex-col gap-6 ">
          {order.lineItems.map((item) => {
            let totalRating: number = 0;
            let productRating: IReview[] = [];
            if (reviews && reviews.length > 0) {
              productRating = reviews.filter(
                (i) =>
                  i.productId == item.productVariant.productId &&
                  i.user.email === session.data?.user.email,
              );
              if (productRating && productRating.length > 0) {
                totalRating = productRating.reduce((total, item) => {
                  return total + Number(item.rating);
                }, 0);
              }
            }
            const avgRating = totalRating
              ? (totalRating / productRating.length).toFixed(2)
              : 0;

            return (
              <div className="flex items-start gap-8">
                <div className="relative">
                  <div className="relative aspect-[1/1] h-20 xs:h-24 sm:h-[113px] md:h-40 lg:h-[125px] xl:h-[167px]">
                    <Image
                      fill={true}
                      src={
                        item.productVariant.product?.media[0]?.media
                          ?.fileUrl || "/product-fallback.png"
                      }
                      alt="product-img"
                    />
                  </div>
                </div>
                <div className="">
                  <div className=" mb-[28px]">
                    <div className="font-noto text-2xl font-semibold text-primary">
                      {
                        order.status === OrderStatus.PAYMENT_SUCCESSFUL &&
                        order.expectedDelivery
                          ? `Delivery on ${format(order.expectedDelivery, "dd MMM yyyy")}`
                          : order.status === OrderStatus.DELIVERED &&
                              order.expectedDelivery
                            ? `Delivered on ${format(order.expectedDelivery, "dd MMM yyyy")}`
                            : ""
                        // order.status===OrderStatus.CANCELLED && order.cancelledDate?`Cancelled on  ${format(order?.cancelledDate, "dd MMM yyyy")}`:''
                      }
                    </div>
                  </div>
                  <div>
                    <h3 className="font-noto mb-2 w-[250px] truncate text-lg font-semibold leading-7 text-black-500">
                      {item.productVariant.product?.name}
                    </h3>
                  </div>
                  <div className="flex w-[60%] items-center justify-start gap-2">
                    <Link className=" block flex-shrink-0" href={"/cart"}>
                      <Button
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
                    {order.status === OrderStatus.DELIVERED && (
                      <>
                        {totalRating >= 1 ? (
                          <>
                            <Rating
                              readOnly={true}
                              style={{ maxWidth: 200 }}
                              value={parseFloat(avgRating.toString())}
                              itemStyles={customStyles}
                            />
                          </>
                        ) : (
                          <>
                            <Dialog open={open} onOpenChange={setOpen}>
                              <DialogTrigger
                                asChild
                                onClick={() => setOpen(true)}
                              >
                                <button className="block rounded-md border border-transparent bg-primary px-4 py-2  text-center font-inter text-[14px] font-medium leading-6 text-white shadow-[2px_2px_4px_0px_rgba(64,64,64,0.25)] hover:bg-seco ">
                                  Reviews
                                </button>
                              </DialogTrigger>
                              <DialogContent className="w-full px-6 py-3 md:w-[300px] xl:w-[500px] 2xl:w-[450px]">
                                <form
                                  onSubmit={handleSubmit(
                                    (data) =>
                                      loginSubmit(
                                        data,
                                        item.productVariant.productId,
                                      ),
                                    errorHandler,
                                  )}
                                >
                                  <div className="grid gap-y-4 py-2 ">
                                    <div className="flex flex-col items-start">
                                      <label
                                        htmlFor="rating"
                                        className="font-noto mb-2 block w-full font-medium leading-6 tracking-[0.72px] text-primary lg:text-lg lg:leading-7"
                                      >
                                        Rate your purchase
                                      </label>
                                      <Controller
                                        name="rating"
                                        control={control}
                                        render={({ field, fieldState }) => {
                                          return (
                                            <>
                                              <Rating
                                                style={{ maxWidth: 130 }}
                                                value={field.value}
                                                onChange={field.onChange}
                                                itemStyles={customStyles}
                                              />
                                            </>
                                          );
                                        }}
                                      />
                                    </div>

                                    <div className="flex flex-col items-start">
                                      <label
                                        htmlFor="review"
                                        className="lg:leading-7w-full font-noto mb-2 block font-medium leading-6 tracking-[0.72px] text-primary lg:text-lg"
                                      >
                                        Write your review
                                      </label>
                                      <Controller
                                        name="review"
                                        control={control}
                                        rules={{
                                          required: {
                                            value: true,
                                            message: "Review is required.",
                                          },
                                        }}
                                        render={({ field, fieldState }) => {
                                          return (
                                            <>
                                              <textarea
                                                value={field.value || ""}
                                                onChange={field.onChange}
                                                rows={5}
                                                id="review"
                                                placeholder="Comment your feedback"
                                                className="w-full rounded-sm border p-1"
                                              />
                                              {fieldState.error && (
                                                <small className="p-error text-red-500">
                                                  {fieldState.error.message}
                                                </small>
                                              )}
                                            </>
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <Button
                                      type="submit"
                                      className="flex w-fit justify-start bg-secondary text-white"
                                    >
                                      Save
                                    </Button>
                                  </div>
                                </form>
                              </DialogContent>
                            </Dialog>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col items-stretch gap-4">
          <OrderButtons order={order} />
        </div>
      </div>
    </div>
  );
};

export default RelatedOrderCard;
