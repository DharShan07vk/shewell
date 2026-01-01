import { db } from "~/server/db";
import ProductDetails from "./product-details";
import { Metadata } from "next";
import React from "react";
import { getServerSession } from "next-auth";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await db.product.findFirst({
    select: {
      id: true,
      name: true,
      seoTitle: true,
      seoDescription: true,
      description: true,
      seoKeywords: true,
    },
    where: {
      slug: params.slug,
    },
  });
  

  return {
    title: `${product?.seoTitle || product?.name} `,
    description: `${product?.seoDescription || product?.description}`,
    keywords: `${product?.seoKeywords}`,
  };
}

const ProductDetailsPage = async ({ params }: { params: { slug: string } }) => {
  // const product = await db.product.findFirst({
  //   select: {
  //     id: true,
  //     name: true,
  //     slug: true,
  //     shortDescription: true,
  //     description: true,
  //     seoTitle: true,
  //     seoDescription: true,

  //     review:{
  //       select:{
  //         id:true,
  //         review:true,
  //         rating:true,
  //         productId:true,
  //         approved:true,
  //         createdAt:true,
  //         user:{
  //           select:{
  //             id:true,
  //             name:true,
  //             email:true,
  //           }
  //         }
  //       }
  //     },
  //     productVariants: {
  //       select: {
  //         id: true,
  //         name: true,
  //         priceInCents: true,
  //         discountInCents: true,
  //         discountInPercentage: true,
  //         discountEndDate:true,
  //         productVariantInventory:{
  //           select:{
  //             id:true,
  //             available:true,
  //             productVariantId:true,
  //           }
  //         }
  //       },
  //       where: {
  //         deletedAt: null,
  //       },
  //       orderBy: {
  //         priceInCents: "asc",
  //       },
  //     },
  //     mediaOnProducts: {
  //       select: {
  //         media: {
  //           select: {
  //             fileKey: true,
  //             fileUrl: true,
  //           },
  //         },
  //       },
  //     },
  //     userWishlisted: {
  //       select: {
  //         email: true,
  //       },
  //     },
  //   },
  //   where: {
  //     slug: params.slug,
  //   },
  // });

  const session = await getServerSession();
  const product = await db.product.findFirst({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      shortDescription: true,
      avgRating: true,
      totalReviews: true,
      categoryId: true,

      category: {
        select: {
          id: true,
          slug: true,
          name: true,
          parentCategory: {
            select: {
              id: true,
              slug: true,
              name: true,
            },
          },
          parentCategoryId: true,
        },
      },
      review: {
        select: {
          id: true,
          rating: true,
          review: true,
          createdAt: true,
          approved: true,
          productId: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      productVariants: {
        select: {
          id: true,
          name: true,
          priceInCents: true,
          discountInCents: true,
          discountEndDate: true,
          discountInPercentage: true,
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
      productStats: {
        select: {
          id: true,
          title: true,
          stat: true,
        },
        where: {
          deletedAt: null,
        },
      },
      productBenefits: {
        select: {
          id : true,
          benefit: true,
        },
        where: {
          deletedAt: null,
        },
      },
      userWishlisted: {
        select: {
          email: true,
        },
        where: {
          email: session?.user.email!,
        },
      },
      faq: {
        select: {
          id: true,
          question: true,
          answer: true,
          order: true,
        },
      },
      media: {
        select: {
          imageAltText: true,
          media: {
            select: {
              id: true,
              fileUrl: true,
              fileKey: true,
            },
          },
        },
        orderBy: {
          order: "asc",
        },
      },
    },
    where: {
      slug: params.slug,
      active: true,
      deletedAt: null,
    },
  });
  const review = await db.review.findMany({
    select: {
      id: true,
      rating: true,
      approved: true,
      review: true,
      productId: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    where: {
      productId: product?.id,
    },
  });

 
  return (
    product && (
      <>
        <ProductDetails
          productReview={review}
          productDetails={{
            ...product,
            avgRating: product.avgRating.toFixed(1),
          }}
        />
      </>
    )
  );
};
export default ProductDetailsPage;
