'use server';

import { db } from '@/src/server/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { IStateForm } from '@/src/_models/state.model';

export const createState = async (data: IStateForm) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  const { name, stateCode } = data;

  const FormData = z.object({
    name: z.string().min(1),
    active: z.boolean(),
    stateCode: z.string(),
    // countryId: z.string()
  });

  const isValidData = FormData.parse({
    name,
    stateCode,
    // countryId
  });

  if (!isValidData) {
    return {
      error: 'Invalid data'
    };
  }

  await db.state.create({
    data: {
      name: isValidData.name,
      stateCode: isValidData.stateCode,
     countryId : ""
      // countryId: isValidData.countryId
    }
  });

  // revalidatePath('/manage-locations/countries');
  revalidatePath('/manage-locations/states');
  return {
    message: 'State created successfully'
  };
};

export const updateState = async (data: IStateForm) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  const { id, name, stateCode } = data;

  const FormData = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    stateCode: z.string(),
    // countryId: z.string()
  });

  const isValidData = FormData.parse({
    id,
    name,
    stateCode,
    // countryId
  });

  await db.state.update({
    where: {
      id: id as string
    },
    data: {
      name: isValidData.name,
      stateCode: isValidData.stateCode,
      // countryId: isValidData.countryId
    }
  });

  // revalidatePath('/manage-locations/countries');
  revalidatePath('/manage-locations/states');
  return {
    message: 'Country updated successfully'
  };
};

export const deleteState = async (ids: string[]) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  await db.state.deleteMany({
    where: {
      id: {
        in: ids
      }
    },
    // data: {
    //   deletedAt: new Date()
    // }
  });
};
