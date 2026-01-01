"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";


import { db } from "../../../server/db";
import { getServerAuthSession } from "../../../server/auth";
import { IAddressForm } from "~/models/address.model";

export const CreateUserAddress = async (data: IAddressForm) => {
  const session = await getServerAuthSession();

  if (!session) {
    return {
      error: "Please login for saving the address!",
    };
  }
  if (!session.user.email) {
    return {
      error: "Please login for saving the address!",
    };
  }

  const {
    name,
    area,
    landmark,
    pincode,
    mobile,
    addressType,
    city,
    countryId,
    stateId,
    houseNo
  } = data;

  const FormSchema = z.object({
    name: z.string(),
    area: z.string(),
    landmark: z.string(),
    pincode: z.string(),
    mobile: z.string(),
    addressType: z.string(),
    city: z.string(),
    countryId: z.string(),
    stateId: z.string(),
    houseNo:z.string()
  });

  const isValid = FormSchema.safeParse({
    name,
    area,
    landmark,
    pincode,
    mobile,
    addressType,
    city,
    countryId,
    stateId,
    houseNo,
    
  });

  if (!isValid) {
    return {
      error: "Invalid data",
    };
  }

  const user = await db.user.findFirst({
    where : {
      email : session.user.email
    }
  })
  console.log("user id at address", user?.id)
  try {
    await db.address.create({
      data: {
        name: name,
        area: area,
        landmark: landmark,
        pincode: pincode,
        mobile: mobile,
        addressType: addressType,  
        city: city,
        houseNo: houseNo,
        countryId: countryId,
        stateId: stateId,
        userId: user?.id! ,
      },
    });

    revalidatePath("/profile/manage-addresses");
    return {
      message: "Address added successfully",
    };
  } catch (e) {
    return {
      error: "Address creation failed",
    };
  }
};
export const UpdateUserAddress = async (data: IAddressForm) => {
  const session = await getServerAuthSession();

  if (!session) {
    return {
      error: "Please login for saving the address!",
    };
  }

  const {
    name,
    area,
    landmark,
    pincode,
    mobile,
    addressType,
houseNo,
    city,
    countryId,
    stateId,
  } = data;

  const FormSchema = z.object({
    name: z.string(),
    area: z.string(),
    landmark: z.string(),
    pincode: z.string(),
    mobile: z.string(),
    addressType: z.string(),
houseNo:z.string(),
    city: z.string(),
    countryId: z.string(),
    stateId: z.string(),
  });

  const isValid = FormSchema.safeParse({
    name,
    area,
    landmark,
    pincode,
    mobile,
    addressType,
   houseNo,
    city,
    countryId,
    stateId,
  });

  if (!isValid) {
    return {
      error: "Invalid data",
    };
  }
  try {
    await db.address.update({
      data: {
        name: name,
        area: area,
        landmark: landmark,
        pincode: pincode,
        mobile: mobile,
        addressType: addressType,
   houseNo:houseNo,
        city: city,
   
        countryId: countryId,
        stateId: stateId,
      },
      where: {
        id: data?.id,
      },
    });

    revalidatePath("/profile/manage-addresses");
    return {
      message: "Address updated successfully",
    };
  } catch (e) {
    return {
      error: "Address updation failed",
    };
  }
};
export const deleteAddress = async (id: string) => {
  const deletedAddress = await db.address.update({
    where: {
      id: id,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  if (deletedAddress) {
    revalidatePath("/profile/manage-addresses");
    return {
      message: "Successfully Deleted Address",
    };
  } else {
    return {
      error: "Something went wrong in deleting the address",
    };
  }
};

export const fetchStates = async (countryId: string) => {
  const states = await db.country.findFirst({
    where: {
      id: countryId,
      
    },
    select: {
      states: true,

    },
  });
  return states;
};
