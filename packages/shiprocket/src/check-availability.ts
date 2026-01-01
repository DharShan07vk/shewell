import axios, { AxiosError } from 'axios';

type IAvailableCourierCompany = {
  "air_max_weight": string;
  "assured_amount": number;
  "base_courier_id": number | null;
  "base_weight": string;
  "blocked": 0 | 1;
  "call_before_delivery": "Available",
  "charge_weight": number;
  "city": string;
  "cod": 0 | 1;
  "cod_charges": 0 | 1;
  "cod_multiplier": number;
  "cost": string;
  "courier_company_id": number;
  "courier_name": string;
  "courier_type": string;
  "coverage_charges": number;
  "cutoff_time": string; // "11:00"
  "delivery_boy_contact": string; // "Not Available",
  "delivery_performance": number; // 5
  "description": string;
  "edd": string;
  "entry_tax": number
  "estimated_delivery_days": string; // "4",
  "etd": string; // "Jul 01, 2024",
  "etd_hours": number; // 91,
  "freight_charge": number; // 54,
  "id": number; // 459245934,
  "is_custom_rate": 0 | 1;
  "is_hyperlocal": boolean; // false
  "is_international": 0 | 1; // 0
  "is_rto_address_available": boolean; // true,
  "is_surface": boolean; // true,
  "local_region": 0,
  "metro": 0,
  "min_weight": number; // 0.5  ,
  "mode": 0,
  "new_edd": 0,
  "odablock": false,
  "other_charges": 0,
  "others": "{\"allow_postcode_auto_sync\":1,\"cancel_real_time\":true}",
  "pickup_availability": "0",
  "pickup_performance": 4.7,
  "pickup_priority": "",
  "pickup_supress_hours": 0,
  "pod_available": "Instant",
  "postcode": "175019",
  "qc_courier": 0,
  "rank": "",
  "rate": 54,
  "rating": 4.9,
  "realtime_tracking": "Real Time",
  "region": 1,
  "rto_charges": 54,
  "rto_performance": 5,
  "seconds_left_for_pickup": 0,
  "secure_shipment_disabled": false,
  "ship_type": 1,
  "state": "Himachal Pradesh",
  "suppress_date": "",
  "suppress_text": "",
  "suppression_dates": null,
  "surface_max_weight": "4.00",
  "tracking_performance": 5,
  "volumetric_max_weight": null,
  "weight_cases": 4.6,
  "zone": "z_e"
}

type IBlockedCourierCompany = {
  "block_reason": string; // "Operational Issues",
  "courier_company_id": number; // 33,
  "courier_name": string; // "Xpressbees Air",
  "postcode": string; // "175019"
}

type IResponse = {
  "company_auto_shipment_insurance_setting": boolean,
  "covid_zones": {
    "delivery_zone": null,
    "pickup_zone": null
  },
  "currency": "INR",
  "data": {
    "available_courier_companies": IAvailableCourierCompany[],
    "blocked_courier_companies": IBlockedCourierCompany[];
    "child_courier_id": null,
    "is_recommendation_enabled": 0 | 1; // 1,
    "recommendation_advance_rule": 0,
    "recommended_by": {
      "id": number; // 6,
      "title": string; // "Recommendation By Shiprocket"
    },
    "recommended_courier_company_id": number; // 43,
    "shiprocket_recommended_courier_id": number; // 43
  },
  "dg_courier": 0,
  "eligible_for_insurance": boolean; // false,
  "insurace_opted_at_order_creation": boolean; // false,
  "is_allow_templatized_pricing": boolean; // true,
  "is_latlong": 0 | 1; // 0,
  "is_old_zone_opted": boolean; // false,
  "is_zone_from_mongo": boolean; // true,
  "label_generate_type": number // 2,
  "on_new_zone": number; // 2,
  "seller_address": []; // ,
  "status": number; // 200,
  "user_insurance_manadatory": boolean; // false
}

export const checkCourierServiceability = async ({ delivery_postcode, pickup_postcode, weight, token }:{ delivery_postcode: number;pickup_postcode: number; weight: string; token: string }) => {
  // https://apidocs.shiprocket.in/#29ff5116-0917-41ba-8c82-638412604916
  var config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://apiv2.shiprocket.in/v1/external/courier/serviceability/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    data : {
      pickup_postcode: 110030,
      delivery_postcode: delivery_postcode,
      "currency": "INR",
      cod: 0,
      // The weight of shipment in kgs.
      weight: weight,
    }
  };

  const resp = await axios(config)

  const data = resp.data as IResponse;

  if(data.data.shiprocket_recommended_courier_id || data.data.recommended_courier_company_id) {
    const recommendedId = data.data.shiprocket_recommended_courier_id ?? data.data.recommended_courier_company_id
    const courier = data.data.available_courier_companies.find((c) => c.courier_company_id == recommendedId);

    return { etd: courier?.etd ?? null };
  }

  return { etd: null };
}
