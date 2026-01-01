import { db } from "~/server/db";
import WishlistCard from "./wishlist-card";
import { getServerSession } from "next-auth";
import WishlistedProducts from "./wish-lists";
const Wishlist = async () => {

  const session = await getServerSession();
  const wishlistCard = await db.user.findFirst({
    select: {
      wishlistedProducts: {
        select: {
          id: true,
          name: true,
          slug: true,
          shortDescription: true,
          description: true,
          seoTitle: true,
          seoDescription: true,
          review:{
            select:{
              id:true,
              review:true,
              rating:true,
              productId:true,
              approved:true,
              createdAt:true,
              user:{
                select:{
                  id:true,
                  name:true,
                  email:true,
                }
              }
            }
          },
          productVariants: {
            select: {
              id: true,
              name: true,
              priceInCents: true,
              discountInCents: true,
              discountInPercentage: true,
              discountEndDate:true,
              productVariantInventory:{
                select:{
                  id:true,
                  available:true,
                  productVariantId:true,
                }
              }
            },
            where: {
              deletedAt: null,
            },
            orderBy: {
              priceInCents: "asc",
            },
          },
          media: {
            select: {
              media: {
                select: {
                  fileKey: true,
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

        },
      },
    },
    where: {
      email: session?.user.email!,
    },
  });

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
  console.log("wishlisted", wishlistCard);

  if (!wishlistCard) {
    return <></>;
  }

  const formattedWishlistedProducts = wishlistCard.wishlistedProducts.map(
    (item) => ({
      ...item,
    }),
  );
  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-1  gap-6 py-[44px] md:grid-cols-2 md:py-[70px] lg:grid-cols-3 xl:grid-cols-4 xl:pb-[100px] 2xl:grid-cols-5 2xl:gap-8">
          {/* TODO: remove the @ts-ignore */}
          {/* @ts-ignore */}
          <WishlistedProducts wishlistedProducts={formattedWishlistedProducts} reviews={reviews}/>
        </div>
      </div>
    </>
  );
};
export default Wishlist;
