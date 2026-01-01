'use server';

import { ICoupon } from '@/src/_models/coupon.model';
import { db } from '@/src/server/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const createCoupon = async (data: ICoupon) => {
  const session = await getServerSession();

  if (!session) {
    return { error: 'Unauthorized' };
  }

  const { code, active, amount, isPercent, description, newUser, createdAt, expiresAt, updatedAt, numberOfTime, categoryIds, productIds, users, order, orderId } = data;

  const FormData = z.object({
    code: z.string().min(1),
    active: z.boolean().optional(),
    amount: z.number(),
    isPercent: z.boolean().optional(),
    description: z.string().min(1),
    // newUser: z.boolean().optional(),
    createdAt: z.date(),
    expiresAt: z.date(),
    updatedAt: z.date(),
    // numberOfTime: z.number(),
    categoryIds: z.array(z.string()),
    productIds: z.array(z.string()),
    users: z.null()
  });

  const isValidData = FormData.parse({
    code,
    active,
    amount,
    isPercent,
    description,
    newUser,
    createdAt,
    expiresAt,
    updatedAt,
    numberOfTime,
    categoryIds,
    productIds,
    users
  });

  if (!isValidData) {
    return {
      error: 'Invalid data'
    };
  }

  await db.coupon.create({
    data: {
      code: code as string,
      active: active,
      amount: amount,
      isPercent: isPercent,
      description: description,
      newUser: false,
      createdAt: createdAt,
      updatedAt: updatedAt,
      expiresAt: expiresAt,
      numberOfTime: 0,
      categories: {
        connect: isValidData.categoryIds.map((category) => ({ id: category }))
      },
      products: {
        connect: isValidData.productIds.map((product) => ({ id: product }))
      }
      //   users: {
      //     connect: users?.map((user) => ({ id: user.id, firstName: user.firstName, lastName: user.lastName }))
      //   },
    }
  });

  revalidatePath('/manage-products/coupons');
  return {
    message: 'Category created successfully'
  };
};

export const updateCoupon = async (data: ICoupon) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }
  const { id, code, active, amount, isPercent, description, newUser, createdAt, expiresAt, updatedAt, numberOfTime, categoryIds, productIds, users } = data;

  const FormData = z.object({
    id: z.string(),
    code: z.string().min(1),
    active: z.boolean().optional(),
    amount: z.number(),
    isPercent: z.boolean().optional(),
    description: z.string().min(1),
    // newUser: z.boolean().optional(),
    expiresAt: z.date(),
    // numberOfTime: z.number(),
    categoryIds: z.array(z.string()),
    productIds: z.array(z.string())
  });

  const isValidData = FormData.parse({
    id,
    code,
    active,
    amount,
    isPercent,
    description,
    newUser,
    expiresAt,
    numberOfTime,
    categoryIds,
    productIds
  });

  await db.coupon.update({
    where: {
      id: id as string
    },
    data: {
      categories: {
        set: []
      },
      products: {
        set: []
      }
    }
  });

  await db.coupon.update({
    where: {
      id: id as string
    },
    data: {
      code: code as string,
      active: active,
      amount: amount,
      isPercent: isPercent,
      description: description,
      newUser: false,
      expiresAt: expiresAt,
      numberOfTime: 0,
      categories: {
        set: isValidData.categoryIds.map((category) => ({ id: category }))
      },
      products: {
        set: isValidData.productIds.map((product) => ({ id: product }))
      }
    }
  });

  revalidatePath('/manage-products/coupons');
  return {
    message: 'coupon updated successfully'
  };
};
