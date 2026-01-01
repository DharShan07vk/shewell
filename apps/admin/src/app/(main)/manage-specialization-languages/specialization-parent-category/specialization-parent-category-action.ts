'use server';

import { db } from '@/src/server/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { IState } from '@/src/_models/state.model';
interface ISpecialization {
  id: string;
  name: string;
  active: boolean;
  mediaId: string;
}
export const createSpecialisation = async (data: ISpecialization) => {
  const session = await getServerSession();

  if (!session) {
    throw new Error('Unauthorised');
  }

  const { name, active, mediaId } = data;

  const FormData = z.object({
    name: z.string().min(1),

    active: z.boolean(),
    mediaId: z.string()
  });

  const isValidData = FormData.parse({
    name,
    active,
    mediaId
  });

  if (!isValidData) {
    return {
      error: 'Invalid data'
    };
  }

 try{
  await db.professionalSpecializationParentCategory.create({
    data: {
      name: isValidData.name,
      active: isValidData.active,
      mediaId: isValidData.mediaId 
    }
  });

  //   await db.professionalSpecializations.create({
  //     data: {
  //       specialization: isValidData.specialization,
  //       active: isValidData.active
  //     }
  //   });

  // revalidatePath('/manage-locations/countries');
  revalidatePath('/manage-specialization-languages/specialization-parent-category');
  return {
    message: 'Specialization Parent Category created successfully'
  };
 }
 catch(error){
  return {
    error : "Specialization Parent Category cannot be created"
  }
 }
};

export const updateSpecialisation = async (data: ISpecialization) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  const { id, name, active, mediaId } = data;

  const FormData = z.object({
    id: z.string().min(1),
    name: z.string().min(1),

    active: z.boolean(),
    mediaId: z.string()
  });

  const isValidData = FormData.parse({
    id,
    name,
    active,
    mediaId
  });

 try{
  await db.professionalSpecializationParentCategory.update({
    where: {
      id: id as string
    },
    data: {
      name: isValidData.name,
      active: isValidData.active,
      mediaId: isValidData.mediaId
    }
  });
  //   await db.professionalSpecializations.update({
  //     where: {
  //       id: id as string
  //     },
  //     data: {
  //       specialization: isValidData.specialization,
  //       active: isValidData.active
  //     }
  //   });

  // revalidatePath('/manage-locations/countries');
  revalidatePath('/manage-specialization-languages/specialization-parent-category');
  return {
    message: 'Specialization Parent Category updated successfully'
  };
}
catch(error){
  return{
    error : "Specialization Parent Category not updated"
  }
}

 }

export const deleteSpecializations = async (ids: string[]) => {
  const session = await getServerSession();

  if (!session) {
    throw new Error('Unauthorised');
  }

  //   await db.professionalSpecializations.deleteMany({
  //     where: {
  //       id: {
  //         in: ids
  //       }
  //     }

  //   });
 try{
  await db.professionalSpecializationParentCategory.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  });
  revalidatePath('manage-specialization-languages/specialization-parent-category');
 
 }
 catch(error){
  return{
    error : "Specialization Parent Category not deleted"
  }
 }
};
