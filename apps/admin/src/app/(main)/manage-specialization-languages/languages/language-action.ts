'use server';

import { db } from '@/src/server/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { IState } from '@/src/_models/state.model';
interface ILanguage {
  id: string;
  language: string;
  active: boolean;
}
export const createLanguages = async (data: ILanguage) => {
  const session = await getServerSession();

  // if (!session) {
  //  throw new Error("Unauthorised")
  // }

  const { language, active } = data;

  const FormData = z.object({
    language: z.string().min(1),

    active: z.boolean()
  });

  const isValidData = FormData.parse({
    language,
    active
  });

  if (!isValidData) {
    return {
      error: 'Invalid data'
    };
  }

  await db.professionalLanguages.create({
    data: {
      language: isValidData.language,
      active: isValidData.active
    }
  });

  // revalidatePath('/manage-locations/countries');
  revalidatePath('/manage-specialization-languages/languages');
  return {
    message: 'Languages created successfully'
  };
};

export const updateLanguages = async (data: ILanguage) => {
  const session = await getServerSession();

  // if (!session) {
  //   return {
  //     error: 'Unauthorized'
  //   };
  // }

  const { id, language, active } = data;

  const FormData = z.object({
    id: z.string().min(1),
    language: z.string().min(1),

    active: z.boolean()
  });

  const isValidData = FormData.parse({
    id,
    language,
    active
  });

  await db.professionalLanguages.update({
    where: {
      id: id as string
    },
    data: {
      language: isValidData.language,
      active: isValidData.active
    }
  });

  // revalidatePath('/manage-locations/countries');
  revalidatePath('/manage-specialization-languages/languages');
  return {
    message: 'Languages updated successfully'
  };
};

export const deleteLanguages = async (ids: string[]) => {
  const session = await getServerSession();

  if (!session) {
    throw new Error('Unauthorised');
  }

  await db.professionalLanguages.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  });
  revalidatePath('manage-specialization-languages/languages');
};
