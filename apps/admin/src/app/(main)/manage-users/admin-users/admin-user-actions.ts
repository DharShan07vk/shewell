'use server';

import { db } from '@/src/server/db';
import { hash } from 'bcrypt';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/src/server/auth';
import { IAdminUser } from '@/src/_models/admin-user.model';
import { getServerSession } from 'next-auth';

export const createAdminUser = async (data: IAdminUser) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  const { name, email, active, password } = data;

  const FormData = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    active: z.boolean()
  });

  const isValidData = FormData.parse({
    name,
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

  await db.adminUser.create({
    data: {
      name: name as string,
      email: email as string,
      active: !!active,
      passwordHash
    }
  });

  revalidatePath('/manage-users/admin-users');
  return {
    message: 'Admin user created successfully'
  };
};

export const updateAdminUser = async (data: IAdminUser) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  const { id, name, email, active } = data;

  const FormData = z.object({
    id: z.string(),
    name: z.string().min(1),
    email: z.string().email(),
    active: z.boolean()
    // password: z.string().min(8).nullable()
  });

  const isValidData = FormData.parse({
    id,
    name,
    email,
    active
    // password
  });

  if (!active) {
    await db.session.deleteMany({
      where: {
        id: id as string
      }
    });
  }

  // const passwordHash = await hash(password as string, 10);

  await db.adminUser.update({
    where: {
      id: id as string
    },
    data: {
      name: name as string,
      email: email as string,
      // passwordHash
      active: !!active
    }
  });

  revalidatePath('/manage-users/admin-users');
  return {
    message: 'Admin user updated successfully'
  };
};
