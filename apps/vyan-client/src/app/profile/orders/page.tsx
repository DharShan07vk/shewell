"use server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@repo/ui/src/@/components/breadcrumb";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/src/@/components/tabs";
import ProfileNav from "~/components/profile-nav";
import ReturnedOrders from "./returned-orders";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { db } from "~/server/db";
import { OrderStatus } from "@repo/database";
import ActiveOrders from "./active-order";
import DeliveredOrders from "./delivered-order";
import RacOrders from "./rac-orders";

const Orders = async() => {
  const session = await getServerSession();
  const userDetails = await db.user.findFirst({
    select: {
      id: true,
      email: true,
      phoneNumber: true,
      name: true,
    },
    where: {
      email: session?.user.email!,
    },
  });

  const orders = await db.order.findMany({
    select: {
      id: true,
      discountInCent: true,
      orderPlaced: true,
      cancelledDate:true,
      expectedDelivery: true,
      userId: true,
      status: true,
      subTotalInCent: true,
      taxesInCent: true,
      couponId: true,
      deliveryFeesInCent: true,
      totalInCent: true,
      addressId: true,
      coupon: {
        select: {
          id: true,
          code: true,
          isPercent: true,
          amount: true,
        }
      },
      lineItems: {
        select: {
          id: true,
          orderId: true,
          productVariantId: true,
          perUnitPriceInCent: true,
          quantity: true,
          subTotalInCent: true,
          discountInCent: true,
          totalInCent: true,
          productVariant: {
            select: {
              id: true,
              productId: true,
              name: true,
              createdAt: true,
              updatedAt: true,
              deletedAt: true,
              priceInCents: true,
              discountInCents: true,
              discountEndDate:true,
              discountInPercentage: true,
              productVariantInventory: {
                select: {
                  id: true,
                  available: true,
                  productVariantId: true,
                },
              },
              product: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  shortDescription: true,
                  description: true,

                  review: {
                    select: {
                      id: true,
                      review: true,
                      rating: true,
                      approved:true,
                      createdAt:true,
                      productId:true,
                      user:{
                        select:{
                          id:true,
                          name:true,
                          email:true,
                        }
                      }
                    }
                  },
                  userWishlisted: {
                    select: {
                      email: true,
                    }
                  },
                  media: {
                    select: {
                      media: {
                        select: {
                          id: true,
                          fileUrl: true,
                          fileKey: true,
                        }
                      }
                    }
                  },
                  productVariants: {
                    select: {
                      id: true,
                      discountEndDate:true,
                      productVariantInventory: {
                        select: {
                          id: true,
                          available: true,
                          productVariantId: true,
                        },
                      },
                      priceInCents: true,
                      discountInCents: true,
                      discountInPercentage: true,
                      name: true,
                    }
                  }
                }
              }
            }

          },
        }
      },
      address: {
        select: {
          id: true,
          name: true,
          houseNo: true,
          mobile: true,
          area: true,
          city: true,
          countryId: true,
          stateId: true,
          landmark: true,
          pincode: true,
          addressType: true,
          userId: true,
          createdAt: true,
          deletedAt: true,
          updatedAt: true,
        }

      }
    },
    where: {
      userId: userDetails?.id,
    }
  })

  const activeOrders = orders.filter((i : any ) => i.status === OrderStatus.PAYMENT_SUCCESSFUL);
  const deliveredOrders = orders.filter((i : any) => i.status === OrderStatus.DELIVERED);
  const returnedAndCancelledOrders = orders.filter((i : any) => i.status === OrderStatus.RETURNED || i.status === OrderStatus.CANCELLED);


  const reviews=await db.review.findMany({
    select:{
      id:true,
      review:true,
      rating:true,
      approved:true,
      createdAt:true,
      productId:true,
      user:{
        select:{
          id:true,
          name:true,
          email:true,
        }
      }
    }
  })

  return (
    <>
        <div className="container mx-auto flex flex-col items-start max-w-full">

<div className="2xl:py-[30px] xl:py-7 lg:py-6 py-[18px]">
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink>Orders</BreadcrumbLink>
      </BreadcrumbItem>

    </BreadcrumbList>
  </Breadcrumb>
</div>

<div className="w-full 2xl:py-9 2xl:px-6 xl:py-8 lg:py-[28px] lg:px-5 py-4 px-2 border border-border-400 rounded-md">
  <div className="mb-10 text-base  text-[#181818] lg:text-xl font-semibold xl:text-2xl 2xl:text-[28px] 2xl:leading-[38px]">
    <svg className="mr-2 inline 2xl:size-[32px] xl:size-[28px] lg:size-6 size-[18px]" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25.3307 16H6.66406" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M15.9974 25.3334L6.66406 16.0001L15.9974 6.66675" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

    Orders
  </div>
  <div>
    <Tabs defaultValue="Active Orders">
      <TabsList className="flex justify-center gap-4 md:gap-10 text-lg font-medium text-black-200 overflow-item">
        <TabsTrigger className="pb-[6px] data-[state=active]:border-b-2 border-primary text-nowrap" value="Active Orders">Active Orders</TabsTrigger>
        <TabsTrigger className="pb-[6px] data-[state=active]:border-b-2 border-primary text-nowrap" value="Delivered Orders">Delivered Orders</TabsTrigger>
        <TabsTrigger className="pb-[6px] data-[state=active]:border-b-2 border-primary text-nowrap" value="Returned Orders">Returned/Cancelled Orders</TabsTrigger>
      </TabsList>
      <TabsContent value="Active Orders">
        {activeOrders.map((order : any) => (
          <>
            <div key={order.id}>
              { /* TODO: fix the @ts-ignore */ }
              {/* @ts-ignore */}
              <ActiveOrders activeOrders={order} reviews={reviews}/>
            </div>
          </>
        ))}
      </TabsContent>

      <TabsContent value="Delivered Orders">
        {deliveredOrders.map((order : any ) => (
          <div key={order.id}>
            { /* TODO: fix the @ts-ignore */ }
            {/* @ts-ignore */}
            <DeliveredOrders deliveredOrders={order} reviews={reviews}/>
          </div>
        ))}
      </TabsContent>

      <TabsContent value="Returned Orders">
        {returnedAndCancelledOrders.map((order : any) => (
          <div key={order.id}>
            { /* TODO: fix the @ts-ignore */ }
            {/* @ts-ignore */}
            <RacOrders racOrders={order} reviews={reviews}/>
          </div>
        ))}
        </TabsContent>
    </Tabs>
  </div>
</div>
</div>
    </>
  );
};
export default Orders;
