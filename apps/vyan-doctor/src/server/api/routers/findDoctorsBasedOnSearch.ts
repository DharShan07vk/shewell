import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Prisma } from "@repo/database";
export const findDoctorsBasedOnSearchRouter = createTRPCRouter({
  findDoctorsBasedOnSearch: publicProcedure
    .input(
      z.object({
        inputSearch: z.string().min(1),
      }),
    )
    .query(async ({ input }) => {
      const { inputSearch } = input;


      let whereCondition: Prisma.ProfessionalUserWhereInput = {};

      // if (input.inputSearch) {
      //   whereCondition = {
      //     OR: [
      //       {
      //         // ...whereCondition,
      //         firstName: {
      //           contains: inputSearch,
      //           mode: "insensitive",
      //         },
      //         ProfessionalSpecializations: {
      //           some: {
      //             specialization: {
      //               contains: inputSearch,
      //               mode: "insensitive",
      //             },
      //           },
      //         },
      //         qualifications: {
      //           some: {
      //             OR: [
      //               { city: { contains: inputSearch, mode: "insensitive" } },
      //               {
      //                 state: {
      //                   name: { contains: inputSearch, mode: "insensitive" },
      //                 },
      //               },
      //             ],
      //           },
      //         },
      //       },
      //     ],
      //   };
      // }

      if (input.inputSearch) {
        whereCondition = {
          OR: [
            { firstName: { contains: inputSearch, mode: "insensitive" } },
            { lastName: { contains: inputSearch, mode: "insensitive" } },
            
            {
              ProfessionalSpecializations: {
                some: { specialization: { contains: inputSearch, mode: "insensitive" } },
              },
            },
            {
              qualifications: {
                some: {
                  OR: [
                    { city: { contains: inputSearch, mode: "insensitive" } },
                    { state: { name: { contains: inputSearch, mode: "insensitive" } } },
                  ],
                },
              },
            },
          ],
        };
      }

      const doctors = await db.professionalUser.findMany({
        where: whereCondition,
      });

      console.log("doctors based on search", doctors);
      return { doctors };
    }),
});
