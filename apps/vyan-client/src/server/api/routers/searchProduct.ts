import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
export const searchProductRouter = createTRPCRouter({
  searchProductRouter: publicProcedure
    .input(
      z.object({
        searchQuery: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      console.log("ddfdfdfdd");
      const { searchQuery } = input;
      const searchProducts = await db.product.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
          shortDescription: true,
          description: true,
          avgRating: true,
          totalReviews: true,
          categoryId: true,
        review:{
          select:{
            id:true,
            productId:true,
            review:true,
            rating:true,
            createdAt:true,
            approved:true,
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
                  fileUrl: true,
                },
              },
            },
          },
          userWishlisted: {
            select: {
              email: true,
            },
          },
          productVariants: {
            select: {
              id: true,
              name: true,
              priceInCents: true,
              discountEndDate:true,
              discountInCents: true,
              discountInPercentage: true,
            },
            where :{
              deletedAt : null
            }
          },
          productBenefits : {
            select : {
              id : true,
              benefit : true
            },
            where : {
              deletedAt :null
            }
            
          },
          faq:{
            select :{
              id : true,
              question :true,
              answer : true,
              order : true
            }
          }
        },
        where: {
          name: {
            contains: searchQuery,
            mode: "insensitive",
          },
          deletedAt : null
        },
      });
      console.log("hin", searchProducts);
      return { searchProducts: searchProducts.map((item) => ({ ...item, avgRating: item.avgRating.toFixed(2) })) };
    }),
});
