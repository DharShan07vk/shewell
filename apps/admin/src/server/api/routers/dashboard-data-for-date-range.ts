import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';
import { getServerSession } from 'next-auth';
import { BookAppointmentStatus, OrderStatus } from '@repo/database';
import { endOfDay, formatISO, startOfDay } from 'date-fns';
import { db } from '../../db';
export const noOfOnlineAppointmentsRouter = createTRPCRouter({
  noOfOnlineAppointments: publicProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date()
      })
    )
    .query(async ({ input }) => {
      const { startDate, endDate } = input;
      const session = await getServerSession();
      console.log('session', session);
      if (!session) {
        throw new Error('Unauthorised');
      }
      if (!session.user.email) {
        throw new Error('Unauthorised');
      }

      const updatedStartDate = formatISO(startDate);
      const updatedEndDate = formatISO(endOfDay(endDate));

      const totalDoctorsOnBoard = await db.professionalUser.findMany({
        
        where : {
          createdAt : {
            gte : updatedStartDate
          },
         
        }
      })
      const appointmentDataForTable = await db.bookAppointment.findMany({
        select: {
          id: true,
          patient: {
            select: {
              firstName: true,
              email: true,
              additionalPatients : {
                select : {
                  firstName : true,
                  email : true
                }
              }
            }
          },
          professionalUser: {
            select: {
              firstName: true,
              email : true,
              displayQualification: {
                select: {
                  specialization: true
                }
              }
            }
          },
          priceInCents : true,
          startingTime: true,
          endingTime: true,
          planName: true
        },
        where: {
          startingTime: {
            gte: updatedStartDate
          },
          endingTime: {
            lte: updatedEndDate
          }
        },
        orderBy: {
          startingTime: 'desc'
        }
      });

      const totalDoctorsOnBoardWithinDateRange = await db.professionalUser.aggregate({
        _count : {
         id : true
        },
       })

      const totalAppointmentsWithCountAndPrice = await db.bookAppointment.aggregate({
        _sum:{
          totalPriceInCents : true
        },
        _count : {
          id : true
        },
        where:{
          startingTime: {
            gte: updatedStartDate
          },
          endingTime: {
            lte: updatedEndDate
          },
          status : BookAppointmentStatus.PAYMENT_SUCCESSFUL
        }
      })

      const cancelledAppointments = await db.bookAppointment.aggregate({
        _count:{
          id : true
        },
        where : {
          startingTime: {
            gte: updatedStartDate
          },
          endingTime: {
            lte: updatedEndDate
          },
          status : BookAppointmentStatus.CANCELLED || BookAppointmentStatus.CANCELLED_WITH_REFUND
        }
      })

      const productCardAvg = await db.order.aggregate({
          orderBy: {
            orderPlaced: 'desc'
          },
          where: {
            orderPlaced: {
              lte: updatedEndDate,
              gte: updatedStartDate
            },
            status: {
              in: [OrderStatus.PAYMENT_SUCCESSFUL, OrderStatus.DELIVERED]
            }
          },
          _avg: {
            totalInCent: true
          }
        });
      
        const newUsers = await db.user.count({
          orderBy: {
            createdAt: 'desc'
          },
          where: {
            createdAt: {
              lte: updatedEndDate,
              gte: updatedStartDate 
            }
          }
        });

         const orders = await db.order.findMany({
            include: {
              lineItems: {
                include: {
                  productVariant: {
                    include: {
                      product: {
                        select: {
                          id: true,
                          name: true,
                          media: {
                            select: {
                              mediaId: true,
                              imageAltText: true,
                              comment: true,
                              media: {
                                select: {
                                  id: true,
                                  fileKey: true,
                                  fileUrl: true
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              address: true
            },
            take: 10,
            orderBy: {
              orderPlaced: 'desc'
            },
            where: {
              status: {
                in: [OrderStatus.DELIVERED, OrderStatus.PAYMENT_SUCCESSFUL]
              },
              
            }
          });

          const users = await db.user.findMany({
              select: {
                id: true,
                name: true,
                email: true
              },
              where : {
                createdAt : {
                  lte : updatedEndDate,
                  gte : updatedStartDate
                }
              }
            });

        

      console.log("start date", startDate)
      return {
        appointmentDataForTable, totalDoctorsOnBoard, totalAppointmentsWithCountAndPrice, cancelledAppointments,productCardAvg, newUsers,orders,users
      };
    })
});
