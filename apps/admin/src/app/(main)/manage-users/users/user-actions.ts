'use server';

import { db } from '@/src/server/db';
import { hash } from 'bcrypt';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { getServerAuthSession } from '@/src/server/auth';
import { IUser } from '@/src/_models/user.model';
import { getServerSession } from 'next-auth';

export const createUser = async (data: IUser) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }
  const { firstName, middleName, lastName, email, password, active } = data;

  const FormData = z.object({
    firstName: z.string().min(1),
    middleName: z.string().nullable(),
    lastName: z.string().nullable(),
    email: z.string().email(),
    password: z.string().min(8),
    active: z.boolean()
  });

  const isValidData = FormData.parse({
    firstName,
    middleName,
    lastName,
    email,
    password,
    active
  });

  if (!isValidData) {
    return {
      error: 'Invalid data'
    };
  }

  const passwordHash = await hash(password as string, 10);

  // await db.user.create({
  //   data: {
  //     firstName,
  //     middleName,
  //     lastName,
  //     email,
  //     passwordHash,
  //     accountType: 'normal',
  //     active
  //   }
  // });

  revalidatePath('/manage-users/users', 'page');
  return {
    message: 'User created successfully'
  };
};

export const updateUser = async (data: IUser) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }
  const { id, firstName, middleName, lastName, email, password, active } = data;
  console.log('data', data);
  const FormData = z.object({
    id: z.string(),
    firstName: z.string().min(1),
    middleName: z.string().nullable(),
    lastName: z.string().nullable(),
    email: z.string().email(),
    // password: z.string().min(8),
    active: z.boolean().optional()
  });

  const isValidData = FormData.parse({
    id,
    firstName,
    middleName,
    lastName,
    email,
    // password,
    active
  });

  if (!isValidData) {
    return {
      error: 'Invalid data'
    };
  }

  if (!active) {
    await db.session.deleteMany({
      where: {
        id: id as string
      }
    });
  }

  // const passwordHash = await hash(password as string, 10);
  try {
    // await db.user.update({
    //   where: {
    //     id: id as string
    //   },
    //   data: {
    //     firstName,
    //     middleName,
    //     lastName,
    //     email,
    //     active
    //   }
    // });

    revalidatePath('/manage-users/users', 'page');
    return {
      message: 'User updated successfully'
    };
  } catch (e: any) {
    return {
      error: e?.message || 'Something went wrong while updating.'
    };
  }
};
