'use server';

import { db } from '@/src/server/db';
import { IShipRocket } from './orders-table';
import {getAuthToken,orderCreateShiprocket} from "@repo/shiprocket"
import { env } from '@/env';


const shipRocketAction = async (data: IShipRocket, orderId: string) => {
  if (!orderId) {
    return {
      error: 'Error in fetching order Id'
    };
  }

  const order = await db.order.findUnique({
    where: {
      id: orderId,
      status: 'PAYMENT_SUCCESSFUL'
    },
    select: {
      id: true,
      totalInCent: true,
      orderPlaced: true,
      lineItems: {
        select: {
          quantity: true,
          perUnitPriceInCent: true,
          totalInCent: true,
          productVariant: {
            select: {
              id: true,
              // sku: true,
              name: true,
              product: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      },
      user: {
        select: {
          email: true
        }
      },
      address: {
        select: {
          name: true,
          mobile: true,
          houseNo: true,
          area: true,
          city: true,
          state: {
            select: {
              name: true
            }
          },
          country: {
            select: {
              name: true
            }
          },
          pincode: true
        }
      }
    }
  });

  console.log("orderFF is",order)
  if (!order) {
    return {
      error: 'Order not found'
    };
  }
  try {
    await db.$transaction(async (tx) => {
      console.log("goes inside tyhe trasaction");
      const token = await getAuthToken(env.SHIP_ROCKET_AUTH_KEY);
 console.log("token is",token)
      if (!token) {
        return {
          error: 'Error in fetching order token'
        };
      }

      const shipRocketOrder = await orderCreateShiprocket({
        token: token,
        order_id: order.id,
        channel_id: 'CUSTOM',
        comment: '',
        order_date: order.orderPlaced!,
        pickup_location: 'Primary',
        billing_customer_name: order.address.name,
        billing_last_name: '',
        billing_address: order.address.houseNo,
        billing_address_2: order.address.area,
        billing_city: order.address.city,
        billing_pincode: Number(order.address.pincode),
        billing_state: order.address.state.name,
        billing_country: order.address.country.name,
        billing_phone: order.address.mobile,
        billing_email: order.user.email,
        shipping_is_billing: true,
        shipping_customer_name: '',
        shipping_last_name: '',
        shipping_address: '',
        shipping_address_2: '',
        shipping_city: '',
        shipping_pincode: '',
        shipping_country: '',
        shipping_state: '',
        shipping_email: '',
        shipping_phone: '',
        order_items: order.lineItems.map((l) => ({
          name: `${l.productVariant.product?.name} - ${l.productVariant.name}`,
          // sku: l.productVariant.sku || l.productVariant.id, 
          units: l.quantity,
          selling_price: (l.totalInCent / 100).toFixed(2)
          // discount: '',
          // tax: '',
          // hsn: 441122
        })),
        payment_method: 'Prepaid',
        shipping_charges: 0,
        giftwrap_charges: 0,
        transaction_charges: 0,
        total_discount: 0,
        sub_total: order.totalInCent / 100,
        length: data.length,
        breadth: data.breadth,
        height: data.height,
        weight: data.weight
      });

      await tx.order.update({
        data: {
          length: data.length,
          breadth: data.breadth,
          weight: data.weight,
          height: data.height,
          shiprocket_order_id: shipRocketOrder.order_id.toString(),
          shiprocket_shipment_id: shipRocketOrder.shipment_id.toString()
        },
        where: {
          id: orderId
        }
      });
      console.log("yayyyyy !!!! updated the details for shipRocket purpose");
    });

    return {
      message: 'Shipping details updated successfully'
    };
  } catch (e) {
    console.log("error is",JSON.stringify(e));
    return {
      error: 'Something went wrong in updating shipping details.'
    };
  }
};

export default shipRocketAction;
