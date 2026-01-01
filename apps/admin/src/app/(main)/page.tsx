/* eslint-disable @next/next/no-img-element */

import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductService } from '../../demo/service/ProductService';
import { LayoutContext } from '../../layout/context/layoutcontext';
import Link from 'next/link';
import { Demo } from '@/types';
import { ChartData, ChartOptions } from 'chart.js';
import RecentSales from '@/src/_components/dashboard/recent-sales';
import TabsSection from '@/src/_components/dashboard/tabs-section';
import SaleOverview from '@/src/_components/dashboard/sales-overview';
import Notifications from '@/src/_components/dashboard/notifications';
import Card from '@/src/_components/dashboard/card';
import { db } from '@/src/server/db';
import { OrderStatus } from '@repo/database';
import { subMonths } from 'date-fns';
import DateRangeForAppointmentData from '@/src/_components/dashboard/date-range-for-appointment-data';
import RecentAppointmentTable from '@/src/_components/dashboard/recent-appointment-table';
import DoctorsOnBoardForDateRange from '@/src/_components/dashboard/appointment-data-for-date-range';
import TotalDoctorsOnBoard from '@/src/_components/dashboard/total-appointment-data';
import ProductData from '@/src/_components/dashboard/product-data';

// const CARD = [
//   { title: 'Products', value: '34562', valueStat: '%3+', repeated: '2345', customerStats: '+34%', icon: <i className="pi pi-shopping-cart text-blue-500 text-xl" />, borderColor: 'text-blue-500', iconBg:'bg-blue-100' },
//   { title: 'Membership', value: '34562', valueStat: '%3+', repeated: '2345', customerStats: '+34%', icon: <i className="pi pi-map-marker text-orange-500 text-xl" /> , svg:true , borderColor: 'text-orange-500',iconBg:'bg-orange-100' },
//   { title: 'Book Slots', value: '34562', valueStat: '%3+', repeated: '2345', customerStats: '+34%', icon: <i className="pi pi-calendar text-cyan-500 text-xl" />, borderColor: 'text-cyan-500',iconBg:'bg-cyan-100' },
//   { title: 'New Users', value: '34562', valueStat: '%3+', repeated: '2345', customerStats: '+34%', icon: <i className="pi pi-comment text-purple-500 text-xl" />, borderColor: 'text-purple-500',iconBg:'bg-purple-100' }
// ];


const Dashboard = async() => {
  //orders for finding the latest 10 products sold
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
      }
    }
  });
  //best selling prodcuts
  const mostSoldProductVariants = await db.lineItem.groupBy({
    by: ['productVariantId'],
    _sum: {
      quantity: true
    },
    orderBy: {
      _sum: {
        quantity: 'desc'
      }
    },
    take: 10,
    where: {
      order: {
        status: {
          in: [OrderStatus.PAYMENT_SUCCESSFUL, OrderStatus.DELIVERED]
        }
      }
    }
  });
  const bestSellingProducts = await db.productVariant.findMany({
    select: {
      id: true,
      name: true,
      priceInCents:true,
      discountInCents:true,
      discountInPercentage:true,
      product: {
        select: {
          id: true,
          name: true,
          category: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    },
    where: {
      id: {
        in: mostSoldProductVariants.map((i) => i.productVariantId)
      }
    }
  });

  const productCardAvg = await db.order.aggregate({
    orderBy: {
      orderPlaced: 'desc'
    },
    where: {
      orderPlaced: {
        lte: new Date(),
        gte: subMonths(new Date(), 1)
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
        lte: new Date(),
        gte: subMonths(new Date(), 1) //from date fns take back the number of months specified
      }
    }
  });
  //all users
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true
    }
  });


  const CARD = [
    { title: 'Products', value: `₹${(productCardAvg._avg.totalInCent || 0).toFixed(2)}`, icon: <i className="pi pi-shopping-cart text-blue-500 text-xl" />, borderColor: 'text-blue-500', iconBg: 'bg-blue-100' },
    { title: 'New Users', value: `${newUsers}`, icon: <i className="pi pi-comment text-purple-500 text-xl" />, borderColor: 'text-purple-500', iconBg: 'bg-purple-100' }
  ];
  
  return (
    <>
    <DateRangeForAppointmentData/>
      <div className="grid">
        {/* {CARD.map((item) => {
          return (
            <div className="col-12 lg:col-6 xl:col-6" key={item.title}>
              <Card item={item}/>
            </div>
          )
        })} */}
        <ProductData/>
        <TotalDoctorsOnBoard/>
        <DoctorsOnBoardForDateRange/>

        <div className="col-12 ">
          <RecentSales />
          <RecentAppointmentTable/>
          {/* <TabsSection mostSoldProductVariant={mostSoldProductVariants} bestSellingProducts={bestSellingProducts}/> */}
        </div>

      </div>
    </>
  );
};

export default Dashboard;
