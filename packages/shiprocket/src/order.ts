import axios from 'axios';
import { format } from 'date-fns';

type IShipRocketOrderItem = {
  name: string; // "Kunai", Name of the product.
  // sku: string; // "chakra123", The sku id of the product.
  units: number; // 10, No of units that are to be shipped.
  selling_price: string; // "900", The selling price per unit in Rupee. Inclusive of GST.
  discount?: string; // "", Not required
  tax?: string; // "", Not required
  hsn?: number; // 441122 Not required
}

type IShipRocketCreateOrderParams = {
  token: string; // Auth token for calling the API
  order_id: string; // "224-447",  The order id you want to specify to the order. Max char: 50. (Avoid passing character values as this contradicts some other API calls).
  order_date: Date; // "2019-07-24 11:11"  The date of order creation in yyyy-mm-dd format. Time is additional.
  pickup_location: string; // "Jammu", The name of the pickup location added in your Shiprocket account. This cannot be a new location.
  channel_id?: string; // "", Not Required, Mention this in case you need to assign the order to a particular channel. Deafult is 'Custom'.
  comment?: string; // "Reseller: M/s Goku", Not Required, Option to add 'From' field to the shipment. To do this, enter the name in the following format: 'Reseller: [name]'.
  reseller_name?: string; // Not required, The 'from' name if you want to print. Use 'Reseller: [name]'
  company_name?: string; // Not required, Name of the company.
  billing_customer_name: string; // "Naruto", First name of the billed customer.
  billing_last_name?: string; // "Uzumaki", Not required, Last name of the billed customer.
  billing_address: string; // "House 221B, Leaf Village", address details of the billed customer.
  billing_address_2?: string; // "Near Hokage House", Not Required, Further address details of the billed customer.
  billing_city: string; // "New Delhi", Billing address city. Max char: 30.
  billing_pincode: number; // "110002", Pincode of the billing address.
  billing_state: string; // "Delhi", Billing address state.
  billing_country: string; // "India", Billing address country.
  billing_email: string; // "naruto@uzumaki.com", Email address of the billed customer.
  billing_phone: string; // "9876543210", The phone number of the billing customer.
  billing_alternate_phone?: string; // Not required, Alternate phone number of the billing customer.
  shipping_is_billing: boolean; // true, Whether the shipping address is the same as billing address. 1 or 'true' for yes and 0 or 'false' for no.
  shipping_customer_name?: "", // Not required of shipping_is_billing is true
  shipping_last_name?: "", // Not required
  shipping_address?: "", // Not required of shipping_is_billing is true
  shipping_address_2?: "", // Not required
  shipping_city?: "", // Not required of shipping_is_billing is true
  shipping_pincode?: "", // Not required of shipping_is_billing is true
  shipping_country?: "", // Not required of shipping_is_billing is true
  shipping_state?: "", // Not required of shipping_is_billing is true
  shipping_email?: "", // Not required of shipping_is_billing is true
  shipping_phone?: "", // Not required of shipping_is_billing is true
  longitude?: number; // 69.0747 , Not required, Destination (Shipping address) Longitude.
  latitude?: number; // 69.0747 , Not required, Destination (Shipping address) Longitude.
  order_items: IShipRocketOrderItem[];
  payment_method: "Prepaid" | "COD"; // The method of payment. Can be either COD (Cash on delivery) Or Prepaid.
  shipping_charges?: number // 0; Not required - Shipping charges if any in Rupee.
  giftwrap_charges?: number; // 0, Not required - Giftwrap charges if any in Rupee.
  transaction_charges?: number; // 0, Not required - Transaction charges if any in Rupee.
  total_discount: number; // 0, Not required - The total discount amount in Rupee.
  sub_total: number; // 9000, Calculated sub total amount in Rupee after deductions.
  length: number; // 10, The length of the item in cms. Must be more than 0.5.
  breadth: number; // 15, The breadth of the item in cms. Must be more than 0.5.
  height: number; // 20, The height of the item in cms. Must be more than 0.5.
  weight: number; // 2.5 The weight of the item in kgs. Must be more than 0.
  ewaybill_no?: string; // "K92373490", Not required - Details relating to the shipment of goods. .
  customer_gstin?: string; // "29ABCDE1234F2Z5", Not required - Goods and Services Tax Identification Number.
  invoice_number?: string; // "sdfsd", Not required
  order_type?: "ESSENTIALS" | "NON ESSENTIALS" // "ESSENTIALS", Not required
  checkout_shipping_method?: "SR_RUSH" | "SR_STANDARD" | "SR_EXPRESS" | "SR_QUICK"; // a. SR_RUSH: SDD, NDD b. SR_STANDARD: Surface Delivery c. SR_EXPRESS: Air Delivery d. SR_QUICK: 3 hrs delivery
  what3words_address?: string; // toddler.geologist.animated, Not required - What3words is a proprietary geocode system designed to identify any location on the surface of Earth with a resolution of about 3 meters. The system encodes geographic coordinates into three permanently fixed dictionary words.
  is_insurance_opt?: boolean; // true, To secure shipments above the order value of Rs 2500
  is_document?: number; // 1 or 0, Not required - To create a document order
}

export type IResponseCreateOrder = {
  "order_id": number;
  "shipment_id": number;
  "status": "NEW";
  "status_code": number;
  "onboarding_completed_now": number;
  "awb_code": null,
  "courier_company_id": null,
  "courier_name": null
}

export type IShipmentTrack = {
  "id": number; // 185584215,
  "awb_code": string; // "1091188857722",
  "courier_company_id": number; // 10,
  "shipment_id": number; // 168347943,
  "order_id": number; // 168807908,
  "pickup_date": string | null; //  null,
  "delivered_date": string | null; // null,
  "weight": string; // "0.10",
  "packages": number; // 1,
  "current_status": "PICKED UP"; // "PICKED UP",
  "delivered_to": string; // "Mumbai",
  "destination": string; // "Mumbai",
  "consignee_name": string; // "Musarrat",
  "origin": string; // "PALWAL",
  "courier_agent_details": string | null; // null,
  "edd": string; // "2021-12-27 23:23:18"
}

export type IShipmentTrackActivities = {
  "date": string; // "2021-12-23 14:23:18",
  "status": string; // "X-PPOM",
  "activity": string; // "In Transit - Shipment picked up",
  "location": string; // "Palwal_NewColony_D (Haryana)",
  "sr-status": string; // "42"
}

export type ITrackingData =  {
  "track_status": number; // 1,
  "shipment_status": number; // 42,
  "shipment_track": IShipmentTrack[],
  "shipment_track_activities": IShipmentTrackActivities[],
  "track_url": string; // "https://shiprocket.co//tracking/1091188857722",
  "etd": string; // "2021-12-28 10:19:35"
}

export type IResponseTrackingOrder = {
  "tracking_data": ITrackingData
}

export const orderCreateShiprocket = async ({
                                              token,
                                              order_id,
                                              order_date,
                                              pickup_location,
                                              billing_customer_name,
                                              billing_last_name,
                                              billing_address,
                                              billing_address_2,
                                              billing_city,
                                              billing_pincode,
                                              billing_state,
                                              billing_country,
                                              billing_email,
                                              billing_phone,
                                              shipping_is_billing,
                                              order_items,
                                              shipping_customer_name,
                                              shipping_last_name,
                                              shipping_address,
                                              shipping_address_2,
                                              shipping_city,
                                              shipping_pincode,
                                              shipping_country,
                                              shipping_state,
                                              shipping_email,
                                              shipping_phone,
                                              payment_method,
                                              shipping_charges,
                                              giftwrap_charges,
                                              transaction_charges,
                                              total_discount,
                                              sub_total,
                                              length,
                                              breadth,
                                              height,
                                              weight,
                                            }: IShipRocketCreateOrderParams) => {
  // https://apidocs.shiprocket.in/#639199eb-4fed-4770-9057-c8b3e32b2cd6
  const requestData = JSON.stringify({
    order_id,
    order_date: format(order_date, "yyyy-MM-dd HH:mm"), //"2019-07-24 11:11",
    pickup_location, // "Primary",
    // "channel_id": "",
    // "comment": "Reseller: M/s Goku",
    billing_customer_name,
    billing_last_name,
    billing_address,
    billing_address_2,
    billing_city,
    billing_pincode,
    billing_state,
    billing_country,
    billing_email,
    billing_phone,
    shipping_is_billing,
    shipping_customer_name,
    shipping_last_name,
    shipping_address,
    shipping_address_2,
    shipping_city,
    shipping_pincode,
    shipping_country,
    shipping_state,
    shipping_email,
    shipping_phone,
    order_items,
    payment_method,
    shipping_charges,
    giftwrap_charges,
    transaction_charges,
    total_discount,
    sub_total,
    length,
    breadth,
    height,
    weight,
  });

  console.log("response is",requestData)

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    data : requestData
  };

  const resp = await axios(config)
  console.log(JSON.stringify('Shiprocket order response', resp.data))
  return resp.data as IResponseCreateOrder;
};

const orderCancelShiprocket = async ({
                                       token, ids
}: {
  token: string;
  ids: number[]; // "16178831", The Shiprocket order id/ids of the orders that need to be canceled.
}) => {
  const data = JSON.stringify({
    ids,
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://apiv2.shiprocket.in/v1/external/orders/cancel',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    data : data
  };

  await axios(config)

  return {
    message: "Orders successfully cancelled",
  }
}

export const orderGetTrackingThroughShipmentId = async ({ token, shipmentId }: { token: string; shipmentId: number; }) => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${shipmentId}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  const resp = await axios(config)
  console.log("response is",resp)

  return resp.data as IResponseTrackingOrder;
}

const orderGetShiprocket = async (token: string) => {
  // https://apidoc.shiprocket.in/#639199eb-4fed-4770-9057-c8b3e32b2cd6
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://apiv2.shiprocket.in/v1/external/orders/show/16167171',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  const response = await axios(config);
  console.log("response through siprocket is",JSON.stringify(response.data));
  // {
  //   "data": {
  //     "id": 259492257,
  //     "channel_id": 38026,
  //     "channel_name": "MANUAL1",
  //     "base_channel_code": "CS",
  //     "is_international": 0,
  //     "is_document": 0,
  //     "channel_order_id": "1873081902",
  //     "customer_name": "DemoHome ",
  //     "customer_email": "abc@gmail.com",
  //     "customer_phone": "9876543236",
  //     "customer_address": "408, Gautami, Kondapur",
  //     "customer_address_2": null,
  //     "customer_city": "North West Delhi",
  //     "customer_state": "Delhi",
  //     "customer_pincode": "110088",
  //     "customer_country": "India",
  //     "pickup_code": "",
  //     "pickup_location": "",
  //     "pickup_location_id": "",
  //     "pickup_id": "",
  //     "ship_type": "",
  //     "courier_mode": "",
  //     "currency": "INR",
  //     "country_code": 99,
  //     "exchange_rate_usd": 0,
  //     "exchange_rate_inr": 0,
  //     "state_code": 1483,
  //     "payment_status": "",
  //     "delivery_code": "110088",
  //     "total": 345,
  //     "total_inr": 0,
  //     "total_usd": 0,
  //     "net_total": "345.00",
  //     "other_charges": "0.00",
  //     "other_discounts": "0.00",
  //     "giftwrap_charges": "0.00",
  //     "expedited": 0,
  //     "sla": "2 days",
  //     "cod": 0,
  //     "tax": 0,
  //     "total_kerala_cess": "",
  //     "discount": 0,
  //     "status": "RETURN PENDING",
  //     "sub_status": null,
  //     "status_code": 21,
  //     "master_status": "",
  //     "payment_method": "prepaid",
  //     "purpose_of_shipment": 0,
  //     "channel_created_at": "21 Sep 2022 05:25 PM",
  //     "created_at": "21 Sep 2022 05:28 PM",
  //     "order_date": "21 Sep 2022",
  //     "updated_at": "21 Sep 2022 05:28 PM",
  //     "products": [
  //       {
  //         "id": 365076966,
  //         "order_id": 259492257,
  //         "product_id": 1620533,
  //         "name": "watch",
  //         "sku": "Tshirt-Blue-41",
  //         "description": "WHEAT AND MESLIN DURUM WHEAT : OF SEED QUALITY",
  //         "channel_order_product_id": "365076966",
  //         "channel_sku": "Tshirt-Blue-41",
  //         "hsn": "",
  //         "model": null,
  //         "manufacturer": null,
  //         "brand": "",
  //         "color": "",
  //         "size": null,
  //         "custom_field": "",
  //         "custom_field_value": "",
  //         "custom_field_value_string": "",
  //         "weight": 0,
  //         "dimensions": "0x0x0",
  //         "price": 345,
  //         "cost": 345,
  //         "mrp": 400,
  //         "quantity": 1,
  //         "returnable_quantity": 0,
  //         "tax": 0,
  //         "status": 1,
  //         "net_total": 345,
  //         "discount": 0,
  //         "product_options": [],
  //         "selling_price": 345,
  //         "tax_percentage": 0,
  //         "discount_including_tax": 0,
  //         "channel_category": "Default Category",
  //         "packaging_material": "",
  //         "additional_material": "",
  //         "is_free_product": ""
  //       }
  //     ],
  //     "invoice_no": "",
  //     "shipments": {
  //       "id": 258878960,
  //       "order_id": 259492257,
  //       "order_product_id": null,
  //       "channel_id": 38026,
  //       "code": "",
  //       "cost": "0.00",
  //       "tax": "0.00",
  //       "awb": null,
  //       "rto_awb": "",
  //       "awb_assign_date": null,
  //       "etd": "",
  //       "delivered_date": "",
  //       "quantity": 1,
  //       "cod_charges": "0.00",
  //       "number": null,
  //       "name": null,
  //       "order_item_id": null,
  //       "weight": 1,
  //       "volumetric_weight": 0.266,
  //       "dimensions": "11.000x11.000x11.000",
  //       "comment": "",
  //       "courier": "",
  //       "courier_id": "",
  //       "manifest_id": "",
  //       "manifest_escalate": false,
  //       "status": "PENDING",
  //       "isd_code": "+91",
  //       "created_at": "21st Sep 2022 05:28 PM",
  //       "updated_at": "21st Sep 2022 05:28 PM",
  //       "pod": null,
  //       "eway_bill_number": "-",
  //       "eway_bill_date": null,
  //       "length": 11,
  //       "breadth": 11,
  //       "height": 11,
  //       "rto_initiated_date": "",
  //       "rto_delivered_date": "",
  //       "shipped_date": "",
  //       "package_images": "",
  //       "is_rto": false,
  //       "eway_required": false,
  //       "invoice_link": "",
  //       "is_darkstore_courier": 0,
  //       "courier_custom_rule": "",
  //       "is_single_shipment": true
  //     },
  //     "awb_data": {
  //       "awb": "",
  //       "applied_weight": "",
  //       "charged_weight": "",
  //       "billed_weight": "",
  //       "routing_code": "",
  //       "rto_routing_code": "",
  //       "charges": {
  //         "zone": "",
  //         "cod_charges": "",
  //         "applied_weight_amount": "",
  //         "freight_charges": "",
  //         "applied_weight": "",
  //         "charged_weight": "",
  //         "charged_weight_amount": "",
  //         "charged_weight_amount_rto": "",
  //         "applied_weight_amount_rto": "",
  //         "service_type_id": ""
  //       }
  //     },
  //     "order_insurance": {
  //       "insurance_status": "No",
  //       "policy_no": "N/A",
  //       "claim_enable": false
  //     },
  //     "return_pickup_data": {
  //       "id": 2143757,
  //       "name": "ashwin ashwin",
  //       "email": "ashwingunadeep@gmail.com",
  //       "address": "shiprocket",
  //       "address_2": "shiprocket",
  //       "city": "South West Delhi",
  //       "state": "Delhi",
  //       "country": "India",
  //       "pin_code": "110030",
  //       "phone": "9562817406",
  //       "lat": null,
  //       "long": null,
  //       "order_id": 259492257,
  //       "created_at": "2022-09-21 17:28:40",
  //       "updated_at": "2022-09-21 17:28:40"
  //     },
  //     "company_logo": null,
  //     "allow_return": 0,
  //     "is_return": 1,
  //     "is_incomplete": 0,
  //     "errors": null,
  //     "payment_code": null,
  //     "coupon_is_visible": false,
  //     "coupons": "",
  //     "billing_city": "",
  //     "billing_name": "",
  //     "billing_email": "",
  //     "billing_phone": "",
  //     "billing_alternate_phone": "",
  //     "billing_state_name": "",
  //     "billing_address": "",
  //     "billing_country_name": "",
  //     "billing_pincode": "",
  //     "billing_address_2": "",
  //     "billing_mobile_country_code": "+91",
  //     "isd_code": "",
  //     "billing_state_id": "",
  //     "billing_country_id": "",
  //     "freight_description": "Forward charges",
  //     "reseller_name": "",
  //     "shipping_is_billing": 0,
  //     "company_name": "shiprocket",
  //     "shipping_title": "",
  //     "allow_channel_order_sync": false,
  //     "uib-tooltip-text": "Re-fetch orders with updated details",
  //     "api_order_id": "",
  //     "allow_multiship": 0,
  //     "other_sub_orders": [],
  //     "others": {
  //       "weight": "1",
  //       "quantity": 1,
  //       "buyer_psid": null,
  //       "dimensions": "11x11x11",
  //       "api_order_id": "",
  //       "company_name": "shiprocket",
  //       "currency_code": "INR",
  //       "package_count": "1",
  //       "shipping_city": "North West Delhi",
  //       "shipping_name": "DemoHome ",
  //       "shipping_email": "abc@gmail.com",
  //       "shipping_phone": "9876543236",
  //       "shipping_state": "Delhi",
  //       "custom_order_id": null,
  //       "billing_isd_code": "+91",
  //       "forward_order_id": null,
  //       "shipping_address": "408, Gautami, Kondapur",
  //       "shipping_charges": "0",
  //       "shipping_country": "India",
  //       "shipping_pincode": "110088",
  //       "shipping_address_2": ""
  //     },
  //     "is_order_verified": 0,
  //     "extra_info": {
  //       "qc_check": 1,
  //       "qc_params": "Product Name,Size,Color,Brand,Product Image",
  //       "order_type": 1,
  //       "amazon_dg_status": false,
  //       "forward_order_id": "",
  //       "bluedart_dg_status": false,
  //       "other_courier_dg_status": false,
  //       "insurace_opted_at_order_creation": false
  //     },
  //     "dup": 0,
  //     "is_blackbox_seller": false,
  //     "shipping_method": "SR",
  //     "refund_detail": {
  //       "refund_mode": "Store Credits",
  //       "account_holder_name": "",
  //       "account_number": "",
  //       "bank_ifsc": "",
  //       "bank_name": ""
  //     },
  //     "pickup_address": [],
  //     "eway_bill_number": "",
  //     "eway_bill_url": "",
  //     "eway_required": false,
  //     "irn_no": "",
  //     "engage": null,
  //     "seller_can_edit": false,
  //     "seller_can_cancell": false,
  //     "is_post_ship_status": false,
  //     "order_tag": "",
  //     "qc_status": "",
  //     "qc_reason": "",
  //     "qc_image": "",
  //     "product_qc": [
  //       {
  //         "product_id": 365076966,
  //         "qc_values": {
  //           "qc_product_name": {
  //             "value": "watch",
  //             "name": "Product Name"
  //           },
  //           "qc_size": {
  //             "value": "asdasd",
  //             "name": "Size"
  //           },
  //           "qc_color": {
  //             "value": "asdasd",
  //             "name": "Color"
  //           },
  //           "qc_brand": {
  //             "value": "asdas",
  //             "name": "Brand"
  //           },
  //           "qc_product_image": {
  //             "value": "https://s3-ap-southeast-1.amazonaws.com/kr-shipmultichannel/1663238198WTVf4.jpeg",
  //             "name": "Product Image"
  //           }
  //         }
  //       }
  //     ],
  //     "seller_request": null,
  //     "change_payment_mode": true,
  //     "etd_date": null,
  //     "out_for_delivery_date": null,
  //     "delivered_date": null,
  //     "remittance_date": "",
  //     "remittance_utr": "",
  //     "remittance_status": "",
  //     "insurance_excluded": true,
  //     "can_edit_dimension": true
  //   }
  // }
};

const orderUpdateShiprocket = async () => {
  // https://apidoc.shiprocket.in/#639199eb-4fed-4770-9057-c8b3e32b2cd6
  const data = JSON.stringify({
    "order_id": [
      16167171
    ],
    "pickup_location": "Delhi"
  });

  const config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: 'https://apiv2.shiprocket.in/v1/external/orders/address/pickup',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer {{token}}'
    },
    data : data
  };

  const response = await axios(config);
  console.log(JSON.stringify(response.data));
};
