import { getServerSession } from "next-auth";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const wishlistedRouter = createTRPCRouter({
  wishlisted: publicProcedure.query(async () => {
    const session = await getServerSession();
    const wishItem = await db.user.findUnique({
      where: {
        email: session?.user.email || "",
      },
      select: {
        wishlistedProducts: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return {
      wishlistedProducts: wishItem?.wishlistedProducts.map((w) => w.id),
    };
  }),
});
