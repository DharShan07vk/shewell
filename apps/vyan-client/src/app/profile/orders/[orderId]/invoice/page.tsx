"use server";

import { getServerSession } from "next-auth";
import { db } from "../../../../../server/db";
import InvoicePdf from "./invoice-pdf";

const Invoice = async ({ params }: { params: { orderId: string } }) => {
  const session = await getServerSession();
  const orderInfo=await db.order.findUnique({
    select: {
      id: true,
      orderPlaced: true,
      discountInCent: true,
      expectedDelivery: true,
      userId: true,
      status: true,
      subTotalInCent: true,
      taxesInCent: true,
      couponId: true,
      deliveryFeesInCent: true,
      totalInCent: true,
      addressId: true,
      cancelledDate : true,
      coupon: {
        select: {
          id: true,
          isPercent: true,
          code: true,
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
              priceInCents: true,
              discountInCents: true,
              discountInPercentage: true,
              id: true,
              discountEndDate:true,
              productId: true,
              name: true,
              createdAt: true,
              updatedAt: true,
              deletedAt: true,
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
                  avgRating: true,
                  totalReviews: true,
                  categoryId: true,
                  userWishlisted: {
                    select: {
                      email: true,
                    }
                  },
                  faq :{
                    select :{
                      id : true,
                      question : true,
                      answer : true,
                      order : true
                    }
                  },
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
                      priceInCents: true,
                      discountEndDate:true,
                      discountInCents: true,
                      discountInPercentage: true,
                      name: true,
                      productVariantInventory: {
                        select: {
                          id: true,
                          available: true,
                          productVariantId: true,
                        },
                      },
                    }
                  },
                  productBenefits : {
                    select :{
                      id : true,
                      benefit: true
                    },
                    where : {
                      deletedAt : null
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
    where:{
      id:params.orderId
    }
  })
  if (!orderInfo) return;
  return (
    <>
      <InvoicePdf orderInfo={{ ...orderInfo, lineItems: [...orderInfo.lineItems.map((l) => ({...l, productVariant: { ...l.productVariant, product: { ...l.productVariant.product!, avgRating: l.productVariant.product?.avgRating?.toString() ?? '' } } }))]}} orderId={params.orderId} />
    </>
  );
};

export default Invoice;
