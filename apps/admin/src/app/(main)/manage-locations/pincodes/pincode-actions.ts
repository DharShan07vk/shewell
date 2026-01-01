'use server';

import { db } from '@/src/server/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
// import { IStateForm } from '@/src/_models/state.model';
import { IPincodeForm } from '@/src/_models/pincode.model';

export const createPincode = async (data: IPincodeForm) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  const { pincode, stateId } = data;

  const FormData = z.object({
    pincode: z.string().min(1),
    stateId: z.string().nullable()
  });

  const isValidData = FormData.parse({
    pincode,
    stateId
  });

  if (!isValidData) {
    return {
      error: 'Invalid data'
    };
  }

  await db.availablePincodes.create({
    data: {
      pincode: isValidData.pincode,
      stateId: isValidData.stateId
    }
  });

  // revalidatePath('/manage-locations/countries');
  revalidatePath('/manage-locations/pincodes');
  return {
    message: 'Pincode created successfully'
  };
};

export const updatePincode = async (data: IPincodeForm) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  const { id, pincode, stateId } = data;

  const FormData = z.object({
    id: z.string().min(1),
    pincode: z.string().min(1),
    stateId: z.string().nullable()
  });

  const isValidData = FormData.parse({
    id,
    pincode,
    stateId
  });

  await db.availablePincodes.update({
    where: {
      id: id as string
    },
    data: {
      pincode: isValidData.pincode,
      stateId: isValidData.stateId
    }
  });

  // revalidatePath('/manage-locations/countries');
  revalidatePath('/manage-locations/pincodes');
  return {
    message: 'Pincode updated successfully'
  };
};

export const deletePincode = async (ids: string[]) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  await db.availablePincodes.updateMany({
    where: {
      id: {
        in: ids
      }
    },
    data: {
      deletedAt: new Date()
    }
  });
};
