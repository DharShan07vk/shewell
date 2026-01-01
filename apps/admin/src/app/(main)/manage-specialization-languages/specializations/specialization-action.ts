'use server';

import { db } from '@/src/server/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { IState } from '@/src/_models/state.model';
interface ISpecialization {
  id: string;
  specialization: string;
  active: boolean;
  categoryId : string
}
export const createSpecialisation = async (data: ISpecialization) => {
  const session = await getServerSession();

  if (!session) {
   throw new Error("Unauthorised")
  }

  const { specialization, active, categoryId } = data;

  const FormData = z.object({
    specialization: z.string().min(1),

    active: z.boolean(),
    categoryId : z.string().optional()
  });

  const isValidData = FormData.parse({
    specialization,
    active,
    categoryId
  });

  if (!isValidData) {
    return {
      error: 'Invalid data'
    };
  }

  await db.professionalSpecializations.create({
    data: {
      specialization: isValidData.specialization,
      active: isValidData.active,
      professionalSpecializationParentCategoryId : isValidData.categoryId || null
    }
  });

  // revalidatePath('/manage-locations/countries');
  revalidatePath('/manage-specialization-languages/specializations');
  return {
    message: 'Specialization created successfully'
  };
};

export const updateSpecialisation = async (data: ISpecialization) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  const { id, specialization, active, categoryId } = data;

  const FormData = z.object({
    id: z.string().min(1),
    specialization: z.string().min(1),

    active: z.boolean(),
    categoryId : z.string().optional()
  });

  const isValidData = FormData.parse({
    id,
    specialization,
    active,
    categoryId
  });

  await db.professionalSpecializations.update({
    where: {
      id: id as string
    },
    data: {
      professionalSpecializationParentCategoryId : isValidData.categoryId || null,
      specialization: isValidData.specialization,
      active: isValidData.active
      
    }
  });

  // revalidatePath('/manage-locations/countries');
  revalidatePath('/manage-specialization-languages/specializations');
  return {
    message: 'Specialization updated successfully'
  };
};

export const deleteSpecializations = async (ids: string[]) => {
  const session = await getServerSession();

  if (!session) {
    throw new Error('Unauthorised');
  }

  await db.professionalSpecializations.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
   
  });
  revalidatePath("manage-specialization-languages/specializations")
};
