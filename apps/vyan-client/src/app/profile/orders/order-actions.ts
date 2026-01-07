"use server";
import { getServerSession } from "next-auth";
import { db } from "../../../server/db";
import { OrderStatus } from "@repo/database";
import Razorpay from "razorpay";
import crypto from "crypto";
import { env } from "~/env";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addDays, formatISO } from "date-fns";
import { calculateDiscountedPrice } from "~/lib/discountPrice";
import { recalculateCart } from "~/store/cart.store";
import { ICart, ICartLineItem } from "~/models/cart.model";
import { ITrackingData } from "@repo/shiprocket";
import {
  getAuthToken,
  orderGetTrackingThroughShipmentId,
} from "@repo/shiprocket";

interface IRazorPayDetails {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export const createRazorpayOrder = async ({
  amount,
  currency,
  receipt,
  notes,
}: {
  amount: number;
  currency: "INR";
  receipt: string;
  notes: { orderType: string };
}) => {
  var instance = new Razorpay({
    key_id: env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: env.RAZORPAY_KEY_SECRET!,
  });

  return await instance.orders.create({
    amount,
    currency,
    receipt,
    notes,
  });
};
export const createRazorpayRefund = async ({
  razorpayPaymentId,
  amount,
}: {
  razorpayPaymentId: string;
  amount: number;
}) => {
  var instance = new Razorpay({
    key_id: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: env.RAZORPAY_KEY_SECRET,
  });
  return await instance.payments.refund(razorpayPaymentId, {
    amount: amount,
  });
};

export const startBuyingProducts = async (cart: ICart) => {
  let messageError: string | null = null;
  const session = await getServerSession();

  if (!session?.user) {
    return {
      error: "Unauthorized",
    };
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user.email!,
    },
  });

  

  //productvaraint ids of all the items in the cart
  const productVarinatIds = cart.lineItems.map((p) => p.productVariantId);

  //fetching the prices of all the productVariants in the cart
  const productVariants = await db.productVariant.findMany({
    where: {
      id: {
        in: productVarinatIds,
      },
    },
  });
  //updated cart line items
  const updatedCartLineItems: ICartLineItem[] = [];

  for (const i of cart.lineItems) {
    const variant = productVariants.find((p : any) => p.id === i.productVariantId);

    if (!variant) {
      continue;
    }

    const perUnitPriceInCent = calculateDiscountedPrice(
      variant.priceInCents,
      variant.discountInCents,
      variant.discountInPercentage,
      variant.discountEndDate,
      // variant.discountEndDate,
    );
    if (perUnitPriceInCent) {
      updatedCartLineItems.push({
        ...i,
        perUnitPriceInCent: perUnitPriceInCent,
        totalInCent: perUnitPriceInCent * i.quantity,
      });
    }
  }
  //reCalculated cart
  const recalCulatedCart = recalculateCart(cart, updatedCartLineItems);
  
  
  if (recalCulatedCart.totalInCent != cart.totalInCent) {
    return {
      error: "Retry!!! Prices may have changed",
      url: "/cart",
    };
  }

  //create razorpay order

  const razorpayOrder = await createRazorpayOrder({
    amount: recalCulatedCart.totalInCent * 100,
    currency: "INR",
    receipt: "NatureHunt Products",
    notes: {
      orderType: "eCommerce",
    },
  });

  try {
    const productBooking = await db.order.create({
      data: {
        userId: user?.id!,
        status: OrderStatus.PAYMENT_PENDING,
        subTotalInCent: cart.subTotalInCent,
        taxesInCent: cart.taxesInCent,
        deliveryFeesInCent: cart.deliveryFeesInCent,
        totalInCent: cart.totalInCent,
        lineItems: {
          createMany: {
            data: updatedCartLineItems.map((lineItem) => ({
              productVariantId: lineItem.productVariantId,
              discountInCent: lineItem.discountInCent,
              perUnitPriceInCent: lineItem.perUnitPriceInCent,
              quantity: lineItem.quantity,
              totalInCent: lineItem.totalInCent,
              subTotalInCent: lineItem.subTotalInCent,
            })),
          },
        },
        addressId: cart.address?.id!,
        orderPlaced: new Date(),
        razorpay_order_id: razorpayOrder.id,
        couponId: cart.coupon?.id,
        discountInCent: cart.discountInCent,
      },
    });

    for (const lineItem of cart.lineItems) {
      await db.productVariantInventory.updateMany({
        data: {
          available: {
            decrement: lineItem.quantity,
          },
          unavailable: {
            increment: lineItem.quantity,
          },
        },
        where: {
          productVariantId: lineItem.productVariantId,
        },
      });
    }

    revalidatePath("/profile/orders");
    revalidatePath("/admin/inventory");
  } catch (err: any) {
    messageError = err.message;
  }

  const razorpayConfig = {
    user: {
      name: user?.name,
      email: user?.email,
    },
    name: "Flexit Fitness",
    currency: "INR",
    amount: razorpayOrder.amount,
    orderId: razorpayOrder.id,
    description: "",
    image: "",
  };

  return { error: messageError, razorpay: razorpayConfig };
};

export const updateProductStatus = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}: IRazorPayDetails) => {
  const session = await getServerSession();
  const user = await db.user.findFirst({
    where: {
      email: session?.user.email || "",
      deletedAt: null,
    },
  });

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    return {
      message: "Payment is not verified",
    };
  }

  const razorpayInstance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  const orderDetails = await razorpayInstance.orders.fetch(razorpay_order_id);
  if (!orderDetails.amount_paid) {
    return {
      message: "Payment is not verified",
    };
  }
  try {
    await db.$transaction(async (tx : any) => {
      await tx.order.updateMany({
        data: {
          status: OrderStatus.PAYMENT_SUCCESSFUL,
          razorpay_payment_id: razorpay_payment_id,
          // razorpay_signature: razorpay_signature,
        },
        where: {
          razorpay_order_id: razorpay_order_id,
        },
      });

      await tx.notification.create({
        data: {
          title: "Congratulations",
          userId: user.id,
          description: "Yayyy!! You have successfully placed the order.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    });

    revalidatePath("/profile/orders");
    revalidatePath("/profile/notification");
    return {
      orderDetails,
      message: "Payment is verified",
    };
  } catch (error) {
    console.log("error updating the order status", error)
    return {
      message: "Error updating the order status",
    };
  }
};

export const orderCancelAction = async (orderId: string) => {
  const orderF = await db.order.findFirst({
    where: {
      id: orderId,
    },
  });

 
  if (!orderF) {
    return {
      error: "Order not found",
    };
  }

  const refund = await createRazorpayRefund({
    razorpayPaymentId: orderF.razorpay_payment_id!,
    amount: orderF.totalInCent,
  });
 
  try {
    await db.order.update({
      data: {
        status: OrderStatus.CANCELLED,
        cancelledDate: new Date(),
        razorpay_refund_id: refund.id,
      },
      where: {
        id: orderId,
      },
    });
    revalidatePath("/profile/orders");
    return {
      message: "Order cancelled successfully",
    };
  } catch (err) {
    return {
      error: "Error in cancelling the order",
    };
  }
};

export const trackOrder = async (orderId: string) => {
  const order = await db.order.findFirst({
    where: {
      id: orderId,
    },
  });
 
  if (!order) {
    return {
      error: "Order not found",
    };
  }

  let trackingOrderDetails: ITrackingData;
  try {
    const token = await getAuthToken(env.SHIP_ROCKET_AUTH_KEY);
    if (!token) {
    
      return {
        error: "Error in fetching order token",
      };
    }
    const tracking = await orderGetTrackingThroughShipmentId({
      token: token,
      shipmentId: Number(order.shiprocket_shipment_id),
    });
    console.log("response is", tracking.tracking_data);
    await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        expectedDelivery: formatISO(
          tracking.tracking_data.shipment_track_activities[0]?.date!,
        ),
      },
    });
    trackingOrderDetails = tracking.tracking_data;

    return {
      message: trackingOrderDetails,
    };
  } catch (err: any) {
    return {
      error: err,
    };
  }
};

export const updateOrderStatusDelivered = async (orderId: string) => {
  const order = await db.order.findFirst({
    where: {
      id: orderId,
    },
  });
 
  if (!order) {
    return {
      error: "Order not found",
    };
  }
  try {
    await db.order.updateMany({
      where: {
        id: order.id,
      },
      data: {
        status: OrderStatus.DELIVERED,
      },
    });
    console.log("updated on track order");
    revalidatePath("/my-orders");
    return {
      message: "Order status updated",
    };
  } catch (err) {
    console.log("not updated on track order");
    return {
      err: "Error in updating order status activity",
    };
  }
};
