import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const cartRouter = createTRPCRouter({
  getUpdatedCartItems: publicProcedure
    .input(
      z.object({
        cartLineItems: z.array(
          z.object({
            productId: z.string(),
            productVariantId: z.string(),
          }),
        ),
        couponId: z.string().optional().nullable(),
      }),
    )
    .query(async (opts) => {
      const { input } = opts;

      const products = await db.product.findMany({
        select: {
          id: true,
          name: true,
          shortDescription:true,
          seoDescription:true,
          seoKeywords:true,
          seoTitle:true,
          active:true,
          avgRating : true,
          totalReviews :true,
        //   popularItems:true,
        //   hotdeals:true,
        //   newarrivals:true,
          review: {
            select: {
              id: true,
              review: true,
              rating: true,
            }
          },
          category: {
            select: {
              id: true,
              name: true,
              slug:true,
              parentCategory: {
                select: {
                  id: true,
                  slug: true,
                  name: true,
                  parentCategory:{
                    select:{
                      id: true,
                  slug: true,
                  name: true,
                    }
                  }
                },
              },
              parentCategoryId: true,
            }
          },
          faq: {
            select: {
              id: true,
              question: true,
              answer: true,
              order: true,
            }
          },
          description: true,
          
          slug: true,
          categoryId: true,
          media: {
            where: {
              NOT: {
                media: {
                  fileUrl: null
                }
              }
            },
            select: {
              order: true,
              imageAltText: true,
              comment: true,
              mediaId: true,
              productId: true,
              media: {
                select: {
                  id: true,
                  fileUrl: true,
                  fileKey: true
                }
              }
            }
          },
          productVariants: {
            select: {
              id: true,
              name: true,
              priceInCents: true,
            //   isPercentage:true,
              discountEndDate:true,
              discountInPercentage: true,
              discountInCents: true,
              productVariantInventory: {
                select: {
                  id: true,
                  available: true,
                  productVariantId: true,
                },
              },
            },
            where: {
              deletedAt: null,
            },
          },
          productBenefits : {
            select : {
              id : true,
              benefit : true
            },
            where :{
              deletedAt : null
            }
          }
        },
        where: {
          id: {
            in: input.cartLineItems.map((c) => c.productId),
          },
          active: true,
          deletedAt: null,
        },
      });

      let coupon: any = null;
      if (input.couponId) {
        coupon = await db.coupon.findUnique({
          where: {
            id: input.couponId,
            expiresAt: {
              gte: new Date(),
            },
          },
          include: {
            categories: {
              select: {
                id: true,
              },
            },
            products: {
              select: {
                id: true,
              },
            },
            users: {
              select: {
                id: true,
              },
            },
            orders: {
              select: {
                id: true,
              },
            },
          },
        });
      }

      return {
        products: products.map((p) => ({
          ...p
        })),
        coupon,
      };
    }),
});
