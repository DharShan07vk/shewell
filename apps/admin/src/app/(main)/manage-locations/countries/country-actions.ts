'use server';

import { db } from '@/src/server/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { ICountry } from '@/src/_models/country.model';

export const createCountry = async (data: ICountry) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  const { name, active, iso3, iso2, phoneCode, currency, currencyName, currencySymbol } = data;

  const FormData = z.object({
    name: z.string().min(1),
    active: z.boolean(),
    iso3: z.string(),
    iso2: z.string(),
    phoneCode: z.string(),
    currency: z.string(),
    currencyName: z.string(),
    currencySymbol: z.string()
  });

  const isValidData = FormData.parse({
    name,
    active,
    iso3,
    iso2,
    phoneCode,
    currency,
    currencyName,
    currencySymbol
  });

  if (!isValidData) {
    return {
      error: 'Invalid data'
    };
  }

  await db.country.create({
    data: {
      name,
      active,
      iso3,
      iso2,
      phoneCode,
      currency,
      currencyName,
      currencySymbol
    }
  });

  revalidatePath('/manage-locations/countries');
  revalidatePath('/manage-locations/states');
  return {
    message: 'Country created successfully'
  };
};

export const updateCountry = async (data: ICountry) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  const { id, name, active } = data;

  const FormData = z.object({
    id: z.string().min(1),
    name: z.string().min(1)
  });

  const isValidData = FormData.parse({
    id,
    name
  });

  await db.country.update({
    where: {
      id: id as string
    },
    data: {
      name
    }
  });

  revalidatePath('/manage-locations/countries');
  revalidatePath('/manage-locations/states');
  return {
    message: 'Country updated successfully'
  };
};

export const updateCountriesStatus = async ({ countryIds, active }: { countryIds: string[]; active: boolean }) => {
  await db.country.updateMany({
    where: {
      id: {
        in: countryIds
      }
    },
    data: {
      active: active
    }
  });

  revalidatePath('/manage-locations/countries');
  revalidatePath('/manage-locations/states');
  return {
    message: 'Countries updated successfully'
  };
};
